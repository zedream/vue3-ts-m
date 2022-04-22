<script setup lang="ts">
import { GetRefuelOrderDetail } from '@/api/order'
import { zeroFill } from '@/utils/utils'

const route = useRoute()
const { proxy } = getCurrentInstance()

const state = reactive<OrderDetailData>({} as OrderDetailData)

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetRefuelOrderDetail(route.params.orderNo).then(data => {
  Object.assign(state, data)
  proxy.$toast.clear()
})

function handleToService () {
  proxy.$toast('努力开发中...')
}
</script>

<template>
  <div class="order-detail">
    <div class="block">
      <div class="row">
        <div class="station-name">
          {{ state.stationName }}
        </div>
        <div class="status-text">
          {{ state.payStatusStr }}
        </div>
      </div>
      <div class="row address">
        {{ state.stationAddress }}
      </div>
      <div class="row">
        <div class="label">
          油号
        </div>
        <div class="value">
          {{ state.oilName || '--' }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          油枪
        </div>
        <div class="value">
          {{ state.gunName || '--' }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          加油数量
        </div>
        <div class="value">
          {{ state.literNum || '--' }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          加油金额
        </div>
        <div class="value">
          ￥{{ zeroFill(state.orderAmount) }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          加油立减
        </div>
        <div class="value">
          ￥{{ zeroFill(state.reduceAmount) }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          实付金额
        </div>
        <div class="value amount">
          ￥{{ zeroFill(state.payAmount) }}
        </div>
      </div>
    </div>
    <div class="block">
      <div class="row">
        <div class="label">
          加油单号
        </div>
        <div class="value">
          {{ state.orderNo }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          创建时间
        </div>
        <div class="value">
          {{ state.createTime }}
        </div>
      </div>
      <!-- 这些时间的显示不知道对不对QwQ -->
      <div class="row">
        <div class="label">
          完成时间
        </div>
        <template v-if="state.stationType === 4 && state.hzType === 'yhj'">
          <div v-if="state.payStatus === 'payed'" class="value">
            {{ state.payTime }}
          </div>
          <div v-if="state.payStatus === 'canceled'" class="value">
            {{ state.updateTime }}
          </div>
        </template>
        <div v-else class="value">
          {{ state.updateTime }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          支付方式
        </div>
        <div class="value">
          {{ state.payWay || '--' }}
        </div>
      </div>
    </div>
    <div v-if="state.matchedConsumedNo" class="block">
      <div class="row">
        <div class="label">
          银行消费记录编号
        </div>
        <div class="value">
          {{ state.matchedConsumedNo }}
        </div>
      </div>
      <div class="row">
        <div class="label" />
        <div class="value">
          {{ `${state.bankName} 尾号(${state.bankNo})` }}
        </div>
      </div>
    </div>
    <div v-if="(state.stationType === 4 && state.hzType === 'yhj') || state.payStatus === 'payed'" class="block">
      <div class="row">
        <div class="label">
          加油立减
        </div>
        <div class="value">
          ￥{{ zeroFill(state.reduceAmount) }}
        </div>
      </div>
      <div class="row">
        <div>会员立返</div>
        <div class="value">
          ￥{{ zeroFill(state.vipReduceAmount) }}
        </div>
      </div>
      <div class="row">
        <div class="label" />
        <div class="value">
          本次加油 合计节省：￥{{ zeroFill(state.totalSaveAmount) }}
        </div>
      </div>
    </div>
    <div v-if="state.stationType === 4 && state.hzType === 'yhj' && state.refundInfo" class="block">
      <div v-if="state.refundInfo.refuseReason" class="row">
        <div>拒绝退款原因：</div>
        <div>{{ state.refundInfo.refuseReason }}</div>
      </div>
      <div class="row">
        <div>申请退款时间：</div>
        <div>{{ state.refundInfo.applyDate }}</div>
      </div>
      <div class="row">
        <div>退款金额：</div>
        <div>{{ state.refundInfo.refundAmount }}</div>
      </div>
      <!-- <div class="row"> -->
      <!--   <div>退款账户：</div> -->
      <!--   <div></div> -->
      <!-- </div> -->
      <div class="row">
        <div>申请方式：</div>
        <div>{{ state.refundInfo.applyType }}</div>
      </div>
      <div class="row">
        <div>退款原因：</div>
        <div>{{ state.refundInfo.refundReason }}</div>
      </div>
      <div class="row">
        <div>退款方式：</div>
        <div>{{ state.refundInfo.refundType }}</div>
      </div>
    </div>
    <div v-if="!(state.stationType === 4 && state.hzType === 'yhj')" class="block">
      <div class="row">
        <div />
        <div class="service" @click="handleToService">
          咨询客服
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-detail {
  padding: 20px;
  .block {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 30px 20px;
    color: #999999;
    font-size: 26px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .station-name {
        font-size: 32px;
        color: #292929;
        font-weight: 600;
      }
      .status-text {
        font-size: 30px;
      }
      .label {
        width: 210px;
        flex-shrink: 0;
      }
      .value {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-shrink: 1;
      }
      .amount {
        color: #454545;
        font-weight: 600;
      }
      .service {
        width: 140px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #4A90E2;
        color: #4A90E2;
        border-radius: 10px;
      }
    }
    .address {
      margin: 10px 0 30px;
      text-align: justify;
    }
  }
}
</style>
