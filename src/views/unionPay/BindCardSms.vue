<script setup lang="ts">
import { useVerifyCode } from '@/hooks'
import { GetUnionPayBindCode, BindUnionPayByCode } from '@/api/pay'
import { MaskMobile } from '@/utils/security'
import router from '@/router'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesPay } from '@/types/storage.types'

const route = useRoute()
const { proxy } = getCurrentInstance()

const code = ref('')
const codeInputRef = ref(null)
const countdown = ref(0)
const verifyButtonText = ref('获取验证码')
const bankInfo = ref<BankInfoData>({} as BankInfoData)

const mobile = ref(Storage.Session.get(StorageTypesPay.APP_BIND_UNION_MOBILE_SESSION))
const payPassword = ref(Storage.Session.get(StorageTypesPay.APP_BIND_UNION_PASSWORD_SESSION))

if (!mobile.value || !payPassword.value) {
  // router.back()
}

useVerifyCode(60, verifyButtonText, countdown)

onUnmounted(() => {
  Storage.Session.remove(StorageTypesPay.APP_BIND_UNION_MOBILE_SESSION, StorageExpire.Hour)
  Storage.Session.remove(StorageTypesPay.APP_BIND_UNION_PASSWORD_SESSION, StorageExpire.Hour)
})

function handleObtainCode () {
  if (countdown.value === 0) {
    proxy.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    GetUnionPayBindCode({
      phone: mobile.value,
      payPassword: payPassword.value
    }).then(() => {
      proxy.$toast.clear()
    }).catch(error => {
      proxy.$toast.clear()
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}

function handleSubmit () {
  if (code.value.length !== 6) {
    proxy.$toast('请输入6位验证码')
  } else {
    BindUnionPayByCode({
      smsCode: code.value
    }).then(() => {
      proxy.$dialog.alert({
        title: '温馨提示',
        message: '绑卡成功！',
        confirmButtonText: '太棒了~',
        confirmButtonColor: '#389BFF'
      }).then(() => {
        proxy.$toast('这里的逻辑还没写哦...')
      })
    }).catch(error => {
      proxy.$dialog.confirm({
        title: '绑卡失败',
        message: error,
        confirmButtonText: '重新绑定',
        cancelButtonText: '知道了',
        confirmButtonColor: '#389BFF'
      }).then(() => {
        code.value = ''
        codeInputRef.value.inputRef.focus()
      }).catch(() => {
        router.back()
      })
    })
  }
}
</script>

<template>
  <div class="bind-card-sms-container">
    <div class="title">
      输入短信验证码
    </div>
    <div class="sub-title">
      已向手机号码
      <span class="mobile">
        {{ MaskMobile(mobile) }}
      </span>
      发送验证码
    </div>
    <CodeInput ref="codeInputRef" v-model="code" />
    <div class="code-btn-box">
      <span class="code-btn" @click="handleObtainCode">
        {{ verifyButtonText }}
      </span>
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="handleSubmit">
        提交
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bind-card-sms-container {
  padding: 90px 60px 180px;
  min-height: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  .title {
    font-size: 28px;
    color: #292929;
    line-height: 45px;
    font-weight: 600;
  }
  .sub-title {
    font-size: 28px;
    color: #B0B0B0;
    margin-top: 10px;
  }
  .mobile {
    color: #1989FA;
    line-height: 40px;
  }
  .code-btn-box {
    font-size: 24px;
    color: #B0B0B0;
    text-align: right;
  }
  .code-btn {
    padding: 16px 30px;
    margin-right: -30px;
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
