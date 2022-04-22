<script setup lang="ts">
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesCommon } from '@/types/storage.types'

const showApiPicker = ref(false)
const apiColumns = [
  '/',
  'https://c2b-test1.brightoilonline.com',
  'https://c2b-test2.brightoilonline.com',
  'https://c2b-test3.brightoilonline.com',
  'https://c2b-test4.brightoilonline.com',
  'https://c2b-test5.brightoilonline.com',
  'https://c2b-test6.brightoilonline.com',
  'https://c2b-test7.brightoilonline.com',
  'https://c2b-test8.brightoilonline.com',
  'https://c2b-test9.brightoilonline.com',
  'https://c2b-test10.brightoilonline.com',
  'https://c2b-test11.brightoilonline.com',
  'https://c2b-test12.brightoilonline.com',
  'https://c2b-test13.brightoilonline.com',
  'https://c2b-test14.brightoilonline.com',
  'https://c2b-test15.brightoilonline.com',
  'https://c2b.brightoilonline.com'
]

if (!Storage.Session.get(StorageTypesCommon.APP_API_DOMAIN_HAS_CHANGED_SESSION)) {
  showApiPicker.value = true
  Storage.Session.set(StorageTypesCommon.APP_API_DOMAIN_HAS_CHANGED_SESSION, true, StorageExpire.Day)
}

setTimeout(() => {
  Storage.Session.remove(StorageTypesCommon.APP_API_DOMAIN_HAS_CHANGED_SESSION)
}, 3000)

function onConfirm (value) {
  Storage.Session.remove(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION)
  window.location.reload()
  Storage.Session.set(StorageTypesCommon.APP_API_DOMAIN_SESSION, value, StorageExpire.Day)
  Storage.Session.set(StorageTypesCommon.APP_API_DOMAIN_HAS_CHANGED_SESSION, true, StorageExpire.Day)
  showApiPicker.value = false
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <van-popup v-model:show="showApiPicker" position="bottom">
    <van-picker
      title="选择环境"
      :columns="apiColumns"
      @confirm="onConfirm"
      @cancel="showApiPicker = false" />
  </van-popup>
</template>

<style lang="scss">
@import "assets/styles/base.global";
@import 'assets/iconfont/iconfont.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
