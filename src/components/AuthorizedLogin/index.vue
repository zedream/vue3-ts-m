<script setup lang="ts">
import router from '@/router'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { CheckUserAuthInfo, SilentLogin } from '@/api/user'
import Storage from '@/utils/storage'
import { StorageTypesUrlSearch } from '@/types/storage.types'
import { UserType } from '@/store/mutation.types'
import { store } from '@/store'

const { proxy } = getCurrentInstance()

const agree = ref(false)
const show = ref(false)
const silentLoginParams = ref({})

onBeforeRouteUpdate((to, from, next) => {
  show.value = (Storage.Session.get(StorageTypesUrlSearch.APP_LOGIN_TYPE_SESSION) === 'auto') && to.path.indexOf('agreement') <= -1 && !store.state.user.token
  next()
})
onBeforeRouteLeave((to, from, next) => {
  show.value = (Storage.Session.get(StorageTypesUrlSearch.APP_LOGIN_TYPE_SESSION) === 'auto') && to.path.indexOf('agreement') <= -1 && !store.state.user.token
  next()
})

if (Storage.Session.get(StorageTypesUrlSearch.APP_LOGIN_TYPE_SESSION) === 'auto') {
  checkUserAuthInfo()
}

function handleToAgreement (agreementPath) {
  router.push(`/agreement${agreementPath}`)
}

function handleLogin () {
  if (agree.value) {
    silentLogin(silentLoginParams.value)
  } else {
    proxy.$toast('请勾选协议进行授权')
  }
}

function checkUserAuthInfo () {
  CheckUserAuthInfo({
    userInfo: Storage.Session.get(StorageTypesUrlSearch.APP_U_SESSION),
    pcode: Storage.Local.get(StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL)
  }).then(data => {
    if (data.authResult === 'Y') {
      store.commit(`user/${UserType.SET_MEMBER_ID}`, data.memberId)
      store.commit(`user/${UserType.SET_MOBILE}`, data.mobile)
      store.commit(`user/${UserType.SET_TOKEN}`, data.token)
      // 接口没有返回 account 参数， 就用mobile替代下了
      store.commit(`user/${UserType.SET_ACCOUNT}`, data.mobile)
      show.value = false
    } else {
      show.value = true
      Object.assign(silentLoginParams.value, {
        mchuid: data.mchuid,
        mobile: data.mobile,
        pcode: data.pcode
      })
    }
  }).catch(() => {
    // proxy.$notify({ type: 'danger', message: error })
    show.value = true
    proxy.$notify({ type: 'danger', message: '授权参数有误' })
  })
}

function silentLogin (params) {
  SilentLogin({
    ...params,
    agreeAuth: 'Y'
  }).then(data => {
    store.commit(`user/${UserType.SET_MEMBER_ID}`, data.memberId)
    store.commit(`user/${UserType.SET_MOBILE}`, data.mobile)
    store.commit(`user/${UserType.SET_TOKEN}`, data.token)
    // 接口没有返回 account 参数， 就用mobile替代下了
    store.commit(`user/${UserType.SET_ACCOUNT}`, data.mobile)
    show.value = false
  }).catch(() => {
    // proxy.$notify({ type: 'danger', message: error })
    proxy.$notify({ type: 'danger', message: '授权失败' })
  })
}
</script>

<template>
  <van-overlay :show="show" class-name="my-overlay">
    <div class="authorized-login-wrapper">
      <img class="auth-bg" src="https://bwoil-fileserver-test.oss-cn-shenzhen.aliyuncs.com/477355fab1174019902f64660ca39d9d.png" alt="云油加油">
      <div class="auth-btn" @click="handleLogin" />
      <div class="agreement-wrapper">
        <van-checkbox v-model="agree" shape="square" icon-size="4.26667vw">
          我同意并理解
          <span class="agreement" @click.stop="handleToAgreement('/license')">
            《会员服务协议》
          </span>
          <span class="agreement" @click.stop="handleToAgreement('/private')">
            《云油加油用户隐私政策》
          </span>
          的条款
        </van-checkbox>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped lang="scss">
.my-overlay {
  z-index: 1221;
  display: flex;
  align-items: center;
  justify-content: center;
  .authorized-login-wrapper {
    //background: #646566;
    width: 610px;
    height: 880px;
    position: relative;
    box-sizing: border-box;
    .auth-bg {
      width: 100%;
      height: 100%;
    }
    .auth-btn {
      position: absolute;
      top: 660px;
      left: 80px;
      width: 450px;
      height: 85px;
      background-image: url("~img/authorization-btn.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      z-index: 1;
    }
    .agreement-wrapper {
      font-size: 22px;
      position: absolute;
      bottom: 30px;
      left: 40px;
      width: 530px;
      .van-checkbox {
        display: flex;
        align-items: baseline;
        text-align: justify;
        :deep(.van-checkbox__label) {
          color: #646566;
        }
        .agreement {
          color: #000000;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
