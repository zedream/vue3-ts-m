<script setup lang="ts">
import TheCooperative from './TheCooperative.vue'
import NonCooperative from './NonCooperative.vue'
import NotArchive from './NotArchive.vue'
import { GetPetrolStationDetail } from '@/api/refuel'
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { store } from '@/store'
import router from '@/router'

const env = Storage.Local.get(StorageTypesCommon.APP_ENV_LOCAL)

const route = useRoute()
const { proxy } = getCurrentInstance()

const loading = ref(false)
const detail = ref<PetrolStationDetailData>()
const oils = ref<PetrolStationOilsData[]>([])

const component = computed(() => {
  if (detail.value?.type === 4) {
    return TheCooperative
  } else if (detail.value?.type === 0) {
    return NonCooperative
  } else {
    return NotArchive
  }
})

if (route.params.stationId) {
  loading.value = true
  GetPetrolStationDetail({
    lat: store.state.common.latitude,
    lon: store.state.common.longitude,
    stationId: route.params.stationId,
    type: 'detail'
  }).then(data => {
    detail.value = data.detail
    oils.value = data?.oils
    loading.value = false
    if (parseFloat(data.detail.distance) >= data.detail.popEdgeDistance / 1000) {
      proxy.$dialog.confirm({
        title: '系统显示您的定位不在此油站',
        message: `请确认您是否在${data.detail.stationName}`,
        confirmButtonText: '重新选站',
        cancelButtonText: '继续支付',
        confirmButtonColor: '#389BFF'
      }).then(() => {
        router.back()
      })
    }
  })
}

onMounted(() => {
  document.getElementsByClassName('nav-bar')[0] && (document.getElementsByClassName('nav-bar')[0].style.opacity = 0.5)
})
</script>

<template>
  <van-loading v-if="loading" class="loading" size="36px" />
  <template v-else>
    <div v-if="route.params.stationId" class="petrol-station-bg" />
    <div v-else class="not-archive-station-header">
      <div class="tip">
        平台未收录的加油站
      </div>
      <div class="tip">
        新开加油站，未能及时收录
      </div>
      <div class="tip">
        加油站搬迁，未能及时更新
      </div>
      <div class="special-tip">
        当云油没有此油站，您直接打开银联支付，或微信支付，也可以完成加油支付，还可以获得立返金
      </div>
    </div>
    <router-view>
      <component
        :is="component"
        v-if="route.params.stationId && detail.type === 4"
        :data="detail"
        :oils="oils" />
      <component
        :is="component"
        v-else-if="route.params.stationId && detail.type !== 4"
        :data="detail" />
      <component :is="component" v-else />
    </router-view>
  </template>
</template>

<style lang="scss">
.loading {
  top: 36%;
  text-align: center;
}
.petrol-station-bg {
  width: 100%;
  height: 340px;
  background-image: url("~img/refuel/petrol-station-bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  left: 0;
  top: 0;
}
.not-archive-station-header {
  background: #FFFFFF;
  padding: 50px 40px 80px;
  font-size: 28px;
  color: #4A4A4A;
  .tip {
    display: flex;
    align-items: center;
    line-height: 40px;
    margin-bottom: 10px;
    &:before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #666666;
      margin-right: 16px;
    }
  }
  .special-tip {
    display: flex;
    line-height: 40px;
    font-size: 22px;
    color: #CAA067;
    align-items: baseline;
    &:before {
      content: "*";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 16px;
      position: relative;
      top: 4px;
    }
  }
}
</style>
