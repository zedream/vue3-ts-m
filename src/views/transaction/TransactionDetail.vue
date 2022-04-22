<script setup lang="ts">
import { GetTransactionDetail } from '@/api/transaction'
import router from '@/router'
import TheCashback from './components/TheCashback.vue'
import TheDetail from './components/TheDetail.vue'
import TheWithdraw from './components/TheWithdraw.vue'

const route = useRoute()
const { proxy } = getCurrentInstance()

const detail = ref<TransactionDetailData>({})
const component = shallowRef(null)

onMounted(() => {
  const setTitle = inject('navBarRef').value.setTitle
  if (route.query.type === 'FUEL' || route.query.type === 'guide') {
    setTitle('交易详情')
    component.value = TheDetail
  } else if (route.query.type === 'REFUELCASHBACK' || route.query.type === 'REFUELCASHBACKEXTRA') {
    setTitle('立返单')
    component.value = TheCashback
  } else if (route.query.type === 'WITHDRAW') {
    setTitle('提现单')
    component.value = TheWithdraw
  } else {
    router.back()
  }
})

GetTransactionDetail({
  orderId: route.params.orderId,
  tradeType: route.query.type
}).then(data => {
  if (data.orderNo) {
    detail.value = data
  } else {
    proxy.$notify({ type: 'danger', message: '交易记录不存在' })
  }
})
</script>

<template>
  <component :is="component" :data="detail" />
</template>

<style scoped lang="scss">

</style>
