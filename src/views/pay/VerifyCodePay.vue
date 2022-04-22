<script setup lang="ts">
import { GetPayOrderDetail, GetVerifyPayCode, VerifyCodePay } from '@/api/pay'
import { useMemberInfo, useVerifyCode } from '@/hooks'
import router from '@/router'
import { store } from '@/store'
import { UserType } from '@/store/mutation.types'
import { useRoute } from 'vue-router'
import { desensitized } from '@/utils/utils'

const route = useRoute()
const { proxy } = getCurrentInstance()

const availableBank = ['BCM', 'XIB'] // 建行 厦国际行
const orderNo = route.query?.orderNo
const countdown = ref(0)
const mobileCode = ref('')
const bankName = ref('')
const payAmount = ref('0.00')
const cardNo = ref('')
const mobileBind = ref('')
const verifyButtonText = ref('获取验证码')
const promiseData = ref<[MemberInfoResult, PayOrderDetailData]>()

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
Promise.all([
  useMemberInfo(),
  GetPayOrderDetail({
    pcode: store.state.common.partnerCode
  }, orderNo as string)
]).then((data) => {
  promiseData.value = data
  if (availableBank.includes(data[0].bankInfo.bankType)) {
    bankName.value = data[0].bankInfo.bankName
    payAmount.value = data[1].realPayAmount
    cardNo.value = data[0].bankInfo.bindFirstCardNo
    mobileBind.value = data[0].bankInfo.mobile
    getVerifyPayCode(data)
    proxy.$toast.clear()
  } else {
    proxy.$toast.clear()
    proxy.$notify({ type: 'warning', message: `暂不支持${data[0].bankInfo.bankName}` })
    setTimeout(() => {
      router.back()
    }, 1500)
  }
}).catch(error => {
  promiseData.value = [{} as MemberInfoResult, {} as PayOrderDetailData]
  proxy.$toast.clear()
  if (error === 90000) {
    store.commit(`user/${UserType.CLEAR_AUTH}`)
    router.push('/login')
  } else {
    proxy.$notify({ type: 'danger', message: error })
  }
})

function getVerifyPayCode (data) {
  if (countdown.value === 0) {
    GetVerifyPayCode({
      amount: data[1].realPayAmount,
      idCardNo: data[0].bankInfo.idCardNo,
      mobile: store.state.user.mobile as string,
      orderNo: data[1].orderNo,
      type: 'RECHARGE',
      userName: data[0].bankInfo.userName
    }).then(() => {
      proxy.$toast.clear()
      proxy.$notify({ type: 'success', message: '验证码已发送' })
      useVerifyCode(60, verifyButtonText, countdown)
    }).catch(error => {
      proxy.$toast.clear()
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}

function onCodeDone (code) {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  VerifyCodePay({
    orderNo: orderNo as string,
    amount: payAmount.value,
    mobileCode: code,
    payCardNo: cardNo.value
  }).then(() => {
    proxy.$toast.clear()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    proxy.$toast.clear()
    mobileCode.value = ''
  })
}
</script>

<template>
  <div class="verify-code-pay">
    <div class="pay-info">
      <div class="pay-info-row">
        <div class="label">
          支付银行卡：
        </div>
        <div v-if="bankName">
          {{ `${bankName}(尾号${cardNo.substring(cardNo.length - 4)})` }}
        </div>
      </div>
      <div class="pay-info-row mt-10">
        <div class="label">
          金额：
        </div>
        <div class="pay-amount">
          ￥{{ payAmount }}
        </div>
      </div>
    </div>
    <div class="font-1">
      输入支付验证码
    </div>
    <div class="font-2 mt-10">
      已向绑定储蓄卡银行预留手机{{ desensitized(mobileBind, 3, 6) }}
    </div>
    <div class="font-2 mt-10">
      发送验证码
    </div>
    <CodeInput v-model="mobileCode" @on-done="onCodeDone" />
    <div class="code-btn font-2" @click="getVerifyPayCode(promiseData)">
      {{ verifyButtonText }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.verify-code-pay {
  min-height: 100%;
  background: #FFFFFF;
  padding: 30px;
  box-sizing: border-box;
  .pay-info {
    color: #323233;
    font-size: 28px;
    background: #FDFDFF;
    border: 1px solid #BCDDFF;
    box-shadow: 0 6px 9px 0 rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 20px 30px;
    .pay-info-row {
      display: flex;
      align-items: center;
      .label {
        width: 180px;
      }
      .pay-amount {
        color: #FF4C31;
        font-size: 32px;
      }
    }
  }
  .code-btn {
    display: inline-block;
    padding: 12px;
    margin-left: -12px;
    margin-top: -12px;
  }
  .font-1 {
    font-size: 48px;
    color: #000000;
    margin-top: 80px;
  }
  .font-2 {
    color: #969799;
    font-size: 28px;
  }
  .mt-10 {
    margin-top: 10px;
  }
}
</style>
