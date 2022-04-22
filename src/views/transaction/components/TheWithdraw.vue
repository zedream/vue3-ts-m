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
          提现
        </div>
        <div />
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          省钱卡号
        </div>
        <div class="value">
          {{ props.data.bankInfo || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          交易金额
        </div>
        <div class="value">
          {{ props.data.amount || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          用户名称
        </div>
        <div class="value ellipsis">
          {{ props.data.userName || '-' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          转入账户
        </div>
        <div class="value ellipsis">
          {{ props.data.receiveCardNo || '-' }}
        </div>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="content-wrapper">
      <div class="flex-row mb-10">
        <div class="label">
          可用余额
        </div>
        <div class="value">
          {{ props.data.balance || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          提现单号
        </div>
        <div class="value">
          {{ props.data.withdrawNo || '-' }}
        </div>
      </div>
      <div class="flex-row mb-10">
        <div class="label">
          创建时间
        </div>
        <div class="value">
          {{ props.data.createTime || '-' }}
        </div>
      </div>
      <div class="flex-row">
        <div class="label">
          完成时间
        </div>
        <div class="value">
          {{ props.data.completeTime || '-' }}
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
    }
    .mb-10 {
      margin-bottom: 10px;
    }
  }
}
</style>
