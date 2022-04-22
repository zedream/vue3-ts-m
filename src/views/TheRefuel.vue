<script setup lang="ts">
import { GetRefuelStationList } from '@/api/refuel'
import { store } from '@/store'
import { useOpenMap, useGeolocation } from '@/hooks'

interface State {
  loadError: boolean
  showDenial: boolean
  loading: boolean
  showExempt: boolean
  actionShow: boolean
  dataList: DataListData[],
  actions: { name: string }[],
  oilTypes: OilFilterGroupData
}

const { proxy } = getCurrentInstance()

const page = ref(1)
let map

const state = reactive<State>({
  loadError: false,
  showDenial: false,
  loading: true,
  showExempt: true,
  actionShow: false,
  dataList: [],
  actions: [
    { name: '高德地图' },
    { name: '百度地图' },
    { name: '腾讯地图' }
  ],
  oilTypes: {
    chai: [],
    qi: []
  }
})

useGeolocation(proxy).then((errorCode) => {
  switch (errorCode) {
    case 0:
      getRefuelStationList()
      break
    case 1:
      state.showDenial = true
      break
    case 2:
    case 3:
      getRefuelStationList()
      break
    default:
      break
  }
})

/**
 * @description 这里的watch监听store里的数据时getRefuelStationList会执行两次
 * 前提：进入一次别的页面再返回当前页
 * 因此改用emit事件触发
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/3/2 14:19
 */
// watch(() => store.state.refuel.rule, (value, old) => {
//   console.log('rule', value, old)
//   getRefuelStationList()
// })
// watch(() => store.state.refuel.oilId, (value) => {
//   console.log('oilId', value)
//   getRefuelStationList()
// })

function onTapNav (location) {
  map = useOpenMap(location.longitude, location.latitude, location.address, store)
  state.actionShow = true
}

function handleRuleChange () {
  if (!state.showDenial) {
    getRefuelStationList()
  }
}

function handleOilChange () {
  if (!state.showDenial) {
    getRefuelStationList()
  }
}

function handleOpenMap (action, index) {
  switch (index) {
    case 0:
      map.AMap()
      break
    case 1:
      map.BMap()
      break
    case 2:
      map.WeMap()
      break
    default:
      break
  }
}

function getRefuelStationList () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  state.loadError = false
  GetRefuelStationList({
    lat: store.state.common.latitude,
    lon: store.state.common.longitude,
    oilId: store.state.refuel.oilId,
    rule: store.state.refuel.rule,
    type: 'list',
    page: store.state.refuel.rule === 2 ? page.value : ''
  }).then(data => {
    state.dataList = data?.dataList
    state.oilTypes = data.filters.oilFilterGroup
    state.loading = false
  }).catch(() => {
    state.loading = false
    state.loadError = true
  })
}
</script>

<template>
  <div class="refuel-page-container">
    <RefuelActivityOperation />
    <PurchaseCarousel />
    <RefuelHeader :oil-type="state.oilTypes" @on-rule-change="handleRuleChange" @on-oil-change="handleOilChange" />
    <ExemptTips v-if="state.dataList.length" class="exempt-tips" />
    <van-empty
      v-if="state.loadError"
      image="network"
      description="加载出错啦，点击重试"
      @click="getRefuelStationList" />
    <div v-if="state.dataList.length" class="refuel-station-list" :style="{ paddingTop: $store.state.refuel.exempt ? '0' : '2.66667vw' }">
      <RefuelStationItem
        v-for="item in state.dataList"
        :key="item.stationId"
        :data="item"
        @on-tap-nav="onTapNav" />
      <div v-if="state.showDenial" class="denial-geolocation" />
    </div>
  </div>
  <van-action-sheet
    v-model:show="state.actionShow"
    :actions="state.actions"
    cancel-text="取消"
    close-on-click-action
    @cancel="state.actionShow = false"
    @select="handleOpenMap" />
</template>

<style scoped lang="scss">
.refuel-page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.refuel-station-list {
  padding: 0 20px 20px 20px;
  flex: 1;
  overflow: auto;
  .denial-geolocation {
    margin: 200px auto 0;
    width: 630px;
    height: 330px;
    background-image: url("~img/location-failed.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
}
.van-empty {
  flex: 1;
}
</style>
