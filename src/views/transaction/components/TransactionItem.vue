<script setup lang="ts">
import router from '@/router'

interface Props {
  data: TransactionListData,
  showDate: boolean
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as TransactionListData
  },
  showDate: false
})

function handleToDetail (orderId, tradeType) {
  if (tradeType === 'REFUELCASHBACK' ||
    tradeType === 'REFUELCASHBACKEXTRA' ||
    tradeType === 'FUEL' ||
    tradeType === 'WITHDRAW' ||
    tradeType === 'guide') {
    router.push({
      path: `/transaction/${orderId}`,
      query: {
        type: tradeType
      }
    })
  }
}
</script>

<template>
  <div v-if="props.showDate" class="date">
    {{ props.data.createDate }}
  </div>
  <div class="transaction-item bottom-line" @click="handleToDetail(props.data.orderId, props.data.tradeType)">
    <div class="flex-row">
      <div class="name">
        {{ props.data.title }}
        <span v-if="props.data.orderDesc" class="sub-name">
          {{ `(${props.data.orderDesc})` }}
        </span>
      </div>
      <div class="transaction-amount" :class="[props.data.realAmount.indexOf('+') > -1 ? 'color-red' : 'color-black']">
        {{ props.data.realAmount }}
      </div>
    </div>
    <div class="flex-row">
      <div class="transaction-date">
        {{ props.data.createTime }}
      </div>
      <div class="amount">
        {{ props.data.accountAmt }}
      </div>
    </div>
    <div
      v-if="props.data.tradeType === 'BUY' &&
        props.data.buttons &&
        props.data.buttons.length"
      class="flex-row">
      <div />
      <template v-for="button in props.data.buttons" :key="button.gotoType">
        <div v-if="props.data.gotoType !== 'orderRefundApplyFenQiLe' && props.data.gotoType !== 'orderRefundFenQiLeProceeding'" class="refund">
          {{ button.buttonTitle }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date {
  line-height: 80px;
  font-size: 28px;
  color: #9B9B9B;
  padding-left: 40px;
}
.transaction-item {
  box-sizing: border-box;
  padding: 30px 40px;
  background: #FFFFFF;
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .name {
      font-size: 28px;
      color: #292929;
      font-weight: 600;
      line-height: 40px;
      .sub-name {
        font-size: 24px;
        color: #292929;
        font-weight: 400;
      }
    }
    .transaction-amount {
      font-size: 30px;
      font-weight: 800;
      line-height: 40px;
    }
    .transaction-date {
      font-size: 22px;
      color: #999999;
      line-height: 30px;
      margin-top: 16px;
    }
    .amount {
      font-size: 22px;
      color: #999999;
      line-height: 30px;
      margin-top: 16px;
    }
    .refund {
      font-size: 22px;
      color: #4981FA;
      font-weight: 600;
      line-height: 30px;
      margin-top: 20px;
    }
    .color-red {
      color: #D21F1C;
    }
    .color-black {
      color: #292929;
    }
  }
}
.bottom-line:after {
  margin: 0 60px;
}
</style>
