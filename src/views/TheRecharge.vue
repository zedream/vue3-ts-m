<script setup lang="ts">
import { GetRefuelCard } from '@/api/recharge'
import { useStore } from '@/store'

const store = useStore()

const cardRule = ref('')
const productId = ref(-1)
const refuelingCard = ref<ProductsData[]>([])

GetRefuelCard({
  channel: store.state.common.partnerCode
}).then(data => {
  cardRule.value = data.detailFull
  refuelingCard.value = data.products
  productId.value = data.productId
})
</script>

<template>
  <div class="recharge-page-container">
    <RechargeActivityOperation />
    <div class="refuel-recharge">
      <RefuelRecharge :refueling-card="refuelingCard" :card-rule="cardRule" :product-id="productId" />
    </div>
    <div class="recharge-bottom">
      <RechargeBottom />
    </div>
  </div>
  <NewbiePopup />
  <ActivityMultiplePopup />
</template>

<style scoped lang="scss">
.recharge-page-container {
  background: #E8F4FE;
  min-height: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
  .refuel-recharge {
    padding: 0 20px;
    position: relative;
    margin-top: -200px;
  }
  .recharge-bottom {
    padding: 0 20px;
  }
}
</style>
