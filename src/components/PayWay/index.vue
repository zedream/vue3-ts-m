<script setup lang="ts">
/**
 * @description 用于订单页面的支付方式
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022-3-20 下午 4:25
 */
import { GetPayWayList } from '@/api/pay'
import { useRoute } from 'vue-router'
import { platform } from '@/utils/utils'
import { store } from '@/store'

const emit = defineEmits<{(e: 'onChange', code: string): void}>()

const route = useRoute()

const hasPayIntro = ['XIB', 'BCM']
const checked = ref('')
const payWayList = ref<PayWayListData[]>([])

const availablePayWay = computed(() => {
  // ['XIB', 'BCM', 'UNIONPAY', 'WX', 'ALI']
  const result = ['XIB', 'BCM', 'UNIONPAY']
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

GetPayWayList({
  payType: 'recharge',
  pcode: store.state.common.partnerCode
}).then(dataList => {
  payWayList.value = dataList
})
</script>

<template>
  <div class="pay-way-wrapper">
    <div class="pay-way">
      <van-radio-group v-model="checked">
        <template v-for="item in payWayList" :key="item.code">
          <van-radio
            v-if="availablePayWay.includes(item.code)"
            :name="item.code"
            label-position="left"
            :class="{ 'has-pay-intro': hasPayIntro.includes(item.code) }">
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
            <div v-if="hasPayIntro.includes(item.code)" class="pay-way-tip">
              {{ item.payIntro }}
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
  .pay-way {
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
    .has-pay-intro {
      height: 130px;
    }
  }
}
.pay-way-tip {
  font-size: 24px;
  color: #d21f1c;
  //margin-bottom: 16px;
  margin-left: 80px;
  line-height: 24px;
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
