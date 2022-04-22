<script setup lang="ts">
import { GetPayOrderDetail } from '@/api/pay'
import { store } from '@/store'
import router from '@/router'
import { useRoute } from 'vue-router'
import { usePay } from '@/hooks'

const route = useRoute()
const { proxy } = getCurrentInstance()

const orderNo = route.query?.orderNo

const {
  orderAmount,
  payAmount,
  productName,
  payCode,
  handlePay
} = usePay('recharge')

if (orderNo) {
  GetPayOrderDetail({
    pcode: store.state.common.partnerCode
  }, orderNo as string).then(data => {
    payAmount.value = data.realPayAmount
    orderAmount.value = data.totalAmount
    productName.value = data.productName
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    router.back()
  })
} else {
  router.back()
}

function onPayWayChange (code) {
  payCode.value = code
}
</script>

<template>
  <div class="order-confirm-container">
    <div class="order-info-wrapper">
      <div class="order-info-top">
        到账金额(元)
      </div>
      <div class="order-info-mid">
        {{ orderAmount }}
      </div>
      <div class="order-info-btm">
        <div>加油充值金额</div>
        <div>￥{{ payAmount }}</div>
      </div>
    </div>
    <div class="payment-wrapper">
      <div class="payment-header">
        <div class="my-bottom-line">
          支付方式
        </div>
      </div>
      <PayWay @on-change="onPayWayChange" />
    </div>
  </div>
  <div class="bottom-button">
    <div class="common-button" @click="handlePay">
      确认支付
      <template v-if="payAmount > 0">
        ￥{{ payAmount }}
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-confirm-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 150px;
}
.order-info-wrapper {
  padding: 60px 30px 25px;
  background: #FFFFFF;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  .order-info-top {
    font-size: 26px;
    color: #939393;
  }
  .order-info-mid {
    font-size: 70px;
    color: #242424;
    font-weight: 600;
    line-height: 112px;
  }
  .order-info-btm {
    margin-top: 50px;
    font-size: 24px;
    color: #D21F1C;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.payment-wrapper {
  flex: 1;
  width: 100%;
  margin-top: 20px;
  background: #FFFFFF;
  box-sizing: border-box;
  .payment-header {
    font-size: 32px;
    color: #292929;
    font-weight: 600;
    line-height: 100px;
    padding: 0 30px;
    .my-bottom-line {
      border-bottom: 0.5px solid #EBEDF0;
      box-sizing: border-box;
    }
  }
}
.bottom-button {
  background: #FFFFFF;
}
</style>
