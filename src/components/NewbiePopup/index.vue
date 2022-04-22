<script setup lang="ts">
import { GetNewbieTask } from '@/api/activity'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesCommon } from '@/types/storage.types'
import { store } from '@/store'
import { CommonType, UserType } from '@/store/mutation.types'
import router from '@/router'

const show = ref(false)
const hideMini = ref(false)
const scrollTop = ref(0)
const stopTop = ref(0)
const newbieImage = ref('')
const originView = ref('')
const newMemberStatus = ref('')
const redirectUrl = ref('')
const timer = ref(null)

getNewbieTask()

onMounted(() => {
  document.querySelector('.main').addEventListener('scroll', listenScroll)
})

onActivated(() => {
  getNewbieTask()
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
  timer.value = null
})

const listenScroll = throttle(function (e) {
  hideMini.value = true
  clearTimeout(timer.value)
  timer.value = null
  timer.value = setTimeout(() => {
    judgeScroll()
  }, 500)
  scrollTop.value = e.target.scrollTop
}, 17)

function judgeScroll () {
  stopTop.value = document.querySelector('.main').scrollTop
  if (stopTop.value === scrollTop.value) { // 未滚动
    hideMini.value = false
  }
}

function handleTapImage () {
  if (originView.value) {
    switch (originView.value) {
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
  } else if (newMemberStatus.value) {
    switch (newMemberStatus.value) {
      case 1:
        show.value = false
        break
      case 2:
        router.push('/openAccount/guide')
        break
      case 3:
        router.push('/bind')
        break
      case 4:
        router.replace('/refuel')
        break
      default:
        break
    }
  } else if (redirectUrl.value) {
    window.location.href = redirectUrl.value
  }
}

function getNewbieTask () {
  GetNewbieTask().then(data => {
    const shownNewbie = Storage.Local.get(StorageTypesCommon.APP_SHOWN_NEWBIE_LOCAL)
    if (data.newMemberStatus) {
      newbieImage.value = data.imageUrl
      originView.value = data.originView
      newMemberStatus.value = data.newMemberStatus
      redirectUrl.value = data.redirectUrl
      store.commit(`user/${UserType.SET_NEWBIE}`, true)
      store.commit(`common/${CommonType.SET_CAN_LOAD_MP}`, !!shownNewbie)
      if (!shownNewbie) {
        show.value = true
        Storage.Local.set(StorageTypesCommon.APP_SHOWN_NEWBIE_LOCAL, true, StorageExpire.Year)
      }
    } else {
      store.commit(`user/${UserType.SET_NEWBIE}`, false)
      store.commit(`common/${CommonType.SET_CAN_LOAD_MP}`, true)
    }
  }).catch(() => {
    store.commit(`user/${UserType.SET_NEWBIE}`, false)
  })
}
</script>

<template>
  <div v-if="$store.state.user.newbie">
    <van-overlay
      class-name="my-overlay"
      :show="show">
      <img class="newbie-image" :src="newbieImage" @click="handleTapImage">
      <div class="newbie-close-box" @click="show = false">
        <img class="newbie-close-icon" src="~img/activity/newbie-close.png">
      </div>
    </van-overlay>
    <div v-show="!show" class="newbie-mini-box" :class="{ hide: hideMini }">
      <img class="newbie-mini" src="~img/activity/newbie-mini.gif" @click="show = true">
    </div>
  </div>
</template>

<style scoped lang="scss">
.my-overlay {
  z-index: 2022;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .newbie-image {
    width: 610px;
    height: 720px;
  }
  .newbie-close-box {
    margin-top: 40px;
    padding: 30px;
    .newbie-close-icon {
      width: 44px;
      height: 44px;
    }
  }
}
.newbie-mini-box {
  width: 240px;
  height: 99px;
  position: fixed;
  right: -16px;
  bottom: 15%;
  z-index: 520;
  transition: all 0.7s ease;
  .newbie-mini {
    width: 100%;
    height: 100%;
  }
}
.hide {
  transform: translateX(100%);
}
</style>
