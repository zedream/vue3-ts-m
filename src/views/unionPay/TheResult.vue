<script setup lang="ts">
import router from '@/router'

const route = useRoute()

const amount = route.query.amount
const name = route.query.stationName

function handleTapDone () {
  router.push(`/order/${route.query.orderNo}`)
}
</script>

<template>
  <div class="success-icon" />
  <div class="success-text">
    支付成功
  </div>
  <div class="amount">
    <span class="unit">
      ￥
    </span>
    {{ amount || '0.00' }}
  </div>
  <div class="name">
    {{ name || '其他加油站' }}
  </div>
  <div class="bottom-button">
    <div class="common-button" @click="handleTapDone">
      完成
    </div>
  </div>
</template>

<style scoped lang="scss">
.success-icon {
  width: 120px;
  height: 120px;
  background-image: url("~img/pay/pay-success.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin: 160px auto 0;
}
.success-text {
  text-align: center;
  font-size: 36px;
  color: #323233;
  margin-top: 20px;
}
.amount {
  text-align: center;
  font-size: 50px;
  color: #000000;
  margin-top: 120px;
  .unit {
    font-size: 32px;
  }
}
.name {
  text-align: center;
  font-size: 28px;
  color: #646566;
  margin-top: 10px;
  padding-bottom: 180px;
}
</style>
