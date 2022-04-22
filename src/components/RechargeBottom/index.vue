<script setup lang="ts">
import { GetRefuelStationList } from '@/api/refuel'
import { useStore } from '@/store'
import { useGeolocation, useOpenMap } from '@/hooks'

const { proxy } = getCurrentInstance()
const store = useStore()

let map
const actionShow = ref(false)
const loadError = ref(false)
const showDenial = ref(false)
const loading = ref(true)
const tab = ref(0)
const dataList = ref<DataListData[]>([])
const actions = ref([
  { name: '高德地图' },
  { name: '百度地图' },
  { name: '腾讯地图' }
])

useGeolocation(proxy).then((errorCode) => {
  switch (errorCode) {
    case 0:
      getRefuelStationList()
      break
    case 1:
      showDenial.value = true
      loading.value = false
      break
    case 2:
    case 3:
      getRefuelStationList()
      break
    default:
      break
  }
})

function onTapNav (location) {
  map = useOpenMap(location.longitude, location.latitude, location.address, store)
  actionShow.value = true
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
  loading.value = true
  loadError.value = false
  GetRefuelStationList({
    jyFlag: true,
    lat: store.state.common.latitude,
    lon: store.state.common.longitude,
    oilId: store.state.refuel.oilId,
    rule: store.state.refuel.rule,
    type: 'list'
  }).then(data => {
    dataList.value = data?.dataList.slice(0, 5)
    loading.value = false
  }).catch(() => {
    loading.value = false
    loadError.value = true
  })
}
</script>

<template>
  <div class="tab" :class="[tab === 0 ? 'tab-left' : 'tab-right']">
    <div class="tab-item" :class="{ activate: tab === 0 }" @click="tab = 0">
      附近加油
    </div>
    <div class="tab-item" :class="{ activate: tab === 1 }" @click="tab = 1">
      云油优势
    </div>
  </div>
  <div v-if="tab === 0" class="petrol-station">
    <div v-if="showDenial" class="denial-geolocation-wrapper">
      <div class="denial-geolocation" />
    </div>
    <van-empty
      v-if="loadError"
      image="network"
      description="加载出错啦，点击重试"
      @click="getRefuelStationList" />
    <van-skeleton title :row="3" :loading="loading">
      <RefuelStationItem
        v-for="(item, index) in dataList"
        :key="item.stationId"
        class="recharge-station-item"
        :class="{ 'bottom-line': index < 4 }"
        :data="item"
        @on-tap-nav="onTapNav" />
    </van-skeleton>
    <van-skeleton title :row="3" :loading="loading" />
    <van-skeleton title :row="3" :loading="loading" />
  </div>
  <div v-if="tab === 1" class="advantage">
    <img src="~img/recharge/advantage-bg.png" alt="云油加油">
  </div>
  <van-action-sheet
    v-model:show="actionShow"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @cancel="actionShow = false"
    @select="handleOpenMap" />
</template>

<style scoped lang="scss">
.tab {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #FFFFFF;
  .tab-item {
    flex: 1;
    height: 100%;
    line-height: 160px;
    text-align: center;
    font-weight: 600;
    transition: color 0.2s ease-in-out;
  }
  .activate {
    font-size: 32px;
    color: #4981FA;
  }
}
.petrol-station {
  border-radius: 0 0 10px 10px;
  background: #FFFFFF;
  padding-bottom: 60px;
  .van-skeleton {
    margin-top: 60px;
    &:first-child {
      margin-top: 0;
    }
  }
  .recharge-station-item {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    :deep(.right), :deep(.left) {
      z-index: 1;
    }
  }
  .bottom-line:after {
    margin: 0 40px;
  }
  .denial-geolocation-wrapper {
    padding: 150px 0;
    .denial-geolocation {
      margin: 0 auto;
      width: 630px;
      height: 330px;
      background-image: url("~img/location-failed.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
  }
}
.advantage {
  border-radius: 0 0 10px 10px;
  background-color: #FFFFFF;
  padding: 60px 20px;
  img {
    width: 100%;
  }
}
.tab-left {
  width: 100%;
  height: 135px;
  background-image: url("~img/recharge/tab-left.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.tab-right {
  width: 100%;
  height: 135px;
  background-image: url("~img/recharge/tab-right.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
</style>
