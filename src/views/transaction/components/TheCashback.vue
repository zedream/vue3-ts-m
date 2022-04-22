<script setup lang="ts">
import { ReceiveCashback } from '@/api/transaction'
import router from '@/router'

interface Props {
  data: TransactionDetailData
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as TransactionDetailData
  }
})

const route = useRoute()
const { proxy } = getCurrentInstance()

const Status = {
  un_receive: '待领取',
  received: '已领取',
  cancel: '已取消'
}

function handleReceive () {
  ReceiveCashback({
    orderNo: route.params.orderId,
    tradeType: route.query.type
  }).then(() => {
    proxy.$notify({ type: 'success', message: '领取成功' })
    router.back()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
  })
}
</script>

<template>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row">
        <div class="label name">
          立返
        </div>
        <div class="value status">
          {{ Status[props.data.cashBackReceiveStatus] }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          立返金额
        </div>
        <div class="value">
          ￥{{ props.data.cashBackAmount }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          可用余额
        </div>
        <div class="value">
          ￥{{ props.data.balance }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          入账省钱卡
        </div>
        <div class="value ellipsis">
          {{ props.data.cardInfo }}
        </div>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row mb-10">
        <div class="label">
          立返单号
        </div>
        <div class="value">
          {{ props.data.cashBackFlowNo || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          创建时间
        </div>
        <div class="value">
          {{ props.data.createTime }}
        </div>
      </div>
      <div v-if="data.cashBackReceiveStatus === 'received' || data.cashBackReceiveStatus === 'cancel'" class="flex-row">
        <div class="label">
          {{ data.cashBackReceiveStatus === 'received' ? '完成时间' : '取消时间' }}
        </div>
        <div class="value ellipsis">
          {{ data.cashBackReceiveStatus === 'received' ? props.data.receiveTime : props.data.cancelTime }}
        </div>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row mb-10">
        <div class="label">
          匹配加油单号
        </div>
        <div class="value color-blue">
          {{ props.data.matchedConsumedNo || props.data.marchFuelOrderNo || '-' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          加油记录编号
        </div>
        <div class="value color-blue">
          {{ props.data.fuelOrderFlowNo || '-' }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.data.cashBackReceiveStatus === 'un_receive'" class="bottom-button">
    <div class="common-button" @click="handleReceive">
      {{ `领${ props.data.cashBackAmount }元立返金` }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  padding: 0 20px;
  margin: 20px 0;
  .content-wrapper {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 30px 20px;
    font-size: 26px;
    color: #939393;
    .flex-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        width: 200px;
        flex-shrink: 0;
      }
      .value {
        flex: 1;
        text-align: right;
        line-height: 38px;
      }
      .name {
        font-size: 32px;
        color: #292929;
        font-weight: 600;
        line-height: 45px;
        margin-bottom: 30px;
      }
      .status {
        font-size: 30px;
        color: #9C9C9C;
        font-weight: 600;
        line-height: 45px;
        margin-bottom: 30px;
      }
      .color-red {
        color: #D21F1C;
      }
      .color-blue {
        color: #4A90E2;
      }
    }
    .mb-10 {
      margin-bottom: 10px;
    }
  }
}
</style>
