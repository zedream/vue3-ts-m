<script setup lang="ts">
import { useAppPay } from '@/hooks'
import { zeroFill } from '@/utils/utils'

const {
  showTip,
  canDo,
  payment,
  memberInfo,
  handleToPay,
  handlePaymentChange
} = useAppPay()

const cardNo = computed(() => {
  return memberInfo?.bankInfo?.thirdCardNo.slice(memberInfo?.bankInfo?.thirdCardNo.length - 4)
})
</script>

<template>
  <div class="not-archive-station-body">
    <PaymentSelect class="payment-wrapper" @on-change="handlePaymentChange" />
  </div>
  <div class="bottom-button block">
    <div class="common-button" :class="{ 'button-disabled': !payment || !canDo }" @click="handleToPay">
      下一步
    </div>
  </div>
  <van-popup
    v-model:show="showTip"
    round
    position="bottom"
    :close-on-popstate="true">
    <div class="tip-wrapper">
      <div class="font-1">
        如若不支持自动跳转，请手动打开
      </div>
      <div class="font-2">
        选择
        <span class="font-3">
          加油省钱卡({{ memberInfo.bankInfo?.bankName + cardNo }})
        </span>
        支付
      </div>
      <div class="font-4">
        即可享受加油立返
      </div>
      <div class="tip-image-box">
        <div class="tip-image" :class="payment" />
        <div class="font-5">
          省钱卡：
          <span class="font-6">
            ￥{{ zeroFill(memberInfo.bankAmount) }}
          </span>
        </div>
        <div class="to-recharge-btn" @click="$router.push('/')">
          去充值
        </div>
      </div>
      <div class="i-know" @click="showTip = false">
        我知道了
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.not-archive-station-body {
  padding-bottom: 150px;
  .payment-wrapper {
    margin-top: 20px;
  }
}
.tip-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  .tip-image-box {
    position: relative;
    background: #F7F7F7;
    padding: 30px 40px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .tip-image {
      width: 360px;
      height: 290px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    .ali {
      background-image: url("~img/refuel/ali-pay-tip.png");
    }
    .wechat {
      background-image: url("~img/refuel/wechat-pay-tip.png");
    }
  }
  .i-know {
    height: 180px;
    color: #4A90E2;
    font-size: 30px;
    line-height: 180px;
    width: 100%;
    text-align: center;
  }
  .font-1 {
    font-size: 26px;
    color: #4a4a4a;
    padding: 30px;
  }
  .font-2 {
    font-weight: 500;
    font-size: 34px;
    color: #999999;
    line-height: 45px;
    margin-bottom: 10px;
  }
  .font-3 {
    font-weight: 500;
    font-size: 34px;
    color: #4A90E2;
    line-height: 45px;
  }
  .font-4 {
    font-size: 28px;
    color: #292929;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .font-5 {
    font-size: 24px;
    color: #4A4A4A;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }
  .font-6 {
    font-weight: 600;
    font-size: 34px;
    color: #292929;
    line-height: 36px;
  }
  .to-recharge-btn {
    font-size: 24px;
    color: #4A90E2;
    text-decoration: underline;
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 10px 20px;
  }
}
</style>
