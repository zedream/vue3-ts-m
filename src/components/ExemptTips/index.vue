<script setup lang="ts">
import { useStore } from '@/store'
import { RefuelType } from '@/store/mutation.types'

const store = useStore()

function handleCloseTip () {
  store.commit(`refuel/${RefuelType.SET_EXEMPT}`, 'false')
}
</script>

<template>
  <div v-if="$store.state.refuel.exempt" class="exempt-tips">
    <div class="exempt-icon" />
    <div class="exempt-text">
      油站信息取自第三方地图信息平台
    </div>
    <div class="exempt-close" @click="handleCloseTip" />
  </div>
</template>

<style scoped lang="scss">
.exempt-tips {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 0 14px 0 30px;
  box-sizing: border-box;
  .exempt-icon {
    width: 32px;
    height: 32px;
    background-image: url("~img/refuel/exempt-icon.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .exempt-text {
    flex: 1;
    font-size: 22px;
    color: #CBCBCB;
    line-height: 32px;
    margin-left: 20px;
  }
  .exempt-close {
    width: 24px;
    height: 24px;
    background-image: url("~img/refuel/exempt-close.png");
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center center;
    padding: 16px;
  }
}
</style>
