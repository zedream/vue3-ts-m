<script setup lang="ts">
import { GetRedEnvelopeDetail } from '@/api/common'
import { useRoute } from 'vue-router'
import moment from '@/utils/moment'

const route = useRoute()
const { proxy } = getCurrentInstance()

const detail = ref<RedEnvelopeData>({} as RedEnvelopeData)

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetRedEnvelopeDetail(route.params.redEnvelopeId).then(data => {
  proxy.$toast.clear()
  detail.value = data
}).catch(error => {
  proxy.$notify({ type: 'danger', message: error })
  proxy.$toast.clear()
})
</script>

<template>
  <div class="red-envelope-detail">
    <div class="red-envelope">
      <div class="amount">
        {{ detail.redEnvelopeAmountStr }}
      </div>
      <div class="unit">
        元
      </div>
    </div>
    <div class="red-envelope-info">
      <div class="row">
        <div class="label">
          红包状态：
        </div>
        <div class="value">
          {{ detail.status }}
        </div>
      </div>
      <div v-if="detail.status === '已领取'" class="row">
        <div class="label">
          领取时间：
        </div>
        <div class="value">
          {{ moment.format('yyyy-MM-dd', detail.acquireTime) }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          领取条件：
        </div>
        <div class="value">
          单笔加油实付满{{ detail.acquireConditionStr }}元
        </div>
      </div>
      <div class="row">
        <div class="label">
          有效期至：
        </div>
        <div class="value">
          {{ moment.format('yyyy-MM-dd', detail.invalidTime) }}
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <div v-if="detail.status === '待领取'" class="receive">
        领取
      </div>
      <div v-if="detail.status === '待解锁'" class="refuel">
        去加油
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.red-envelope-detail {
  padding: 30px;
  .red-envelope {
    width: 100%;
    height: 640px;
    background-repeat: no-repeat;
    background-image: url("~img/other/red-envelope-detail.png");
    background-position: center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .amount {
      font-size: 200px;
      font-weight: 600;
      color: #FF6A00;
      line-height: 200px;
      margin-bottom: 60px;
    }
    .unit {
      font-size: 60px;
      color: #FF6A00;
      line-height: 200px;
      margin-top: 20px;
      margin-left: 10px;
    }
  }
  .red-envelope-info {
    margin-top: 60px;
    .row {
      display: flex;
      align-items: center;
      font-size: 30px;
      margin-top: 10px;
      .label {
        width: 160px;
        color: #646566;
      }
      .value {
        flex: 1;
        color: #969799;
      }
    }
  }
  .button-wrapper {
    margin-top: 120px;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    font-weight: 600;
    .receive {
      padding: 29px 0;
      box-sizing: border-box;
      background-color: #FFFFFF;
      color: #1989FA;
      border: 1px solid #1989FA;
      border-radius: 10px;
      letter-spacing: 4px;
    }
    .refuel {
      padding: 29px 0;
      box-sizing: border-box;
      background-color: #1989FA;
      color: #FFFFFF;
      border: 0;
      border-radius: 10px;
      letter-spacing: 2px;
      margin-top: 30px;
    }
  }
}
</style>
