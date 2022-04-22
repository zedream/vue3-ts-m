<script setup lang="ts">
import { CheckIDCard, SendSms, CheckSms, UpdatePayPassword } from '@/api/pay'
import { useVerifyCode } from '@/hooks'
import { MobileValid, IDValid } from '@/utils/validate'
import { MaskMobile } from '@/utils/security'
import Storage from '@/utils/storage'
import md5 from 'js-md5'
import { StorageTypesPay, StorageExpire } from '@/types/storage.types'
import router from '@/router'
import { store } from '@/store'

const { proxy } = getCurrentInstance()

const step = ref(Storage.Session.get(StorageTypesPay.APP_PAY_PWD_STEP_SESSION) || '1')
const idCard = ref('')
const mobile = ref(store.state.user.mobile)
const vcode = ref('')
const payPassword = ref('')
const countdown = ref(0)
const verifyButtonText = ref('获取验证码')

/**
 * 在storage先设置一个值 方便调试时在storage对步骤进行修改
 */
!Storage.Session.get(StorageTypesPay.APP_PAY_PWD_STEP_SESSION) && setStep('1')

onUnmounted(() => {
  Storage.Session.remove(StorageTypesPay.APP_PAY_PWD_STEP_SESSION)
})

function checkIDCard () {
  if (IDValid(idCard.value)) {
    CheckIDCard({
      idCard: idCard.value
    }).then(data => {
      if (data.result) {
        setStep('2')
      } else {
        proxy.$notify({ type: 'danger', message: '身份验证失败' })
      }
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  } else {
    return proxy.$toast('请输入正确的身份证号')
  }
}

function checkSms () {
  if (!MobileValid(mobile.value)) {
    return proxy.$toast('请输入正确的手机号')
  }
  if (!vcode.value) {
    return proxy.$toast('请输入验证码')
  }
  CheckSms({
    mobile: mobile.value,
    type: 'CHANGE_PAY_PWD',
    vcode: vcode.value
  }).then(() => {
    setStep('3')
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
  })
}

function handleSubmit () {
  if (payPassword.value.length === 6) {
    proxy.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    UpdatePayPassword({
      payPassword: md5(payPassword.value)
    }).then(data => {
      if (data.result) {
        proxy.$notify({ type: 'success', message: '支付密码设置成功' })
        router.back()
      } else {
        proxy.$notify({ type: 'danger', message: '支付密码设置失败' })
      }
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  } else {
    proxy.$toast('请输入6位支付密码')
  }
}

function sendSms () {
  if (MobileValid(mobile.value)) {
    if (countdown.value === 0) {
      proxy.$toast.loading({
        forbidClick: true,
        duration: 0
      })
      SendSms({
        mobile: mobile.value,
        type: 'CHANGE_PAY_PWD'
      }).then(() => {
        useVerifyCode(120, verifyButtonText, countdown)
        proxy.$notify({ type: 'success', message: '短信发送成功' })
      }).catch(error => {
        proxy.$notify({ type: 'danger', message: error })
      })
    }
  } else {
    proxy.$toast('请输入正确的手机号')
  }
}

function setStep (v: string) {
  step.value = v
  Storage.Session.set(StorageTypesPay.APP_PAY_PWD_STEP_SESSION, v, StorageExpire.Day)
}
</script>

<template>
  <div class="retrieve-password-container">
    <div class="progress-wrapper">
      <div class="step-box">
        <div class="step-icon step-1" />
        <div class="text-activate">
          1.身份证验证
        </div>
        <div class="progress-points">
          <div :class="[step > 1 ? 'icon' : 'icon-0']" />
        </div>
      </div>
      <div class="step-box">
        <div class="step-icon" :class="[step > 1 ? 'step-2' : 'step-02']" />
        <div :class="[step > 1 ? 'text-activate' : 'text']">
          2.短信验证
        </div>
        <div class="progress-points">
          <div :class="[step > 2 ? 'icon' : 'icon-0']" />
        </div>
      </div>
      <div class="step-box">
        <div class="step-icon" :class="[step > 2 ? 'step-3' : 'step-03']" />
        <div :class="[step > 2 ? 'text-activate' : 'text']">
          3.设置支付密码
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <div v-if="step === '1'" class="form-box bottom-line">
        <input
          v-model="idCard"
          class="input"
          type="text"
          placeholder="请输入您的身份证号"
          maxlength="18">
      </div>
      <template v-if="step === '2'">
        <div class="form-box bottom-line">
          <div class="label">
            手机号
          </div>
          <div class="value">
            {{ MaskMobile(mobile) }}
          </div>
          <div class="code-btn" @click="sendSms">
            {{ verifyButtonText }}
          </div>
        </div>
        <div class="form-box bottom-line">
          <div class="label">
            验证码
          </div>
          <input
            v-model="vcode"
            class="input"
            type="text"
            pattern="[0-9]*"
            placeholder="请输入验证码"
            maxlength="6"
            oninput="value = value.replace(/[^\d]/g, '')">
        </div>
      </template>
      <template v-if="step === '3'">
        <div class="form-box">
          <div class="label">
            支付密码设置
          </div>
        </div>
        <PasswordInput v-model="payPassword" />
      </template>
    </div>
    <div class="bottom-button">
      <div v-if="step === '1'" class="common-button" @click="checkIDCard">
        身份验证
      </div>
      <div v-if="step === '2'" class="common-button" @click="checkSms">
        短信验证
      </div>
      <div v-if="step === '3'" class="common-button" @click="handleSubmit">
        提交
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.retrieve-password-container {
  min-height: 100%;
  background: #FFFFFF;
  padding-bottom: 150px;
  box-sizing: border-box;
  .progress-wrapper {
    background: #FAFAFA;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .step-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      flex: 1;
      .step-icon {
        width: 66px;
        height: 66px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
      .step-1 {
        background-image: url("~img/pay/retrieve-pwd-1.png");
      }
      .step-02 {
        background-image: url("~img/pay/retrieve-pwd-02.png");
      }
      .step-2 {
        background-image: url("~img/pay/retrieve-pwd-2.png");
      }
      .step-03 {
        background-image: url("~img/pay/retrieve-pwd-03.png");
      }
      .step-3 {
        background-image: url("~img/pay/retrieve-pwd-3.png");
      }
      .text {
        font-size: 24px;
        color: #999999;
        margin-top: 24px;
      }
      .text-activate {
        font-size: 24px;
        color: #292929;
        font-weight: 600;
        margin-top: 24px;
      }
      .progress-points {
        position: absolute;
        left: 50%;
        width: 100%;
        top: 30px;
        display: flex;
        justify-content: center;
        .icon {
          width: 90px;
          height: 9px;
          background-image: url("~img/pay/retrieve-pwd-0.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
        .icon-0 {
          width: 90px;
          height: 9px;
          background-image: url("~img/pay/retrieve-pwd-00.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
      }
    }
  }
  .form-wrapper {
    padding: 0 60px;
    .form-box {
      height: 130px;
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #4A4A4A;
      .label {
        flex-shrink: 0;
        min-width: 120px;
      }
      .value {
        display: flex;
        align-items: center;
        height: 100%;
        flex: 1;
      }
      .input {
        flex: 1;
        height: 90%;
        border: none;
        outline: none;
        position: relative;
        z-index: 1;
        &::placeholder {
          color: #B0B0B0;
        }
      }
      .code-btn {
        flex-shrink: 0;
        color: #666666;
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
