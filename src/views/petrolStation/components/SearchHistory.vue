<script setup lang="ts">
import { store } from '@/store'
import { RefuelType } from '@/store/mutation.types'
import router from '@/router'

interface Props {
  historyList: HistoryList[]
}
const props = withDefaults(defineProps<Props>(), {
  historyList: () => {
    return []
  }
})
const emit = defineEmits<{(e: 'onHistory', searchKey: string): void}>()

const { proxy } = getCurrentInstance()

const removeKey = ref('')
const removeText = ref('删除')
const longTimer = ref<NodeJS.Timer | null>(null)
/**
 * 清除所有历史记录
 */
function handleRemoveHistory () {
  proxy.$dialog.confirm({
    title: '提示',
    message: '确认要删除所有历史记录吗',
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    confirmButtonColor: '#389BFF'
  }).then(() => {
    store.commit(`refuel/${RefuelType.CLEAR_SEARCH_HISTORY}`)
  })
}
/**
 * 点击历史记录
 * 进入油站或者触发搜索联想
 */
function handleTapHistory (history) {
  store.commit(`refuel/${RefuelType.SET_SEARCH_HISTORY}`, history)
  if (history.stationId) {
    router.push(`/petrolStation/${history.stationId}`)
  } else {
    emit('onHistory', history.name)
  }
}
/**
 * 长按事件
 */
function handleTouchstart () {
  longTimer.value && clearTimeout(longTimer.value)
  longTimer.value = null
  longTimer.value = setTimeout(() => {
    console.log('触发长按')
    longTimer.value && clearTimeout(longTimer.value)
    longTimer.value = null
  }, 500)
}
function handleTouchmove () {
  longTimer.value && clearTimeout(longTimer.value)
}
function handleTouchend () {
  longTimer.value && clearTimeout(longTimer.value)
}
</script>

<template>
  <div class="search-history-header">
    <div>历史搜索记录</div>
    <i class="iconfont icon-search-remove" @click="handleRemoveHistory" />
  </div>
  <div
    class="search-history-box"
    @touchstart="handleTouchstart"
    @touchmove="handleTouchmove"
    @touchend="handleTouchend">
    <div
      v-for="item in historyList"
      :key="item.name"
      class="search-history"
      @click="handleTapHistory(item)">
      <div class="search-key">
        {{ item.name }}
      </div>
      <div class="remove">
        {{ removeText }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 20px;
  height: 80px;
  color: #323233;
  font-size: 30px;
  .icon-search-remove {
    font-size: 36px;
    padding: 12px;
  }
}
.search-history-box {
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  .search-history {
    font-size: 24px;
    color: #969799;
    border: 1px solid #DCDEED;
    line-height: 24px;
    padding: 8px 16px;
    border-radius: 8px;
    background: #FFFFFF;
    width: max-content;
    margin-bottom: 16px;
    margin-right: 20px;
    .search-key {
      position: relative;
      backface-visibility: hidden;
      line-height: 24px;
    }
    .remove {
      width: 50px;
      position: absolute;
      backface-visibility: hidden;
      transform: rotateY(180deg);
      line-height: 24px;
    }
  }

}
</style>
