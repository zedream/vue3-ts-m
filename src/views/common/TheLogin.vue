<script setup lang="ts">
import { MobileValid } from '@/utils/validate'
import { GetMessageCode } from '@/api/user'
import { useStore } from '@/store'
import { UserType } from '@/store/mutation.types'

const router = useRouter()
const route = useRoute()
const store = useStore()
const { proxy } = getCurrentInstance()

enum LoginMethods {
  '账号密码登录',
  '短信验证码登录'
}
const agree = ref(false)
const inputFocus = ref(false)
const mobile = ref('')
const loginType = ref<LoginType>(0)

const perform = computed(() => {
  return MobileValid(mobile.value) && agree.value
})

function handleGetVerification () {
  GetMessageCode({
    countryCode: '86',
    mobile: mobile.value,
    type: 'signin'
  }).then(() => {
    store.commit(`user/${UserType.SET_MOBILE}`, mobile.value)
    router.push('/verification')
  }).catch((error) => {
    proxy.$notify({ type: 'danger', message: error })
  })
}

function handleToAgreement (agreementPath) {
  router.push(`/agreement${agreementPath}`)
}
</script>

<template>
  <div class="login-container">
    <div class="iconfont icon-close login-back" @click="$router.back()" />
    <div class="title">
      您好，
    </div>
    <div class="title">
      欢迎使用云油加油
    </div>
    <div class="sub-title">
      省钱加油，就用云油加油
    </div>
    <div class="input-wrapper bottom-line" :class="{ 'input-focus': inputFocus }">
      <input
        v-model="mobile"
        class="input"
        type="number"
        pattern="[0-9]*"
        placeholder="请输入手机号码"
        oninput="if (value.length > 11) value = value.slice(0, 11)"
        @focus="inputFocus = true"
        @blur="inputFocus = false">
      <div v-show="mobile" class="iconfont icon-close input-clear" @click="mobile = ''" />
    </div>
    <div class="button-wrapper">
      <div class="button" :class="{ 'button-disable': !perform }" @click="handleGetVerification">
        获取验证码
      </div>
    </div>
    <div class="login-methods">
      <span @click="loginType = 1 ^ loginType">
        {{ LoginMethods[loginType] }}
      </span>
    </div>
    <div class="agreement-wrapper">
      <van-checkbox v-model="agree" shape="square" icon-size="4.26667vw">
        我已阅读并理解
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
</template>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  padding: 180px 50px 0;
  box-sizing: border-box;
  .login-back {
    color: #9b9b9b;
    font-size: 56px;
    line-height: 56px;
    position: absolute;
    right: 30px;
    top: 30px;
  }
  .title {
    font-size: 48px;
    line-height: 48px;
    font-weight: 600;
    color: #292929;
    margin-bottom: 20px;
  }
  .sub-title {
    font-size: 30px;
    line-height: 30px;
    color: #B0B0B0;
  }
  .input-wrapper {
    margin-top: 60px;
    display: flex;
    align-items: center;
    position: relative;
    height: 100px;
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 0.5px;
      background: #1989FA;
      transition: width 0.3s ease-in-out;
    }
    .input {
      font-size: 40px;
      height: 98px;
      color: #292929;
      flex: 1;
      position: relative;
      z-index: 1;
      &::placeholder {
        color: #C8C9CC;
      }
    }
    .input-clear {
      font-size: 40px;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      color: #9b9b9b;
      position: relative;
      z-index: 1;
    }
  }
  .button-wrapper {
    margin-top: 80px;
    .button {
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;
      border-radius: 12px;
      font-size: 30px;
      font-weight: 600;
      color: #FFFFFF;
      background-image: linear-gradient(136deg, #148cfd 30%, #4fbbda 100%);
    }
    .button-disable {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .login-methods {
    margin-top: 30px;
    font-size: 24px;
    color: #444444;
  }
  .agreement-wrapper {
    font-size: 22px;
    color: #B0B0B0;
    margin-top: 60px;
    .van-checkbox {
      display: flex;
      align-items: baseline;
      text-align: justify;
      .agreement {
        color: #1989FA;
      }
    }
  }
  .input-focus:before {
    width: 100%;
  }
  .bottom-line:after {
    border-bottom: 1px solid #DCDEED;
  }
}
</style>
