<script setup lang="ts">
import { GetAboutUs } from '@/api/common'

type Tab = {
  label: string,
  value: number
}

const active = ref(0)
const contentList = ref<AboutUsListData[]>([])
const tabs = ref<Tab[]>([])

GetAboutUs().then(data => {
  contentList.value = data?.dataList.filter(_ => _.sort !== 2)
  contentList.value.forEach(_ => {
    tabs.value.push({
      label: _.listTitle,
      value: _.sort
    })
  })
})

</script>

<template>
  <van-tabs
    v-if="tabs.length"
    v-model:active="active"
    swipeable
    class="my-tabs"
    title-active-color="#4A90E2"
    color="#4A90E2">
    <van-tab
      v-for="(item, index) in tabs"
      :key="item.label"
      :name="index"
      :title="item.label">
      <div v-html="contentList[active].content" />
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss">
.my-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  :deep(.van-tabs__content) {
    flex: 1;
    .van-swipe {
      overflow-y: auto;
      img {
        width: 100%;
      }
    }
  }
}
</style>
