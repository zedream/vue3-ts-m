<script setup lang="ts">
import { useMemberInfo } from '@/hooks'
import { formatBankCard } from '@/utils/utils'

const { proxy } = getCurrentInstance()

const availableAmount = ref('0')
const bankInfo = ref<BankInfoData>()
const cardNumberRef = ref(null)

proxy.$toast.loading({
  forbidClick: true,
  loadingType: 'spinner',
  duration: 0
})
useMemberInfo().then(result => {
  bankInfo.value = result?.bankInfo || {}
  availableAmount.value = result.availableAmount
  proxy.$toast.clear()
})

function handleCopyCardNumber () {
  if (!bankInfo.value.thirdCardNo) {
    return proxy.$notify({ type: 'success', message: '复制失败' })
  }
  navigator.clipboard.writeText(bankInfo.value.thirdCardNo).then(function () {
    proxy.$notify({ type: 'success', message: '复制成功' })
  }, function (clipboardErr) {
    console.log('复制失败, clipboardErr: ', clipboardErr)
    const target = cardNumberRef.value
    try {
      const range = document.createRange()
      range.selectNodeContents(target)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
      proxy.$notify({ type: 'success', message: '复制成功' })
    } catch (e) {
      window.getSelection().removeAllRanges()
      console.log('复制失败：', e)
      proxy.$notify({ type: 'danger', message: '复制失败' })
    }
  })
}
</script>

<template>
  <div class="card-list">
    <div v-if="bankInfo?.bankName" class="card">
      <p ref="cardNumberRef" class="card-number-copy">
        {{ bankInfo.thirdCardNo }}
      </p>
      <div class="card-name">
        加油省钱卡({{ bankInfo?.bankName }})
      </div>
      <div class="card-number">
        {{ formatBankCard.hide(bankInfo?.thirdCardNo) }}
      </div>
      <div class="copy-number" @click="handleCopyCardNumber">
        复制卡号
      </div>
    </div>
    <div v-else class="card">
      <div class="card-name">
        储蓄卡账户
      </div>
      <div class="card-number">
        **** **** **** ****
      </div>
      <div class="copy-number">
        复制卡号
      </div>
      <div class="no-card-tip">
        您还未开通加油省钱卡
      </div>
    </div>
  </div>
  <div class="bottom-button">
    <template v-if="bankInfo?.bankName">
      <div class="common-button" @click="$toast('在做了，在做了')">
        更换绑定储蓄卡
      </div>
    </template>
    <template v-else>
      <div v-if="parseFloat(availableAmount)" class="common-button" @click="$router.push('/openAccount/guide')">
        立即开通
      </div>
      <div v-else class="common-button" @click="$router.replace('/')">
        去充值
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.card-list {
  padding-top: 20px;
  .card {
    width: 690px;
    height: 260px;
    background: linear-gradient(227deg, #BAD6FF 7%, #80B6FF 100%);
    box-shadow: 0 4px 8px 0 rgba(209, 218, 230, 0.52);
    border-radius: 18px;
    margin: 0 auto;
    color: #FFFFFF;
    padding: 30px 40px;
    box-sizing: border-box;
    position: relative;
    .card-number-copy {
      position: absolute;
      top: -520px;
      opacity: 0;
      user-select: auto;
    }
    .card-name {
      font-size: 28px;
      line-height: 40px;
    }
    .card-number {
      font-weight: 600;
      font-size: 34px;
      line-height: 50px;
      margin-top: 10px;
    }
    .copy-number {
      margin-top: 40px;
      width: 140px;
      height: 50px;
      background: #FFFFFF;
      box-shadow: 0 6px 9px 0 rgba(10, 20, 32, 0.05);
      border-radius: 25px;
      font-size: 24px;
      color: #80B6FF;
      line-height: 50px;
      text-align: center;
    }
    .no-card-tip {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(1px);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #2A97F6;
      font-size: 48px;
      font-style: italic;
      border-radius: 18px;
    }
  }
}
</style>
