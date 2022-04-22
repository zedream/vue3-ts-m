<script setup lang="ts">
import { GetRefuelOrderDetail } from '@/api/order'
import router from '@/router'
import { usePay, useCountDown } from '@/hooks'
import moment from '@/utils/moment'

const route = useRoute()
const {
  payAmount,
  orderAmount,
  payCode,
  handlePay
} = usePay('refuel')

const { proxy } = getCurrentInstance()

const remainTime = ref('00:00')

const countdown = useCountDown(0, s => {
  if (s === 0) {
    proxy.$notify({ type: 'warning', message: '支付已超时' })
    router.back()
  } else {
    remainTime.value = moment.format('mm:ss', s * 1000)
  }
})

if (route.query.orderNo) {
  GetRefuelOrderDetail(route.query.orderNo).then(data => {
    payAmount.value = data.payAmount
    orderAmount.value = data.orderAmount
    if (data.remainingTime) {
      countdown.reset(data.remainingTime)
    } else {
      proxy.$notify({ type: 'warning', message: '支付已超时' })
      router.back()
    }
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
  <div class="refuel-cashier-container">
    <div class="cashier-info-wrapper">
      <div class="order-info-countdown">
        剩余支付时间
        <span class="countdown">
          {{ remainTime }}
        </span>
      </div>
      <div class="cashier-info-amount">
        <span class="unit">
          ￥
        </span>
        <span class="amount">
          {{ payAmount }}
        </span>
      </div>
    </div>
    <div class="place" />
    <RefuelPayWay @on-change="onPayWayChange" />
    <div class="bottom-button">
      <div class="common-button" @click="handlePay">
        确认支付
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.refuel-cashier-container {
  height: 100%;
  background: #FFFFFF;
  .cashier-info-wrapper {
    padding: 60px 0;
    background: #FFFFFF;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    .order-info-countdown {
      font-size: 26px;
      color: #939393;
      .countdown {
        display: inline-block;
        width: 80px;
        text-align: center;
        white-space: nowrap;
      }
    }
    .cashier-info-amount {
      color: #323233;
      margin-top: 40px;
      font-weight: 600;
      .unit {
        font-size: 30px;
      }
      .amount {
        font-size: 70px;
      }
    }
  }
  .place {
    background: #F7F8FA;
    height: 20px;
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
