<script setup lang="ts">
import { store } from '@/store'
import { desensitized } from '@/utils/utils'
import VoucherDialog from '@/views/common/components/VoucherDialog'
import { useVerifyCode } from '@/hooks'
import { CheckVoucherCode, GetJDVoucherSmsCode, ExchangeJDVoucher } from '@/api/common'

const { proxy } = getCurrentInstance()

const countdown = ref(0)
const voucherCode = ref('')
const smsCode = ref('')
const verifyButtonText = ref('获取验证码')
const dialogRef = ref()

function handleObtainCode () {
  if (countdown.value === 0) {
    proxy.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    GetJDVoucherSmsCode({
      mobile: store.state.user.mobile,
      code: voucherCode.value
    }).then(() => {
      useVerifyCode(60, verifyButtonText, countdown)
      proxy.$toast.clear()
    }).catch(error => {
      proxy.$toast.clear()
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}

function checkVoucherCode () {
  if (voucherCode.value) {
    CheckVoucherCode({
      code: voucherCode.value
    }).then(() => {
      handleObtainCode()
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  } else {
    proxy.$toast('请输入兑换码')
  }
}

function handleSubmit () {
  if (!voucherCode.value) {
    proxy.$toast('请输入兑换码')
  } else if (!smsCode.value) {
    proxy.$toast('请输入短信验证码')
  } else {
    ExchangeJDVoucher({
      code: voucherCode.value,
      mobile: store.state.user.mobile,
      vcode: smsCode.value
    }).then(() => {
      voucherCode.value = ''
      smsCode.value = ''
      proxy.$notify({ type: 'success', message: '兑换成功' })
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}
</script>

<template>
  <div class="voucher-wrapper">
    <div class="voucher-input-box">
      <input
        v-model="voucherCode"
        class="input"
        type="text"
        placeholder="请输入兑换码(区分大小写)">
      <i class="iconfont icon-voucher-info" @click="$router.push('/rule/exchange')" />
    </div>
    <div class="code-box">
      <div class="input-box">
        <input
          v-model="smsCode"
          class="input"
          placeholder="短信验证码"
          type="number"
          pattern="[0-9]*"
          oninput="if (value.length > 6) value = value.slice(0, 6)">
      </div>
      <div class="code-btn" @click="checkVoucherCode">
        {{ verifyButtonText }}
      </div>
      <div class="no-code" @click="$refs.dialogRef.open()">
        收不到验证码？
      </div>
    </div>
    <div class="tip">
      验证码接收手机号为{{ desensitized($store.state.user.mobile, 3, 6) }}
    </div>
  </div>
  <div class="bottom-button">
    <div class="common-button" @click="handleSubmit">
      确认兑换
    </div>
  </div>
  <VoucherDialog ref="dialogRef" />
</template>

<style scoped lang="scss">
.voucher-wrapper {
  font-size: 10px;
  padding: 60px 30px 70px;
}
.voucher-input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  background: #FFFFFF;
  border: 2px solid #DBDBDB;
  border-radius: 8px;
  padding: 0 30px;
  box-sizing: border-box;
  .icon-voucher-info {
    color: #148CFF;
    font-size: 36px;
    flex-shrink: 0;
    margin-left: 20px;
    padding: 12px;
    margin-right: -12px;
  }
}
.code-box {
  display: flex;
  align-items: center;
  height: 90px;
  margin-top: 30px;
  margin-bottom: 20px;
  .input-box {
    border-radius: 8px 0 0 8px;
    border: 2px solid #DBDBDB;
    background: #FFFFFF;
    border-right: none;
    height: 90px;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .code-btn {
    width: 180px;
    height: 90px;
    background: #377FED;
    border-radius: 0 8px 8px 0;
    font-size: 26px;
    color: #FFFFFF;
    text-align: center;
    line-height: 90px;
    flex-shrink: 0;
  }
  .no-code {
    font-size: 24px;
    color: #377FED;
    margin-left: 22px;
    flex-shrink: 0;
    padding: 20px 0;
  }
}
.tip {
  font-size: 24px;
  color: #A0A0A0;
}
.input {
  width: 100%;
  font-size: 32px;
  background: #FFFFFF;
  color: #323233;
  flex: 1;
  border: none;
  outline: none;
  &::placeholder {
    font-size: 28px;
    color: #ACABAC;
  }
}
</style>
