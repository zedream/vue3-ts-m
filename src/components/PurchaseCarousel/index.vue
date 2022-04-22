<script setup lang="ts">
import { GetRefuelCarouselList } from '@/api/refuel'

const list = ref<string[]>([])

GetRefuelCarouselList().then(data => {
  list.value = data.dataList
})
</script>
<template>
  <div v-if="list.length" class="carousel-container">
    <div class="horn-icon" />
    <van-swipe
      v-if="list.length"
      class="purchase-swipe"
      style="height: 6.66667vw; background: #FFFBF7;"
      vertical
      autoplay="3000"
      :touchable="false"
      :show-indicators="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <div>{{ item }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
.carousel-container {
  display: flex;
  align-items: center;
  background: #FFFBF7;
  padding-left: 20px;
}
.horn-icon {
  width: 24px;
  height: 24px;
  background-image: url("~img/refuel/horn.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin-right: 10px;
}
.van-swipe-item {
  font-size: 24px;
  color: #F5A623;
  display: flex;
  align-items: center;
}
</style>
