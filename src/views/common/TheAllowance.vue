<script setup lang="ts">
import { GetAllowanceList, ReceiveAllowance } from '@/api/common'
import moment from '@/utils/moment'

const { proxy } = getCurrentInstance()

const loading = ref(true)
const allowanceList = ref<AllowanceData[]>([])

getAllowanceList()

function handleReceive (redEnvelopeId) {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  ReceiveAllowance({
    redEnvelopeId
  }).then(() => {
    getAllowanceList()
    proxy.$notify({ type: 'success', message: '红包已经发送至您的加油省钱卡' })
    proxy.$toast.clear()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    proxy.$toast.clear()
  })
}

function handleToggleDesc (item) {
  item.showDesc = !item.showDesc
}

function getAllowanceList () {
  GetAllowanceList().then(data => {
    allowanceList.value = data
    loading.value = false
    allowanceList.value.forEach(_ => {
      _.showDesc = false
    })
  })
}
</script>

<template>
  <div class="tip-wrapper">
    <div class="bg-box">
      <div class="tip">
        加完油，记得回来领红包呦~
      </div>
      <div class="explain" @click="$router.push('/guide/allowance')">
        补贴说明
      </div>
    </div>
  </div>
  <div class="allowance-list">
    <div
      v-for="item in allowanceList"
      :key="item.redEnvelopeId"
      class="allowance">
      <div v-if="item.oriStatus === 2" class="de-blocking" />
      <div v-if="item.oriStatus === 4" class="received-icon" />
      <div v-if="item.oriStatus === 5" class="expired-icon" />
      <div class="allowance-info" :class="[ item.oriStatus === 5 ? 'expired' : 'available']">
        <div class="left">
          <div class="unit">
            ￥
          </div>
          <div class="amount">
            {{ item.redEnvelopeAmountStr }}
          </div>
        </div>
        <div class="mid">
          <div class="title">
            加油满{{ item.acquireConditionStr }}返
          </div>
          <div class="validity">
            有效期至{{ moment.format('Y-M-D', item.invalidTime) }}
          </div>
          <div class="desc" @click="handleToggleDesc(item)">
            详细说明
            <div class="allowance-desc-arrow" :class="{ 'allowance-desc-arrow-rotate': item.showDesc }" />
          </div>
        </div>
        <div class="right">
          <div v-if="item.oriStatus === 3" class="receive" @click="handleReceive(item.redEnvelopeId)">
            领取
          </div>
          <div v-if="item.oriStatus === 2" class="refuel" @click="$router.replace('/refuel')">
            去加油
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-show="item.showDesc" class="desc-detail">
          <div>1.限指定用户专享，1天仅能解锁1个加油补贴</div>
          <div>2.解锁条件：使用省钱加油卡，单笔加油实付满{{ item.acquireConditionStr }}元</div>
          <div>3.领取后，返现至省钱加油卡，可提现，可消费</div>
        </div>
      </transition>
    </div>
  </div>
  <van-loading v-show="loading" color="#1989fa" />
  <div v-show="!allowanceList.length && !loading" class="empty" />
</template>

<style scoped lang="scss">
.tip-wrapper {
  padding: 20px 30px 0;
  .bg-box {
    background: linear-gradient(270deg, rgba(251, 242, 226, 0.4) 0%, rgba(250, 236, 212, 0.4) 94%);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .tip {
      color: #CAA067;
      line-height: 34px;
      padding: 7px 0;
      text-align: center;
    }
    .explain {
      font-weight: 800;
      color: #D19164;
    }
  }
}
.allowance-list {
  padding: 20px 24px;
  .allowance {
    position: relative;
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
    .de-blocking {
      position: absolute;
      top: 0;
      left: 0;
      width: 101px;
      height: 90px;
      background-image: url("~img/allowance/deblocking.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .received-icon {
      position: absolute;
      z-index: 2;
      top: 20px;
      right: 24px;
      width: 90px;
      height: 89px;
      background-image: url("~img/allowance/received.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .expired-icon {
      position: absolute;
      z-index: 2;
      top: 20px;
      right: 24px;
      width: 90px;
      height: 89px;
      background-image: url("~img/allowance/expired.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .allowance-info {
      display: flex;
      align-items: center;
      width: 702px;
      height: 218px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      padding: 6px;
      box-sizing: border-box;
      z-index: 1;
      position: relative;
      .left {
        width: 200px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-shrink: 0;
        .unit {
          font-size: 30px;
          color: #5B3A2F;
          font-weight: 600;
          margin-right: 8px;
          line-height: 30px;
        }
        .amount {
          font-size: 70px;
          color: #5B3A2F;
          font-weight: 600;
          line-height: 50px;
        }
      }
      .mid {
        flex: 1;
        padding-left: 20px;
        overflow: hidden;
        .title {
          font-size: 32px;
          color: #000000;
          font-weight: 600;
          line-height: 45px;
          margin-bottom: 10px;
        }
        .validity {
          font-size: 44px;
          color: #4A4A4A;
          line-height: 30px;
          transform: translateX(-50%) scale(0.5);
          white-space: nowrap;
          width: 200%;
          position: relative;
          left: 50%;
        }
        .desc {
          font-size: 36px;
          color: #999999;
          line-height: 24px;
          transform: translateX(-50%) scale(0.5);
          white-space: nowrap;
          width: 200%;
          position: relative;
          left: 50%;
          display: flex;
          align-items: center;
          .allowance-desc-arrow {
            width: 48px;
            height: 48px;
            background-image: url("~img/allowance/desc-arrow.png");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            margin-left: 10px;
            transition: all 0.3s ease;
          }
          .allowance-desc-arrow-rotate {
            transform: rotate(180deg);
          }
        }
      }
      .right {
        flex-shrink: 0;
        padding: 0 40px 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        color: #936050;
        font-weight: 600;
        text-align: center;
        .receive {
          background-image: linear-gradient(180deg, #FFF7EE 0%, #FFDFAB 100%);
          border-radius: 26px;
          line-height: 36px;
          padding: 8px 0;
          width: 110px;
        }
        .refuel {
          border: 1px solid #f6e2c2;
          border-radius: 26px;
          line-height: 36px;
          width: 110px;
          box-sizing: border-box;
          padding: 8px 0;
        }
      }
    }
    .desc-detail {
      background: #FFFFFF;
      font-size: 20px;
      color: #999999;
      padding: 36px 45px 16px;
      line-height: 36px;
      margin-top: -26px;
      margin-left: 6px;
      width: 690px;
      box-sizing: border-box;
      box-shadow: 0 4px 10px 0 rgba(0,0,0,0.05);
      border-radius: 0 0 10px 10px;
    }
  }
  .expired {
    background-image: url("~img/allowance/expired-bg.png");
  }
  .available {
    background-image: url("~img/allowance/bg.png");

  }
}
.empty {
  width: 750px;
  height: 452px;
  background-image: url("~img/mine/order-empty.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.van-loading {
  text-align: center;
  line-height: 120px;
}
.slide-enter-active {
  transition: all 0.25s ease-out;
}

.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  margin-top: -160px!important;
}
</style>
