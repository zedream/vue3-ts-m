<script setup lang="ts">
interface Props {
  data: TransactionDetailData
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as TransactionDetailData
  }
})
</script>

<template>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row">
        <div class="label name">
          {{ $route.query.type === 'FUEL' ? '加油' : '其他消费' }}
        </div>
        <div />
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          商户名称
        </div>
        <div class="value">
          {{ props.data.merchantName || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          商户号
        </div>
        <div class="value">
          {{ props.data.merchantNo || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          交易金额
        </div>
        <div class="value ellipsis">
          ￥{{ props.data.fuelAmount || '-' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          可用余额
        </div>
        <div class="value ellipsis">
          ￥{{ props.data.balance || '-' }}
        </div>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row mb-10">
        <div class="label">
          记录编号
        </div>
        <div class="value">
          {{ props.data.fuelOrderFlowNo || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          交易时间
        </div>
        <div class="value">
          {{ props.data.createTime || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          支付方式
        </div>
        <div class="value">
          {{ props.data.payWay || '-' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          银行账号
        </div>
        <div class="value">
          {{ props.data.cardInfo || '-' }}
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
      <div class="flex-row mb-10">
        <div class="label">
          立返金额
        </div>
        <div class="value color-red">
          ￥{{ props.data.cashBackAmount || '0.00' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          立返单号
        </div>
        <div class="value color-blue">
          {{ props.data.cashBackFlowNo || '-' }}
        </div>
      </div>
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
