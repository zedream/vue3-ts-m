<script setup lang="ts">
import { GetPayOrderDetail } from '@/api/pay'
import { useRoute } from 'vue-router'
import { platform } from '@/utils/utils'
import { store } from '@/store'
import { GetNoviceState } from '@/api/common'
import router from '@/router'

const emit = defineEmits<{(e: 'onChange', code: string): void}>()

const route = useRoute()

const checked = ref('')
const aliTip = ref('')
const wxTip = ref('')
const payWayList = ref<PayWayListData[]>([])

const availablePayWay = computed(() => {
  // ['UNIONPAY', 'WX', 'ALI']
  const result = ['UNIONPAY']
  if (platform.WeChat()) {
    result.push('WX')
  } else {
    result.push('ALI')
  }
  return result
})

watch(checked, (value) => {
  emit('onChange', value)
})

GetPayOrderDetail({
  typeBn: 'fuel',
  pcode: store.state.common.partnerCode
}, route.query.orderNo).then(data => {
  payWayList.value = data.payment.dataList
  aliTip.value = data.bindAlipayGuideCopy
  wxTip.value = data.bindWechatpayGuideCopy
  // 默认选中第一位支付方式
  for (let i = 0; i < payWayList.value.length; i++) {
    if (availablePayWay.value.includes(payWayList.value[i].code)) {
      checked.value = payWayList.value[i].code
      break
    }
  }
}).catch(error => {
  console.log(error)
})

function handleToOpenAccount () {
  GetNoviceState().then(data => {
    if (data.hasRecharge) {
      router.push('/openAccount/guide')
    } else {
      router.push('/')
    }
  })
}
</script>

<template>
  <div class="pay-way-wrapper">
    <payment-prompt>
      在本平台操作下单支付，才能享受立减等优惠哦！
    </payment-prompt>
    <div class="payment-header">
      支付方式
    </div>
    <div class="pay-way">
      <van-radio-group v-model="checked">
        <template v-for="item in payWayList" :key="item.code">
          <van-radio
            v-if="availablePayWay.includes(item.code)"
            :name="item.code"
            label-position="left"
            :class="{ 'has-pay-tip': (item.code === 'ALI' && aliTip) || (item.code === 'WX' && wxTip) }">
            <div class="payment-name">
              <div class="icon-box">
                <img class="icon" :src="item.iconUrl" :alt="item.title">
              </div>
              <div class="name">
                <div>{{ item.title }}</div>
              </div>
              <div v-if="item.code === 'UNIONPAY'" class="cloud-pay" />
              <div v-if="item.showRecommendationIcon" class="recommend" />
            </div>
            <div v-if="item.code === 'ALI'" class="pay-way-tip" @click.stop="handleToOpenAccount">
              <div class="tip">
                {{ aliTip }}
              </div>
              <div class="tip-btn">
                去充值&开卡
              </div>
            </div>
            <div v-else-if="item.code === 'WX'" class="pay-way-tip" @click.stop="handleToOpenAccount">
              <div class="tip">
                {{ wxTip }}
              </div>
              <div class="tip-btn">
                去充值&开卡
              </div>
            </div>
          </van-radio>
        </template>
      </van-radio-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-way-wrapper {
  background: #FFFFFF;
  .payment-header {
    font-size: 30px;
    color: #323233;
    font-weight: 600;
    line-height: 80px;
    padding: 0 30px;
  }
  .pay-way {
    padding: 0 30px;
    .van-radio {
      height: 110px;
      //padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.5px solid #EBEDF0;
      box-sizing: border-box;
      &:last-of-type {
        border-bottom: none;
      }
      .bind-card {
        font-size: 24px;
        color: #4A90E2;
        text-decoration: underline;
        white-space: nowrap;
      }
      .bound-card {
        font-size: 24px;
        color: #999999;
        white-space: nowrap;
      }
      .payment-name {
        display: flex;
        align-items: center;
        position: relative;
        .name {
          font-size: 28px;
          color: #292929;

        }
        .cloud-pay {
          width: 56px;
          height: 56px;
          background-image: url("~img/cloud-pay.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          margin-left: 20px;
        }
        .recommend {
          width: 30px;
          height: 33px;
          background-image: url("~img/refuel/recommend.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          position: absolute;
          right: -40px;
          top: -15px;
        }
      }
    }
    .has-pay-tip {
      height: 140px;
      padding-bottom: 60px;
      position: relative;
      z-index: 1;
    }
  }
}
.pay-way-tip {
  color: #CAA067;
  background: linear-gradient(270deg, rgba(250,236,212,.4) 0%, rgba(250,236,212,.4) 94%);
  border-radius: 12px;
  padding: 20px 40px;
  font-size: 44px;
  line-height: 48px;
  width: 200%;
  transform: translateX(calc(-25%)) scale(0.5);
  position: absolute;
  bottom: -12px;
  display: flex;
  align-items: center;
  .tip {
    flex: 1;
  }
  .tip-btn {
    background-image: linear-gradient(154deg, #EFE1CB 0%, rgba(255,255,255,0.50) 100%);
    border-radius: 40px;
    height: 64px;
    padding: 0 32px;
    font-size: 40px;
    margin-right: 32px;
    display: flex;
    align-items: center;
  }
}
.icon-box {
  margin-right: 24px;
  width: 56px;
  height: 56px;
  .icon {
    width: 100%;
    height: 100%;
  }
}
</style>
