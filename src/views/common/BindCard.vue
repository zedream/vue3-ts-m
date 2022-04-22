<script setup lang="ts">
</script>

<template>
  <div class="bind-container">
    <div class="tip">
      <div class="text">
        为了加油便捷支付，请绑定银联、微信、支付宝等支付方式
      </div>
    </div>
    <div class="payment-wrapper">
      <PaymentSelect :type="1" />
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="$router.replace('/refuel')">
        去加油
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bind-container {
  height: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
  padding-top: 40px;
}
.tip {
  padding: 0 30px;
  text-align: center;
  margin-bottom: 40px;
  .text {
    padding: 18px 30px;
    background: #FEF9F2;
    font-size: 24px;
    color: #CAA067;
    border-radius: 6px;
  }
}
</style>
