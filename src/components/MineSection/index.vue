<script setup lang="ts">
import guide from 'img/mine/guide.png'
import transaction from 'img/mine/transaction.png'
import order from 'img/mine/order.png'
import card from 'img/mine/card.png'
import exchange from 'img/mine/exchange.png'
import refuelGuide from 'img/mine/refuel-guide.png'
import reward from 'img/mine/reward.png'
import spread from 'img/mine/spread.png'

const { proxy } = getCurrentInstance()
const router = useRouter()

function handleTapItem (path) {
  if (path) {
    router.push(path)
  } else {
    proxy.$toast('努力开发中...')
  }
}

const list = [
  {
    name: '新手引导',
    path: '/guidance',
    icon: guide
  },
  {
    name: '交易记录',
    path: '/transaction',
    icon: transaction
  },
  {
    name: '我的订单',
    path: '/order',
    icon: order
  },
  {
    name: '我的卡号',
    path: '/card',
    icon: card
  },
  {
    name: '卡券兑换',
    path: '/exchange',
    icon: exchange
  },
  {
    name: '加油指引',
    path: '/guide/refuel',
    icon: refuelGuide
  },
  {
    name: '加油补贴',
    path: '/allowance',
    icon: reward
  },
  {
    name: '推广赚钱',
    path: '/spread',
    icon: spread
  }
]
</script>

<template>
  <div class="mine-section">
    <div class="section-title bottom-line">
      我的云油
    </div>
    <div class="section-body">
      <div
        v-for="item in list"
        :key="item.name"
        class="item"
        @click="handleTapItem(item.path, item.name)">
        <img
          class="icon"
          :class="{ 'icon-animation': item.path === '/allowance' && $store.state.common.hasAllowance }"
          :src="item.icon"
          alt="云油加油">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mine-section {
  padding: 0 20px;
  background: #FFFFFF;
  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  .section-title {
    height: 90px;
    line-height: 90px;
    font-size: 30px;
    color: #292929;
    font-weight: 600;
  }
  .section-body {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(4, 96px);
    grid-row-gap: 30px;
    justify-content: space-between;
    white-space: nowrap;
    .item {
      font-size: 24px;
      color: #4A4A4A;
      text-align: center;
      line-height: 26px;
      .icon {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
      }
      .icon-animation {
        animation: animation 2s cubic-bezier(.06,.81,.94,.99) infinite;
      }
      @keyframes animation {
        0% {
          transform: rotate(0) scale(0.95);
        }
        10% {
          transform: rotate(-5deg) scale(0.9);
        }
        20% {
          transform: rotate(5deg) scale(0.9);
        }
        30% {
          transform: rotate(-10deg) scale(0.85);
        }
        400% {
          transform: rotate(10deg) scale(0.85);
        }
        50% {
          transform: rotate(-10deg) scale(1.2);
        }
        60% {
          transform: rotate(10deg) scale(1.2);
        }
        70% {
          transform: rotate(-20deg) scale(1.3);
        }
        80% {
          transform: rotate(20deg) scale(1.3);
        }
        90% {
          transform: rotate(10deg) scale(1.1);
        }
        100% {
          transform: rotate(0) scale(1);
        }
      }
    }
  }
}
</style>
