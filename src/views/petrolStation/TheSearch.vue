<script setup lang="ts">
import { store } from '@/store'
import RecommendStation from './components/RecommendStation.vue'
import SuggestionList from './components/SuggestionList.vue'
import SearchHistory from './components/SearchHistory.vue'
import { GetSearchSuggestion, GetSearchResult } from '@/api/refuel'
import { useOpenMap } from '@/hooks'
import { RefuelType } from '@/store/mutation.types'

const { proxy } = getCurrentInstance()

let map
const actions = [
  { name: '高德地图' },
  { name: '百度地图' },
  { name: '腾讯地图' }
]
const appearMap = {
  noHistory: 0,
  history: 1,
  suggestion: 2,
  result: 3
}
const actionShow = ref(false)
const appear = ref<number | null>(null)
const searchKey = ref('')
const lastSearchKey = ref('')
const suggestionList = ref<SuggestionListData[]>([])
const dataList = ref<DataListData[]>([])

const historyList = computed(() => store.state.refuel.searchHistory)

if (!historyList.value.length) {
  appear.value = appearMap.noHistory
} else {
  appear.value = appearMap.history
}
/**
 * 搜索框关键字变化
 */
const onSearchChange = debounce(function (value) {
  if (value) {
    getSearchSuggestion()
    appear.value = appearMap.suggestion
  } else {
    if (!historyList.value.length) {
      appear.value = appearMap.noHistory
    } else {
      appear.value = appearMap.history
    }
  }
}, 200, { leading: true })
/**
 * 历史记录、搜索联想列表子组件自定义事件
 * 填充搜索输入框并触发 获取搜索结果列表
 */
function handleSearchFill (value) {
  searchKey.value = value
  getSearchSuggestion()
  getSearchResult()
  appear.value = appearMap.result
}
/**
 * 搜索框聚焦
 */
function handleSearchFocus () {
  if (searchKey.value !== lastSearchKey.value && searchKey.value) {
    getSearchSuggestion()
    appear.value = appearMap.suggestion
  } else if (searchKey.value) {
    appear.value = appearMap.suggestion
  }
}
/**
 * 回车触发 获取搜索结果列表
 */
function handleSearch () {
  getSearchResult()
  store.commit(`refuel/${RefuelType.SET_SEARCH_HISTORY}`, {
    name: searchKey.value,
    stationId: ''
  })
  appear.value = appearMap.result
}
/**
 * 打开导航
 */
function onTapNav (location) {
  map = useOpenMap(location.longitude, location.latitude, location.address, store)
  actionShow.value = true
}
function handleOpenMap (action, index) {
  switch (index) {
    case 0:
      map.AMap()
      break
    case 1:
      map.BMap()
      break
    case 2:
      map.WeMap()
      break
    default:
      break
  }
}
/**
 * 获取搜索联想列表
 */
function getSearchSuggestion () {
  return new Promise<void>((resolve, reject) => {
    const params = {
      longitude: store.state.common.longitude,
      latitude: store.state.common.latitude,
      search: searchKey.value
    }
    if (lastSearchKey.value) {
      Object.assign(params, { lastSearch: lastSearchKey.value })
    }
    GetSearchSuggestion(params).then(data => {
      lastSearchKey.value = searchKey.value
      if (data.refresh) {
        suggestionList.value = data.items
      }
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 获取搜索油站列表
 */
function getSearchResult () {
  return new Promise<void>((resolve, reject) => {
    proxy.$toast.loading({
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
    GetSearchResult({
      search: searchKey.value,
      lon: store.state.common.longitude,
      lat: store.state.common.latitude,
      type: 'list'
    }).then(data => {
      lastSearchKey.value = searchKey.value
      dataList.value = data.dataList
      proxy.$toast.clear()
      resolve()
    }).catch(error => {
      proxy.$toast.clear()
      reject(error)
    })
  })
}
</script>

<template>
  <div class="search-container">
    <van-search
      v-model="searchKey"
      show-action
      autofocus
      placeholder="输入目的地，查找附近油站"
      autocomplete="off"
      @update:model-value="onSearchChange"
      @focus="handleSearchFocus"
      @search="handleSearch"
      @cancel="$router.back()" />
    <ExemptTips />
    <div class="content">
      <template v-if="appear === appearMap.noHistory">
        <div class="no-history-record-wrapper">
          <div class="no-history-record" />
        </div>
        <div class="recommend-wrapper">
          <div class="recommend-header">
            <div class="recommend-header-text">
              推荐油站
            </div>
          </div>
          <RecommendStation />
        </div>
      </template>
      <SearchHistory v-if="appear === appearMap.history" :history-list="historyList" @on-history="handleSearchFill" />
      <SuggestionList
        v-if="appear === appearMap.suggestion"
        :data="suggestionList"
        :search-key="searchKey"
        @on-destination="handleSearchFill" />
      <div v-if="appear === appearMap.result" class="petrol-station-list" :style="{ paddingTop: $store.state.refuel.exempt ? '0' : '2.66667vw' }">
        <RefuelStationItem
          v-for="item in dataList"
          :key="item.stationId"
          :data="item"
          @on-tap-nav="onTapNav" />
      </div>
    </div>
  </div>
  <van-action-sheet
    v-model:show="actionShow"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @cancel="actionShow = false"
    @select="handleOpenMap" />
</template>

<style scoped lang="scss">
.search-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    overflow: auto;
    flex: 1;
  }
}
.van-search {
  position: relative;
  box-shadow: 0 6px 6px 0 rgba(67, 60, 54, 0.04);
}
.no-history-record-wrapper {
  padding: 120px 0 100px;
  background: #FFFFFF;
  .no-history-record {
    margin: 0 auto;
    width: 393px;
    height: 313px;
    background-image: url("~img/refuel/no-history-record.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
}
.recommend-wrapper {
  padding: 110px 20px 0;
  position: relative;
  margin-top: 20px;
  .recommend-header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 352px;
    background-image: url("~img/refuel/recommend-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    .recommend-header-text {
      height: 110px;
      line-height: 130px;
      text-indent: 40px;
      font-size: 32px;
      color: #4A4A4A;
      font-weight: 600;
    }
  }
}
.petrol-station-list {
  padding: 20px;
}
</style>
