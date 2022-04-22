<script setup lang="ts">
import { GetOrderList } from '@/api/order'
import { useStore } from '@/store'
import OrderItem from './components/OrderItem.vue'

const store = useStore()
const { proxy } = getCurrentInstance()

const reachBottomFlag = ref(true)
const tabs = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '待付款',
    value: 'un_pay'
  },
  {
    label: '已付款',
    value: 'payed'
  },
  {
    label: '已取消',
    value: 'canceled'
  }
]
const loading = ref(true)
const active = ref('')
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const orderList = ref<OrderListData[]>([])

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
    getOrderList()
  }
})

getOrderList()

function onTabChange () {
  page.value = 1
  orderList.value = []
  /**
   * @description 不加下面语句切换tab时会偶发无法触发触底加载
   * @author Tang Hao(1115491560@qq.com)
   * @date 2022/4/15 15:13
   */
  reachBottomFlag.value = true
  getOrderList()
}

function getOrderList () {
  loading.value = true
  GetOrderList({
    memberId: store.state.user.memberId,
    page: page.value,
    pageSize: pageSize.value,
    payStatus: active.value
  }).then(data => {
    orderList.value.push(...(data.items || []))
    total.value = data.total
    loading.value = false
  })
}

function refreshList () {
  page.value = 1
  orderList.value = []
  getOrderList()
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
      <OrderItem
        v-for="(order, index) in orderList"
        :key="order.orderNo"
        :show-date="index === 0 || order.createDateStr !== orderList[index - 1].createDateStr"
        :data="order"
        @refresh-list="refreshList" />
      <van-loading v-show="loading" color="#1989fa" />
      <div v-show="!orderList.length && !loading" class="empty" />
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
