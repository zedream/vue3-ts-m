<script setup lang="ts">
import { GetActivityMultiplePopup } from '@/api/activity'
import Storage from '@/utils/storage'
import { store } from '@/store'
import { StorageExpire, StorageTypesCommon } from '@/types/storage.types'
import router from '@/router'

const show = ref(false)
const multiplePopup = ref<ActivityMultiplePopupData[]>([])

watch(() => store.state.common.canLoadMP, (value) => {
  (value && !Storage.Session.get(StorageTypesCommon.APP_SHOWN_MULTIPLE_POPUP_SESSION)) && getActivityMultiplePopup()
})

function handleTapImage (item) {
  show.value = false
  if (item.originView) {
    switch (item.originView) {
      case 'personalHubPageApp':
        router.replace('/mine')
        break
      case 'rechargePageApp':
        show.value = false
        break
      case 'refuelingListPageApp':
        router.replace('/refuel')
        break
      case 'verifiedPageApp':
        router.push('/openAccount/guide')
        break
      default:
        break
    }
  } else if (item.redirectUrl) {
    window.location.href = item.redirectUrl
  }
}

function getActivityMultiplePopup () {
  GetActivityMultiplePopup().then(data => {
    multiplePopup.value = data
    if (data.length) {
      show.value = true
      Storage.Session.set(StorageTypesCommon.APP_SHOWN_MULTIPLE_POPUP_SESSION, true, StorageExpire.Day)
    }
  }).catch(() => {
    show.value = false
  })
}
</script>

<template>
  <van-overlay
    class-name="multiple-popup-overlay"
    :show="show">
    <van-swipe
      class="my-swiper"
      :autoplay="0"
      lazy-render>
      <van-swipe-item v-for="(item, index) in multiplePopup" :key="index">
        <img
          class="image"
          :src="item.imageUrl"
          alt="云油加油"
          @click="handleTapImage(item)">
      </van-swipe-item>
    </van-swipe>
    <img class="close" src="~img/activity/multiple-popup-close.png" @click="show = false">
  </van-overlay>
</template>

<style scoped lang="scss">
.multiple-popup-overlay {
  z-index: 2022;
  .my-swiper {
    height: 100%;
    .van-swipe-item {
      display: grid;
      place-items: center;
      .image {
        width: 610px;
      }
    }
    :deep(.van-swipe__indicators) {
      bottom: 20%;
    }
  }
  .close {
    position: absolute;
    width: 70px;
    height: 70px;
    padding: 35px;
    left: 50%;
    margin-left: -70px;
    bottom: 5%;
  }
}
</style>
