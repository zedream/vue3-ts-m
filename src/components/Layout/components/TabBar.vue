<script setup lang="ts">
import tarBar from '../tabBar'
import { useStore } from '@/store'
import { GetAllowanceList } from '@/api/common'
import { CommonType } from '@/store/mutation.types'

const router = useRouter()
const store = useStore()

const tarBarData = tarBar
const showIcon = ref(false)
const allowanceList = ref<AllowanceData[]>([])

getAllowanceList()

function handleTapTabBar (path) {
  getAllowanceList()
  router.replace(path)
}

function getAllowanceList () {
  GetAllowanceList({
    statusList: '2,3'
  }).then(data => {
    if (data.length > 0) {
      store.commit(`common/${CommonType.SET_HAS_ALLOWANCE}`, true)
    } else {
      store.commit(`common/${CommonType.SET_HAS_ALLOWANCE}`, false)
    }
  })
}
</script>

<template>
  <div class="tar-bar">
    <div
      v-for="(item, index) in tarBarData.list"
      :key="index"
      class="tab-bar-item"
      :class="{ 'activate': $store.state.nav.path === item.path }"
      :style="{ color: $store.state.nav.path === item.path ? tarBarData.activeColor : tarBarData.inactiveColor }"
      @click="handleTapTabBar(item.path)">
      <div class="tar-bar-box" :class="{ 'tar-bar-circle': item.path === '/refuel' }">
        <div class="tab-bar-icon">
          <img class="img" :src="$store.state.nav.path === item.path ? item.activateIcon : item.icon">
        </div>
        <div class="tar-bar-text">
          {{ item.name }}
        </div>
      </div>
      <div v-if="item.path === '/mine' && $store.state.common.hasAllowance" class="allowance">
        领取补贴
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tar-bar {
  background-image: url("~img/tabBar/tab-bar-bg.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  display: flex;
  z-index: 1220;
  font-size: 20px;
  padding-top: 30px;
  box-sizing: border-box;
  .tab-bar-item {
    height: $tarBarHeight;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .tar-bar-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .tab-bar-icon {
        width: 50px;
        height: 50px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .tar-bar-text {
        line-height: 20px;
        margin-top: 12px;
        text-align: center;
      }
    }
    .allowance {
      position: absolute;
      top: -6px;
      right: 0;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 36px;
      padding: 8px 16px;
      background: linear-gradient(180deg, #FF9571 0%, #FF4A45 76%);
      border-radius: 30px 30px 30px 4px;
      white-space: nowrap;
      transform: scale(0.5);
    }
    .tar-bar-circle {
      position: absolute;
      top: -20px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #F1F4F8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .tab-bar-icon {
        transform-style: preserve-3d;
        transition: 1s ease;
        animation: rotate 5s cubic-bezier(.05,1.64,.91,.33) 1s infinite;
        img {
          margin-left: 4px;
        }
      }
    }
  }
  .activate {
    .tar-bar-circle {
      background: linear-gradient(to bottom, #147DFD , #35A6EA);
      .tab-bar-icon {
        animation: none;
      }
      .tar-bar-text {
        color: #FFFFFF;
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
    }
    20% {
      transform: rotateY(180deg);
    }
    40% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
}
//.tab-bar {
//  position: fixed;
//  bottom: 0;
//  left: 0;
//  width: 100%;
//  height: $tarBarHeight;
//  display: flex;
//  z-index: 2022;
//  font-size: 28px;
//  padding-bottom: constant(safe-area-inset-bottom);
//  padding-bottom: env(safe-area-inset-bottom);
//  .tab-bar-item {
//    height: 100%;
//    flex: 1;
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    align-items: center;
//  }
//}
</style>
