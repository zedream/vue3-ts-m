<script setup lang="ts">
import TheRetain from './components/TheRetain.vue'
import { useBankRoute } from '@/hooks'

const { proxy } = getCurrentInstance()

function handleToNext () {
  useBankRoute(proxy)
}
</script>

<template>
  <div class="activate-container">
    <div class="activate-top" />
    <div class="middle-tip">
      加油省钱卡是云油与商业银行合作打造的云油车主客户专属账户
    </div>
    <div class="activate-bottom" />
    <div class="bottom-btn">
      <div class="bottom-tip">
        *开卡前准备：身份证正反面照片、任意储蓄卡卡号
      </div>
      <div class="common-button" @click="handleToNext">
        请您在加油前开通加油省钱卡
      </div>
    </div>
    <TheRetain />
  </div>
</template>

<style scoped lang="scss">
.activate-container {
  background: #FFFFFF;
  min-height: 100%;
  padding-bottom: 190px;
}
.activate-top {
  width: 750px;
  height: 445px;
  background-image: url("~img/openAccount/guide-top.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.middle-tip {
  font-weight: 600;
  font-size: 28px;
  color: #FFB016;
  text-align: center;
  line-height: 38px;
}
.activate-bottom {
  width: 640px;
  height: 742px;
  background-image: url("~img/openAccount/guide-bottom.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin: 0 auto;
}
.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px 60px;
  background: #FFFFFF;
  width: 100%;
  height: 190px;
  text-align: center;
  box-sizing: border-box;
  .bottom-tip {
    margin-bottom: 20px;
    font-size: 26px;
    color: #F68300;
  }
}
</style>
