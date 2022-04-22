<script setup lang="ts">
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { getActivityConfig } from '@/utils/global'
import { GetMessageCode } from '@/api/user'
import { CheckActivityLogin } from '@/api/activity'
import router from '@/router'
import { useVerifyCode } from '@/hooks'
import { MobileValid } from '@/utils/validate'
import { store } from '@/store'

const { proxy } = getCurrentInstance()

const showRule = ref(false)
const imageTop = ref('')
const imageMid = ref('')
const imageDown = ref('')
const ruleImgId = ref('')
const countdown = ref(0)
const verifyButtonText = ref('获取验证码')
const extraJson = ref<ExtraJsonData>({} as ExtraJsonData)
const state = reactive({
  countryCode: '86',
  fastReg: 1,
  loginType: 'vcode',
  mobile: '',
  pageUrl: window.location.href,
  pcode: store.state.common.partnerCode,
  ua: window.navigator.userAgent,
  vcode: ''
})

const activityConfigStr = Storage.Session.get(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION)
if (activityConfigStr) {
  imageTop.value = JSON.parse(activityConfigStr).imageTop
  imageDown.value = JSON.parse(activityConfigStr).imageDown
  imageMid.value = JSON.parse(activityConfigStr).extraJson.imageMid
  ruleImgId.value = JSON.parse(activityConfigStr).ruleImgId
  Object.assign(extraJson.value, JSON.parse(activityConfigStr).extraJson)
} else {
  getActivityConfig().then(data => {
    imageTop.value = data.imageTop
    imageDown.value = data.imageDown
    imageMid.value = data.extraJson.imageMid
    ruleImgId.value = data.ruleImgId
    Object.assign(extraJson.value, data.extraJson)
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
  })
}

const StrategyJumpPage = {
  links: function () {
    window.location.replace(extraJson.value.activityImageMidLinkUrl + window.location.search)
  },
  personalHubPageH5: function () {
    router.replace('/mine')
  },
  refuelingListPageH5: function () {
    router.replace('/refuel')
  },
  rechargePageH5: function () {
    router.replace('/recharge')
  },
  home: function () {
    router.replace('/recharge')
  },
  openAccount: function () {
    console.log('links')
  },
  RedEnvelope: function () {
    router.push('/allowance')
  }
}

function handleObtainCode () {
  if (MobileValid(state.mobile)) {
    if (countdown.value === 0) {
      GetMessageCode({
        countryCode: '86',
        mobile: state.mobile,
        type: 'signin'
      }).then(() => {
        proxy.$notify({ type: 'success', message: '验证码发送成功' })
        useVerifyCode(60, verifyButtonText, countdown)
      }).catch((error) => {
        proxy.$notify({ type: 'danger', message: error })
      })
    }
  } else {
    proxy.$toast('请输入正确的手机号')
  }
}

function handleSubmit () {
  if (!MobileValid(state.mobile)) {
    return proxy.$toast('请输入正确的手机号')
  }
  if (!state.vcode) {
    return proxy.$toast('请输入短信验证码')
  }
  store.dispatch('user/signInByCode', state).then(() => {
    checkActivityLogin().then(() => {
      StrategyJumpPage[extraJson.value.gotoType]()
    })
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
  })
}

function handleTapRule () {
  if (ruleImgId.value) {
    showRule.value = true
  }
}

function checkActivityLogin () {
  return new Promise<void>(resolve => {
    CheckActivityLogin({
      mobile: store.state.user.mobile,
      memberId: store.state.user.memberId,
      pcode: store.state.common.partnerCode
    }).then(data => {
      if (data.loginCheck) {
        resolve()
      } else {
        proxy.$notify({ type: 'warning', message: '暂无法参与该活动哟' })
      }
    })
  })
}
</script>

<template>
  <div class="top">
    <img
      v-if="imageTop && imageDown"
      class="img"
      :src="imageTop"
      alt="云油加油">
    <img
      v-else
      class="img"
      src="~img/other/refer-top.jpg"
      alt="云油加油">
    <div class="rule-btn" @click="handleTapRule" />
  </div>
  <div class="mid">
    <img
      v-if="imageMid"
      class="img"
      :src="imageMid"
      alt="云油加油">
    <img
      v-else
      class="img"
      src="~img/other/refer-mid.jpg"
      alt="云油加油">
    <div class="login-form">
      <div class="mb-20">
        <input
          v-model="state.mobile"
          class="mobile input"
          placeholder="请输入手机号码"
          type="text"
          pattern="[0-9]*"
          maxlength="11"
          oninput="value = value.replace(/[^\d]/g, '')">
      </div>
      <div class="code-box mb-20">
        <input
          v-model="state.vcode"
          class="code input"
          placeholder="请输入短信验证码"
          type="text"
          pattern="[0-9]*"
          maxlength="6"
          oninput="value = value.replace(/[^\d]/g, '')">
        <div class="code-btn" @click="handleObtainCode">
          {{ verifyButtonText }}
        </div>
      </div>
      <div class="button" @click="handleSubmit" />
    </div>
  </div>
  <div>
    <img
      v-if="imageTop && imageDown"
      class="img"
      :src="imageDown"
      alt="云油加油">
    <img
      v-else
      class="img"
      src="~img/other/refer-bottom.jpg"
      alt="云油加油">
  </div>
  <van-overlay :show="showRule" class-name="my-overlay">
    <div class="wrapper" @click.stop>
      <div class="title">
        活动规则
      </div>
      <img class="image" :src="ruleImgId" alt="云油加油">
      <i class="iconfont icon-close" @click="showRule = false" />
    </div>
  </van-overlay>
</template>

<style scoped lang="scss">
.top {
  position: relative;
  .rule-btn {
    position: absolute;
    width: 120px;
    height: 60px;
    top: 50px;
    right: 0;
    z-index: 1;
  }
}
.mid {
  position: relative;
  height: 500px;
  .img {
    height: 100%;
  }
  .login-form {
    width: 100%;
    padding: 0 60px;
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    .mb-20 {
      margin-bottom: 20px;
    }
    .code-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .code {
      flex: 1;
    }
    .input {
      border: none;
      box-sizing: border-box;
      color: #93A0BD;
      background-color: #E8F6FF;
      border-radius: 45px;
      padding: 0 45px;
      height: 90px;
      width: 100%;
      &::placeholder {
        color: #93A0BD;
        font-size: 28px;
      }
    }
    .code-btn {
      margin-left: 20px;
      width: 240px;
      border-radius: 45px;
      padding: 29px 0;
      line-height: 32px;
      text-align: center;
      flex-shrink: 0;
      background-image: linear-gradient(180deg, #FFEFC5 0%, #FFD998 100%);
      font-weight: 600;
      color: #BA760F;
    }
    .button {
      width: 646px;
      height: 108px;
      background-image: url("~img/other/refer-receive-btn.png");
      background-repeat: no-repeat;
      background-position: -8px center;
      background-size: 100% 100%;
    }
  }
}
.img {
  width: 100%;
  pointer-events: none;
  vertical-align: middle;
}
.my-overlay {
  z-index: 2022;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    width: 80%;
    background: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    .title {
      text-align: center;
      font-size: 36px;
      font-weight: 600;
      color: #292929;
      line-height: 80px;
    }
    .image {
      width: 100%;
    }
    .icon-close {
      position: absolute;
      bottom: -140px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 60px;
      color: #FFFFFF;
      padding: 20px;
    }
  }
}
</style>
