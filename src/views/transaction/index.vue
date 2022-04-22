<script setup lang="ts">
import { GetTransactionList } from '@/api/transaction'
import { useStore } from '@/store'
import TransactionItem from './components/TransactionItem'

const store = useStore()
const { proxy } = getCurrentInstance()

const tabs = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '充值',
    value: 'BUY'
  },
  {
    label: '加油',
    value: 'FUEL'
  }
]
const reachBottomFlag = ref(true)
const loading = ref(true)
const active = ref('')
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const transactionList = ref<TransactionListData[]>([])

onMounted(() => {
  document.getElementsByClassName('van-swipe')[0].addEventListener('scroll', viewScroll)
})
onBeforeUnmount(() => {
  document.getElementsByClassName('van-swipe')[0].removeEventListener('scroll', viewScroll)
})

const once = function (fn) {
  return function () {
    if (reachBottomFlag.value) {
      reachBottomFlag.value = false
      fn.apply(null, arguments)
    }
  }
}
const viewScroll = throttle(function () {
  const doc = document.getElementsByClassName('van-swipe')[0]
  if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 200) {
    reachBottom()
    reachBottomFlag.value = false
  } else {
    reachBottomFlag.value = true
  }
}, 167)
const reachBottom = once(function () {
  console.log('------ 已达到触底距离: 200 ------')
  if (total.value - page.value * pageSize.value > 0) {
    page.value++
    getTransactionList()
  }
})

getTransactionList()

function onTabChange () {
  page.value = 1
  transactionList.value = []
  /**
   * @description 不加下面语句切换tab时会偶发无法触发触底加载
   * @author Tang Hao(1115491560@qq.com)
   * @date 2022/4/15 15:13
   */
  reachBottomFlag.value = true
  getTransactionList()
}

function getTransactionList () {
  loading.value = true
  GetTransactionList({
    idList: [],
    page: page.value,
    pageSize: pageSize.value,
    queryType: active.value
  }).then(data => {
    transactionList.value.push(...(data.dataList || []))
    total.value = data.total
    loading.value = false
  })
}
</script>

<template>
  <van-tabs
    v-model:active="active"
    swipeable
    class="my-tabs"
    title-active-color="#4A90E2"
    color="#4A90E2"
    @change="onTabChange">
    <van-tab
      v-for="item in tabs"
      :key="item.label"
      :name="item.value"
      :title="item.label">
      <TransactionItem
        v-for="(transaction, index) in transactionList"
        :key="transaction.orderId"
        :show-date="index === 0 || transaction.createDate !== transactionList[index - 1].createDate"
        :data="transaction" />
      <van-loading v-show="loading" color="#1989fa" />
      <div v-show="!transactionList.length && !loading" class="empty" />
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss">
.my-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.van-tabs__content) {
    flex: 1;
    .van-swipe {
      overflow-y: auto;
      .empty {
        width: 750px;
        height: 452px;
        background-image: url("~img/mine/order-empty.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
    }
  }
  .van-loading {
    text-align: center;
    line-height: 120px;
  }
}
</style>
