<script setup lang="ts">
import router from '@/router'
import { store } from '@/store'
import { RefuelType } from '@/store/mutation.types'

interface Props {
  data: SuggestionListData
  searchKey: string
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as SuggestionListData
  },
  searchKey: ''
})
const emit = defineEmits<{(e: 'onDestination', searchKey: string): void}>()

function handleTapSuggestion (suggestion) {
  store.commit(`refuel/${RefuelType.SET_SEARCH_HISTORY}`, {
    name: suggestion.name,
    stationId: suggestion.id || ''
  })
  if (suggestion.type) {
    emit('onDestination', suggestion.name)
  } else {
    router.push(`/petrolStation/${suggestion.id}`)
  }
}
</script>

<template>
  <div
    v-for="(item, index) in data"
    :key="index"
    class="suggestion"
    @click="handleTapSuggestion(item)">
    <div class="box">
      <div class="icon-box">
        <div class="icon" :class="[item.type ? 'destination' : 'petrol']" />
      </div>
      <div class="suggestion-info">
        <div class="top ellipsis">
          {{ item.name }}
        </div>
        <div class="bottom">
          <div class="left">
            {{ item.type ? '目的地' : '加油站' }}
          </div>
          <div class="mid">
            距您{{ item.distance.toFixed(2) }}公里
          </div>
          <div class="ellipsis">
            {{ item.address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.suggestion {
  padding: 0 20px;
  height: 110px;
  background: #FFFFFF;
  .box {
    border-bottom: 0.5px solid #EBEDF0;
    display: flex;
    align-items: flex-start;
    height: 100%;
    box-sizing: border-box;
    padding: 16px 10px;
    .icon-box {
      margin-right: 16px;
      .icon {
        width: 36px;
        height: 36px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
      .petrol {
        background-image: url("~img/refuel/suggestion-petrol.png");
      }
      .destination {
        background-image: url("~img/refuel/suggestion-destination.png");
      }
    }
    .suggestion-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .top {
        font-size: 30px;
        color: #292929;
        line-height: 36px;
        font-weight: 600;
      }
      .emphasize {
        color: #EF2800;
      }
      .bottom {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #B0B0B0;
        line-height: 36px;
        .left, .mid {
          text-align: left;
          border-right: 1px solid #EBEDF0;
          flex-shrink: 0;
          padding-right: 10px;
          margin-right: 10px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
