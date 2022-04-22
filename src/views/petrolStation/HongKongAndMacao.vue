<script setup lang="ts">
import { GetPetrolStationDetail } from '@/api/refuel'
import { store } from '@/store'
import { useOpenMap } from '@/hooks'

const route = useRoute()

let map
const actions = [
  { name: '高德地图' },
  { name: '百度地图' },
  { name: '腾讯地图' }
]
const actionShow = ref(false)
const loading = ref(true)
const oilPrice = ref('')
const oilName = ref('')
const detail = ref<PetrolStationDetailData>()
const oils = ref<PetrolStationOilsData[]>([])

GetPetrolStationDetail({
  lat: store.state.common.latitude,
  lon: store.state.common.longitude,
  stationId: route.query.stationId,
  type: 'detail'
}).then(data => {
  detail.value = data?.detail || {}
  oils.value = data?.oils
  if (oils.value.length) {
    oilPrice.value = oils.value[0].oilPrice
    oilName.value = oils.value[0].oilName
  }
  loading.value = false
})

function handleSwitchName (name, price) {
  oilName.value = name
  oilPrice.value = price
}

function handleTapNav (longitude, latitude, address) {
  map = useOpenMap(longitude, latitude, address, store)
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
</script>

<template>
  <van-loading v-if="loading" class="loading" size="36px" />
  <div v-else class="petrol-station-container">
    <div class="petrol-station-info">
      <div class="left">
        <div class="name">
          <div class="ellipsis">
            {{ detail.stationName }}
          </div>
          <div class="icon">
            港澳
          </div>
        </div>
        <div class="address">
          {{ detail.addr }}
        </div>
      </div>
      <div class="right">
        <div class="distance-icon" />
        <div class="distance">
          {{ detail.distance }}
        </div>
      </div>
    </div>
    <div class="oil-price-info">
      <div class="oils">
        <div
          v-for="item in oils"
          :key="item.oilId"
          class="oil"
          :class="{ activate: oilName === item.oilName }"
          @click="handleSwitchName(item.oilName, item.oilPrice)">
          {{ item.oilName }}
        </div>
      </div>
      <div class="price-value">
        <span class="unit">
          {{ detail.currencyCode }}
        </span>
        {{ oilPrice }}
      </div>
      <div class="price-label">
        油站价
      </div>
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="handleTapNav(detail.longitude, detail.latitude, detail.addr)">
        导航
      </div>
    </div>
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
.loading {
  top: 36%;
  text-align: center;
}
.petrol-station-container {
  height: 100%;
  background: #FFFFFF;
  padding: 60px 30px 0;
  box-sizing: border-box;
}
.petrol-station-info {
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    overflow: hidden;
    .name {
      font-size: 30px;
      color: #292929;
      font-weight: 600;
      display: flex;
      align-items: center;
      .icon {
        font-size: 40px;
        color: #FFFFFF;
        line-height: 40px;
        padding: 12px 16px;
        text-align: center;
        background: #427CFF;
        border-radius: 8px;
        margin-left: -8px;
        flex-shrink: 0;
        transform: scale(0.5);
      }
    }
    .address {
      font-size: 24px;
      color: #B0B0B0;
      line-height: 32px;
      margin-top: 6px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;
    .distance-icon {
      width: 40px;
      height: 40px;
      background-image: url("~img/refuel/distance.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    .distance {
      font-size: 22px;
      color: #9B9B9B;
      line-height: 30px;
      margin-top: 6px;
    }
  }
}
.oil-price-info {
  background: #F7F7F7;
  border-radius: 10px;
  width: 100%;
  min-height: 230px;
  padding: 24px 30px;
  box-sizing: border-box;
  margin-top: 50px;
  .oils {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 16px;
    .oil {
      width: 100%;
      line-height: 44px;
      background: #FCFCFC;
      border: 1px solid #E0E0E0;
      text-align: center;
      border-radius: 22px;
      box-sizing: border-box;
      font-size: 24px;
      color: #999999;
      transition: all 0.2s ease-in-out;
    }
    .activate {
      border-color: #148CFD;
      background: #148CFD;
      color: #FFFFFF;
    }
  }
  .price-value {
    margin-top: 55px;
    text-align: center;
    font-size: 36px;
    color: #292929;
    font-weight: 600;
    .unit {
      font-size: 28px;
    }
  }
  .price-label {
    text-align: center;
    font-size: 24px;
    color: #4A4A4A;
    margin-top: 10px;
  }
}
.bottom-button {
  background: #FFFFFF;
}
</style>
