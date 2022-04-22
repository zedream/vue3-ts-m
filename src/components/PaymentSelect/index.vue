<script setup lang="ts">
import { GetPaymentList } from '@/api/common'
import router from '@/router'
import { platform } from '@/utils/utils'
import { useMemberInfo } from '@/hooks'

interface Props {
  type?: number
  hzType?: string | undefined
}
const props = withDefaults(defineProps<Props>(), {
  type: 0,
  hzType: undefined
})

const emit = defineEmits<{(e: 'onChange', code: string): void}>()

const { proxy } = getCurrentInstance()

const enum Type {
  RefuelPay,
  Bind
}

const checked = ref('')
const payments = ref<PaymentData[]>([])

watch(checked, (value) => {
  emit('onChange', value)
})

GetPaymentList().then(data => {
  if (platform.WeChat()) {
    payments.value = data.dataList.filter(_ => _.code !== 'ali')
  } else {
    payments.value = data.dataList
  }
})

function handleToBindCard (code) {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  useMemberInfo().then(result => {
    const { certified, activateFlag, availableAmount } = result
    switch (code) {
      case 'yeepay':
        if (!certified && !parseFloat(availableAmount)) {
          proxy.$dialog.confirm({
            title: '您的可用金额不足',
            message: '尊敬的用户，您的可用金额不足，无法完成本次加油，请您充值后继续',
            confirmButtonText: '前往充值',
            cancelButtonText: '我知道了',
            confirmButtonColor: '#389BFF'
          }).then(() => {
            router.push('/recharge')
          })
        } else if (!activateFlag) {
          proxy.$dialog.confirm({
            title: '未开通加油省钱卡',
            message: '未开通加油省钱卡，无法完成本次加油优惠',
            confirmButtonText: '去开通',
            cancelButtonText: '放弃',
            confirmButtonColor: '#389BFF'
          }).then(() => {
            router.push('/openAccount/guide')
          })
        } else {
          router.push('/unionPay/bindPwd')
        }
        break
      case 'ali':
        proxy.$toast('努力开发中...')
        break
      case 'wechat':
        proxy.$toast('努力开发中...')
        break
      default:
        break
    }
  })
}
</script>

<template>
  <div class="payment-wrapper">
    <payment-prompt v-if="type === Type.RefuelPay">
      <template v-if="hzType === undefined">
        在本平台调出支付，才能享受立返等优惠哦！
      </template>
      <template v-if="hzType === 'yhj_jy'">
        在本平台操作下单支付，才能享受立减、立返等优惠哦！
      </template>
      <template v-if="hzType === 'yhj'">
        在本平台操作下单支付，才能享受立减等优惠哦！
      </template>
    </payment-prompt>
    <div class="payment">
      <van-radio-group v-model="checked">
        <van-radio
          v-for="item in payments"
          :key="item.code"
          :name="item.code"
          label-position="left"
          :disabled="!item.hasBind">
          <template v-if="!item.hasBind || item.hasBind && type === Type.Bind" #icon>
            <div v-if="!item.hasBind" class="bind-card" @click="handleToBindCard(item.code)">
              去绑卡
            </div>
            <div v-if="item.hasBind && type === Type.Bind" class="bound-card">
              已绑卡
            </div>
          </template>
          <div class="payment-name">
            <div class="icon-box">
              <img class="icon" :src="item.iconUrl" :alt="item.title">
            </div>
            <div class="name">
              {{ item.title }}
            </div>
            <div v-if="item.code === 'yeepay'" class="cloud-pay" />
            <div v-if="item.showRecommendationIcon" class="recommend" />
          </div>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-wrapper {
  background: #FFFFFF;
  .payment {
    padding: 0 30px;
    .van-radio {
      height: 110px;
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
  }
}
.icon-box {
  width: 56px;
  height: 56px;
  margin-right: 24px;
  .icon {
    width: 100%;
    height: 100%;
  }
}
</style>
