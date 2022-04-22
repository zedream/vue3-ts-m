<script setup lang="ts">
import { GetRefuelStationList } from '@/api/refuel'
import { store } from '@/store'

const dataList = ref<DataListData[]>([])

GetRefuelStationList({
  lat: store.state.common.latitude,
  lon: store.state.common.longitude,
  rule: 0,
  type: 'home'
}).then(data => {
  dataList.value = data?.dataList
})
</script>

<template>
  <RefuelStationItem
    v-for="item in dataList"
    :key="item.stationId"
    class="recharge-station-item"
    :data="item" />
</template>

<style scoped lang="scss">
.refuel-station-item {
  position: relative;
}
</style>
