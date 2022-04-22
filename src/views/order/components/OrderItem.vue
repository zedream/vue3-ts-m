<script setup lang="ts">
import { CancelRefuelOrder } from '@/api/order'

interface Props {
  data: OrderListData,
  showDate: boolean
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as OrderListData
  },
  showDate: false
})
const emit = defineEmits<{(e: 'refreshList'): void}>()

const router = useRouter()
const { proxy } = getCurrentInstance()

function handleToDetail (orderNo) {
  router.push(`/order/${orderNo}`)
}

function handleCancelOrder (orderNo) {
  proxy.$dialog.confirm({
    title: '提示',
    message: '确认要取消该订单吗',
    confirmButtonText: '去支付',
    cancelButtonText: '取消订单',
    confirmButtonColor: '#389BFF',
    closeOnClickOverlay: true
  }).then(() => {
    handleToCashier(orderNo)
  }).catch(() => {
    CancelRefuelOrder(orderNo).then(() => {
      proxy.$notify({ type: 'success', message: '取消成功' })
      emit('refreshList')
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  })
}

function handleToCashier (orderNo) {
  router.push({
    path: '/refuelCashier',
    query: {
      orderNo
    }
  })
}

function handleAgainRefuel (stationId) {
  router.push(`/petrolStation/${stationId}`)
}
</script>

<template>
  <div v-if="props.showDate" class="date">
    {{ props.data.createDateStr }}
  </div>
  <div class="order-item bottom-line" @click="handleToDetail(props.data.orderNo)">
    <div class="flex-row">
      <div class="station-name">
        {{ props.data.stationName }}
      </div>
      <div class="pay-state">
        {{ props.data.payStatusStr }}
      </div>
    </div>
    <div class="flex-row second-row">
      <div>
        <div class="oil-name">
          {{ props.data.oilName }}
        </div>
        <div class="oil-count">
          {{ props.data.literNum }}
        </div>
      </div>
      <div class="amount">
        -{{ props.data.payAmount }}
      </div>
    </div>
    <div class="time">
      {{ props.data.createTime }}
    </div>
    <div
      v-if="(props.data.payStatus === 'un_pay'
        && props.data.stationType === 4
        && props.data.hzType === 'yhj')
        || props.data.cashBackReceiveStatus === 'un_receive'
        || props.data.stationId"
      class="button-wrapper">
      <div v-if="props.data.payStatus === 'un_pay' && props.data.stationType === 4 && props.data.hzType === 'yhj'" class="button" @click.stop="handleCancelOrder(props.data.orderNo)">
        取消
      </div>
      <div v-if="props.data.payStatus === 'un_pay' && props.data.stationType === 4 && props.data.hzType === 'yhj'" class="button" @click.stop="handleToCashier(props.data.orderNo)">
        去支付
      </div>
      <div v-if="false" class="button">
        申请退款
      </div>
      <div v-if="props.data.cashBackReceiveStatus === 'un_receive'" class="button">
        领取立返金
      </div>
      <div v-if="props.data.stationId" class="button colorful" @click.stop="handleAgainRefuel(props.data.stationId)">
        再次前往
      </div>
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
.order-item {
  box-sizing: border-box;
  padding: 30px 40px;
  background: #FFFFFF;
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .station-name {
      font-size: 28px;
      color: #292929;
      font-weight: 600;
    }
    .pay-state {
      font-size: 28px;
      color: #999999;
    }
    .oil-name, .oil-count {
      background: rgba(153,153,153,0.55);
      border-radius: 4px;
      font-size: 22px;
      color: #FFFFFF;
      line-height: 36px;
      display: inline-block;
      margin-right: 24px;
      padding: 0 12px;
    }
    .amount {
      font-size: 30px;
      color: #292929;
      font-weight: 600;
    }
  }
  .second-row {
    margin: 12px 0;
  }
  .time {
    font-size: 22px;
    color: #9B9B9B;
    position: relative;
    z-index: 1;
  }
  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    position: relative;
    z-index: 1;
    .button {
      background: #FFFFFF;
      border: 1px solid #999999;
      border-radius: 30px;
      width: 160px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 26px;
      color: #999999;
      flex-shrink: 0;
      margin-left: 12px;
      &:first-child {
        margin-left: 0;
      }
    }
    .colorful {
      border: 1px solid #4A90E2;
      color: #4A90E2;
    }
  }
}
.bottom-line:after {
  margin: 0 60px;
}
</style>
