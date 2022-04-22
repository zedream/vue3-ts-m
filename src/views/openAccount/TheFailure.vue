<script setup lang="ts">
import { useMemberInfo } from '@/hooks'
import OpenGuide from './components/OpenGuide.vue'
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { formatBankCard } from '@/utils/utils'

enum Bank {
  xib = '厦门国际银行',
  bcm = '交通银行',
  citic = '中信银行'
}

const route = useRoute()

const { proxy } = getCurrentInstance()

const availableAmount = ref('0.00')
const bankName = ref(Bank[route.params.bank])
const status = ref(route.query.status)
const reason = ref(decodeURIComponent(route.query.error))
const thirdCard = ref(Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_THIRD_CARD_SESSION))

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
useMemberInfo().then(result => {
  availableAmount.value = result.availableAmount
})

function handleToRefund () {
  proxy.$toast('在做了，在做了')
}
</script>

<template>
  <div class="open-failure-container">
    <div class="result-wrapper">
      <div class="failure-icon" />
      <div class="title">
        {{ status === '10001' ? '开通失败' : '开卡失败' }}
      </div>
      <div class="reason">
        失败的原因：{{ reason }}
      </div>
      <div v-if="status === '10001'" class="wait-open-tip">
        {{ `您的加油省钱卡（${ bankName }）等待开通` }}
      </div>
      <OpenGuide v-if="status === '10001'" :bank-name="bankName" />
      <div class="dashed" />
      <div class="info-box">
        <div class="card">
          <div>加油省钱卡卡号</div>
          <div>{{ formatBankCard.hide(thirdCard) }}</div>
        </div>
        <div v-if="thirdCard" class="card-tip-box">
          <div class="card-tip">
            已设置此加油省钱卡为默认省钱卡
          </div>
        </div>
        <div class="balance">
          <div>加油省钱卡余额</div>
          <div>￥{{ availableAmount }}</div>
        </div>
        <div class="refund-box">
          <div class="refund-btn" @click="handleToRefund">
            申请退款
          </div>
        </div>
      </div>
    </div>
    <div v-if="status !== '10001'" class="bottom-button">
      <div class="common-button" @click="$router.back()">
        请修改提交的资料
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-failure-container {
  min-height: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 60px 30px 180px;
  .result-wrapper {
    background: #FFFFFF;
    box-shadow: 0 6px 12px 0 #F2F2F2;
    padding: 50px 30px;
    .failure-icon {
      width: 120px;
      height: 120px;
      background-image: url("~img/openAccount/open-failure.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .title {
      font-size: 36px;
      color: #4A4A4A;
      line-height: 50px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .reason, .wait-open-tip {
      font-size: 28px;
      color: #666666;
      line-height: 40px;
      text-align: center;
    }
    .wait-open-tip {
      margin-top: 10px;
    }
    .dashed {
      margin: 70px 0 30px;
      height: 0;
      border-bottom: 1px dashed #CACACA;
    }
    .info-box {
      .balance, .card {
        font-size: 26px;
        color: #888888;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .refund-box, .card-tip-box {
        display: flex;
        justify-content: flex-end;
        .card-tip {
          font-size: 20px;
          color: #CAA067;
          line-height: 36px;
          margin-bottom: 20px;
        }
        .refund-btn {
          border-radius: 8px;
          color: #969799;
          font-size: 24px;
          line-height: 24px;
          padding: 8px 16px;
          margin-top: 20px;
          border: 1px solid #DCDEE0;
        }
      }
    }
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
