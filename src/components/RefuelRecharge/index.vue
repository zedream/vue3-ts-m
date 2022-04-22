<script setup lang="ts">
import { GetMemberInfo } from '@/api/user'
import { platform } from '@/utils/utils'
import router from '@/router'
import { PlaceOrder } from '@/api/pay'
import { store } from '@/store'
import Storage from '@/utils/storage'
import { StorageTypesPay } from '@/types/storage.types'
import { useUserState } from '@/hooks'
import { GetNoviceState } from '@/api/common'

const dev = process.env.APP_NODE_ENV === 'dev'

interface Props {
  cardRule: string
  productId: number
  refuelingCard: ProductsData[]
}
const props = withDefaults(defineProps<Props>(), {
  cardRule: '',
  productId: -1,
  refuelingCard: () => []
})

const { proxy } = getCurrentInstance()

const rechargeDisabled = ref(false)
const showCardRule = ref(false)
const rechargeAmount = ref('')
const ruleId = ref(-1)
const period = ref('')
const productId = ref('')
const cashBackRate = ref(0)
const availableAmount = ref('0.00')
const recommendMoney = ref(Storage.Session.get(StorageTypesPay.APP_ACTIVITY_RECOMMEND_MONEY_SESSION))
const userState = ref({})

const myRefuelingCard = computed(() => {
  props.refuelingCard.forEach(_ => {
    _.discountAmount = Math.floor(+_.amount * cashBackRate.value * 10000) / 1000000
  })
  if (!rechargeAmount.value && recommendMoney.value && props.refuelingCard.length) {
    rechargeAmount.value = recommendMoney.value
    ruleId.value = props.refuelingCard[0].ruleId
    period.value = props.refuelingCard[0].period
  }
  return props.refuelingCard
})

GetMemberInfo().then(data => {
  cashBackRate.value = data.cashBackRate
  availableAmount.value = data.availableAmount
  Object.assign(userState.value, {
    availableAmount: data.availableAmount
  })
}).catch(() => {
  cashBackRate.value = 6
})

rechargeDisabled.value = true
GetNoviceState().then(data => {
  Object.assign(userState.value, data)
  rechargeDisabled.value = false
})

function handleSelectAmount (item) {
  rechargeAmount.value = item.amount
  ruleId.value = item.ruleId
  period.value = item.period
}

function handleRecharge () {
  if (!store.state.user.token) {
    return router.push('/login')
  }
  if (useUserState(userState.value, proxy)) {
    if (rechargeAmount.value) {
      rechargeDisabled.value = true
      proxy.$toast.loading({
        forbidClick: true,
        duration: 0
      })
      PlaceOrder({
        pcode: store.state.common.partnerCode,
        period: period.value,
        productId: props.productId,
        qty: 1,
        realPayAmount: rechargeAmount.value,
        ruleDetailId: ruleId.value,
        totalAmount: rechargeAmount.value
      }).then(data => {
        rechargeDisabled.value = false
        proxy.$toast.clear()
        router.push({
          path: '/rechargeCashier',
          query: {
            orderNo: data.orderNo
          }
        })
      }).catch(error => {
        rechargeDisabled.value = false
        proxy.$toast.clear()
        proxy.$notify({ type: 'danger', message: error })
      })
    } else {
      proxy.$toast('请选择充值金额')
    }
  }
}
</script>

<template>
  <div class="recharge-ad-tip" />
  <div class="refuel-recharge-wrapper">
    <div class="balance-box">
      <div class="balance-left">
        省钱卡余额：{{ availableAmount }}元
      </div>
      <div class="balance-right" @click="$router.push('/rule/card')">
        加油省钱卡规则 >
      </div>
    </div>
    <div v-if="rechargeAmount" class="recharge-box">
      <div class="recharge-money">
        <div class="recharge-amount">
          <div class="unit">
            ￥
          </div>
          <div class="amount">
            {{ rechargeAmount }}
          </div>
        </div>
        <div class="text">
          实际到账
        </div>
      </div>
    </div>
    <div class="refuel-card-box">
      <div
        v-for="item in myRefuelingCard"
        :key="item.amount"
        class="refuel-card-amount"
        :class="{ activate: rechargeAmount === item.amount }"
        @click="handleSelectAmount(item)">
        <div class="amount">
          <div class="unit">
            ￥
          </div>
          <div>
            {{ item.amount }}
          </div>
        </div>
        <div class="discount" :class="[platform.IOS() && !dev ? 'mt-024' : 'h-0']">
          加油立返{{ item.discountAmount }}元
        </div>
        <div v-if="item.amount === recommendMoney" class="recommend">
          热销
        </div>
      </div>
    </div>
    <div class="recharge-btn-box">
      <div class="recharge-btn" :class="{ 'button-disabled': rechargeDisabled }" @click="handleRecharge">
        立即充值
      </div>
    </div>
    <div class="customer-service">
      <div class="chat-icon" />
      <div class="text" @click="$router.push('/service')">
        任何疑惑，咨询客服
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="showCardRule"
    round
    closeable
    position="bottom"
    :style="{ height: '50%', display: 'flex', flexDirection: 'column' }">
    <div class="card-rule-title bottom-line">
      加油省钱卡规则
    </div>
    <div class="rule-html" v-html="cardRule" />
  </van-popup>
</template>

<style scoped lang="scss">
.refuel-recharge-wrapper {
  padding: 0 20px 20px 20px;
  background: #FFFFFF;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  .balance-box {
    height: 100px;
    display: flex;
    align-items: center;
    .balance-left {
      font-size: 28px;
      color: #292929;
      font-weight: 600;
      flex: 1;
    }
    .balance-right {
      font-size: 22px;
      color: #9B9B9B;
    }
  }
  .recharge-box {
    width: 678px;
    height: 185px;
    background-image: url("~img/recharge/recharge-bg.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 20px;
    .recharge-money {
      color: #FFFFFF;
      position: absolute;
      width: 240px;
      height: 170px;
      right: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      .recharge-amount {
        font-weight: 600;
        display: flex;
        align-items: baseline;
        .unit {
          font-size: 36px;
        }
        .amount {
          font-size: 60px;
        }
      }
      .text {
        font-size: 22px;
      }
    }
  }
  .refuel-card-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 30px;
    .refuel-card-amount {
      width: 100%;
      background: #F2F3F5;
      border: 0.5px solid #EBEDF0;
      //box-shadow: 0 1px 2px 0 rgba(49, 33, 5, 0.17);
      border-radius: 10px;
      height: 100px;
      position: relative;
      color: #ACACAC;
      box-sizing: border-box;
      .amount {
        font-size: 48px;
        font-weight: 600;
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-top: 9px;
        .unit {
          font-size: 22px;
        }
      }
      .discount {
        font-size: 36px;
        transform: scale(0.5) ;
        white-space: nowrap;
        width: 200%;
        position: absolute;
        left: -50%;
        text-align: center;
      }
      .recommend {
        color: #FFFFFF;
        font-size: 22px;
        padding: 6px 10px;
        line-height: 22px;
        background-image: url("~img/recharge/recommend.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        position: absolute;
        top: -20px;
        right: -10px;
        z-index: 1;
      }
      .mt-024 {
        margin-top: -24px;
      }
      .h-0 {
        height: 0;
      }
    }
    .activate {
      background: rgba(253, 175, 31, 0.09);
      border: 2px solid rgba(255,162,38,0.78);
      box-shadow: 2px 5px 9px 0 rgba(24, 16, 2, 0.08);
      color: #FFA226;
    }
  }
  .recharge-btn-box {
    margin: 60px 0 24px;
    .recharge-btn {
      color: #FFFFFF;
      width: 500px;
      height: 100px;
      margin: 0 auto;
      line-height: 100px;
      text-align: center;
      background: linear-gradient(138deg, #55bfd7, #148cfd 100%);
      border-radius: 50px;
      font-size: 36px;
      box-shadow: 4px 10px 12px rgba(27, 38, 51, 0.2);
    }
  }
  .customer-service {
    font-size: 24px;
    color: #4981FA;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    .chat-icon {
      width: 40px;
      height: 35px;
      background-image: url("~img/recharge/chat.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-right: 12px;
    }
    .text {
      text-decoration: underline;
    }
  }
}
.recharge-ad-tip {
  position: absolute;
  right: 20px;
  top: -46px;
  width: 324px;
  height: 85px;
  background-image: url("~img/recharge/recharge-tip.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.card-rule-title {
  height: 110px;
  line-height: 110px;
  text-align: center;
  color: #292929;
  font-weight: 600;
  font-size: 32px;
}
.rule-html {
  overflow-y: auto;
}
</style>
