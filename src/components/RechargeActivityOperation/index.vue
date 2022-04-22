<script setup lang="ts">
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { getActivityConfig } from '@/utils/global'
import { useJumpPage } from '@/hooks'
import { store } from '@/store'
import router from '@/router'

const { proxy } = getCurrentInstance()

const showRule = ref(false)
const ruleImg = ref('')
const buyTopConfig = ref<BuyTopConfigData[]>([])

const activityConfigStr = Storage.Session.get(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION)
if (activityConfigStr) {
  if (JSON.parse(activityConfigStr).buyTopConfig && JSON.parse(activityConfigStr).buyTopConfig.length) {
    buyTopConfig.value = JSON.parse(activityConfigStr).buyTopConfig
  } else if (JSON.parse(activityConfigStr).buyPageImageTop) {
    buyTopConfig.value = [{
      buyTopImg: JSON.parse(activityConfigStr).buyPageImageTop,
      adJumpusage: '',
      sortNo: '',
      ruleImg: ''
    }]
  }
} else {
  getActivityConfig().then(data => {
    if (data.buyTopConfig && data.buyTopConfig.length) {
      buyTopConfig.value = data.buyTopConfig
    } else if (data.buyPageImageTop) {
      buyTopConfig.value = [{
        buyTopImg: data.buyPageImageTop,
        adJumpusage: '',
        sortNo: '',
        ruleImg: ''
      }]
    }
  })
}

function handleTapRule (image) {
  showRule.value = true
  ruleImg.value = image
}

function handleJumpPage (adJumpusage: GotoType, checkParticipate?: boolean, imageHyperlink: string) {
  if (!store.state.user.token) {
    return router.push('/login')
  }
  // if (!checkParticipate) {
  //   return proxy.$toast('亲，看看别的活动吧~')
  // }
  useJumpPage(adJumpusage, imageHyperlink)
}
</script>

<template>
  <van-swipe
    v-if="buyTopConfig && buyTopConfig.length"
    class="my-swiper"
    :autoplay="3000"
    lazy-render>
    <van-swipe-item v-for="(item, index) in buyTopConfig" :key="index">
      <div v-if="item.ruleImg" class="activity-rule" @click="handleTapRule(item.ruleImg)" />
      <img
        class="image"
        :src="item.buyTopImg"
        alt="云油加油"
        @click="handleJumpPage(item.adJumpusage, item.checkParticipate, item.imageHyperlink)">
    </van-swipe-item>
  </van-swipe>
  <div v-else class="joke">
    广告位招商
  </div>
  <van-overlay :show="showRule" :lock-scroll="false" class-name="my-overlay">
    <div class="wrapper">
      <div class="title">
        活动规则
      </div>
      <div class="img-box">
        <img class="image" :src="ruleImg" alt="云油加油">
      </div>
      <i class="iconfont icon-close" @click="showRule = false" />
    </div>
  </van-overlay>
</template>

<style scoped lang="scss">
.my-swiper {
  height: 630px;
  .activity-rule {
    width: 115px;
    height: 50px;
    background-image: url("~img/recharge/activity-rule-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 30px;
    z-index: 1;
  }
  .image {
    width: 100%;
  }
}
.my-overlay {
  z-index: 2022;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    user-select: auto;
    width: 80%;
    max-height: 60%;
    background: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    .title {
      text-align: center;
      font-size: 36px;
      font-weight: 600;
      color: #292929;
      line-height: 80px;
      flex-shrink: 0;
    }
    .img-box {
      flex: 1;
      overflow: auto;
      .image {
        width: 100%;
      }
    }
    .icon-close {
      position: absolute;
      bottom: -140px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 60px;
      color: #FFFFFF;
      padding: 20px;
    }
  }
}
.joke {
  height: 630px;
  color: #F5A623;
  font-size: 56px;
  font-weight: 600;
  text-align: center;
  line-height: 360px;
}
</style>
