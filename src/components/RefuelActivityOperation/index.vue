<script setup lang="ts">
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { getActivityConfig } from '@/utils/global'
import { useJumpPage } from '@/hooks'
import { store } from '@/store'
import router from '@/router'

const { proxy } = getCurrentInstance()

const imageLoaded = ref(false)
const stationRotation = ref<StationRotationData[]>([])

const activityConfigStr = Storage.Session.get(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION)
if (activityConfigStr) {
  stationRotation.value = JSON.parse(activityConfigStr).stationRotation
  stationRotation.value?.forEach(_ => {
    const image = new Image()
    image.src = _.image
    image.onload = () => {
      imageLoaded.value = true
    }
  })
} else {
  getActivityConfig().then(data => {
    stationRotation.value = data.stationRotation
    stationRotation.value?.forEach(_ => {
      const image = new Image()
      image.src = _.image
      image.onload = () => {
        imageLoaded.value = true
      }
    })
  })
}

function handleTapImage (gotoType: GotoType, checkParticipate?: boolean, imageHyperlink: string) {
  if (!store.state.user.token) {
    return router.push('/login')
  }
  // if (!checkParticipate) {
  //   return proxy.$toast('亲，看看别的活动吧~')
  // }
  useJumpPage(gotoType, imageHyperlink)
}
</script>

<template>
  <van-swipe
    v-if="imageLoaded && stationRotation && stationRotation.length"
    class="my-swiper"
    :autoplay="3000"
    :show-indicators="false"
    lazy-render>
    <van-swipe-item v-for="(item, index) in stationRotation" :key="index">
      <img
        class="image"
        :src="item.image"
        alt="云油加油"
        @click="handleTapImage(item.gotoType, item.checkParticipate, item.imageHyperlink)">
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped lang="scss">
.my-swiper {
  height: 200px;
  .image {
    width: 100%;
  }
}
</style>
