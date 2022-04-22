<script setup lang="ts">
import { GetMemberInfo } from '@/api/user'
import { desensitized } from '@/utils/utils'
import { store } from '@/store'
import { CommonType } from '@/store/mutation.types'
import { GetNoviceState } from '@/api/common'

const router = useRouter()

const showTestInfo = process.env.APP_NODE_ENV !== 'prod'
const showNoviceTip = ref(false)
const state = reactive<MemberInfoData>({} as MemberInfoData)

const mobile = computed(() => desensitized(store.state.user.mobile, 3, 6))
const showMoney = computed(() => store.state.common.showMoney)

GetMemberInfo().then(data => {
  Object.assign(state, data)
})
GetNoviceState().then(data => {
  if (!data.finished) {
    showNoviceTip.value = true
  }
})

function handleRecharge () {
  router.replace('/')
}

function handleToggleMoney () {
  store.commit(`common/${CommonType.SET_SHOW_MONEY}`, !store.state.common.showMoney)
}
</script>

<template>
  <div class="mine-page-container">
    <div class="user-info-wrapper">
      <div class="info-row between">
        <div class="account">
          {{ mobile }}
        </div>
        <div class="info-row-right">
          <div class="iconfont icon-setting" @click="router.push('/settings')" />
        </div>
      </div>
      <div class="info-row price-label">
        <div class="flex-1 eyes-box">
          <div class="my-card" @click="$router.push('/guide/card')">
            加油省钱卡(元)
            <i class="iconfont icon-what-card" />
          </div>
          <div class="eyes open" :class="[showMoney ? 'open' : 'close']" @click="handleToggleMoney" />
        </div>
        <div class="flex-06">
          立返加油金(元)
        </div>
      </div>
      <div class="info-row baseline">
        <div class="flex-1 balance">
          <div v-if="showMoney">
            {{ state.availableAmount || '0.00' }}
          </div>
          <div v-else>
            ****
          </div>
        </div>
        <div class="flex-06 rebate">
          <div v-if="showMoney">
            {{ state.unReceiveCashAmount || '0.00' }}
          </div>
          <div v-else>
            ****
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="flex-1">
          <div class="recharge" @click="handleRecharge">
            充值
          </div>
        </div>
        <div class="flex-06" />
      </div>
    </div>
    <div class="padding-box">
      <ConsumptionStatistics
        :member-level="state.grade"
        :total-amount="state.totalConsumedAmount"
        :member-amount="state.vipConsumedAmount"
        :save-amount="state.totalCashBackAmount" />
      <div v-if="showNoviceTip" class="novice-task-tip" @click="$router.push('/guidance')" />
      <div class="mt-20">
        <MineSection />
      </div>
      <div class="mt-20">
        <HelpSection />
      </div>
      <TestSection v-if="showTestInfo" class="mt-20" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mine-page-container {
  .user-info-wrapper {
    position: relative;
    width: 100%;
    height: 560px;
    text-align: center;
    line-height: 50px;
    padding: 40px 40px 0;
    box-sizing: border-box;
    color: #FFFFFF;
    &:after {
      width: 160%;
      height: 100%;
      position: absolute;
      left: -30%;
      top: 0;
      content: "";
      border-radius: 0 0 50% 50%;
      background: linear-gradient(138deg, #0077E8 51%, #39D5FF 100%);
    }
    .info-row {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      text-align: left;
      .account {
        font-size: 36px;
        letter-spacing: 2px;
        font-weight: 600;
      }
      .info-row-right {
        display: flex;
        align-items: center;
      }
      .icon-setting {
        font-size: 40px;
        line-height: 36px;
        padding: 10px 16px;
        margin-right: -16px;
      }
      .logout {
        font-size: 26px;
      }
      .balance {
        font-size: 66px;
        line-height: 100px;
        height: 100px;
      }
      .rebate {
        font-size: 48px;
        line-height: 60px;
      }
      .recharge {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.60);
        border-radius: 24px;
        font-size: 28px;
        line-height: 28px;
        padding: 11px 0;
        text-align: center;
        width: 150px;
        margin-top: 20px;
        box-sizing: border-box;
      }
      .flex-06 {
        flex: 0.6;
      }
    }
    .price-label {
      font-size: 22px;
      line-height: 26px;
      margin-top: 56px;
      .eyes-box {
        display: flex;
        align-items: center;
        .my-card {
          display: flex;
          align-items: center;
          .icon-what-card {
            margin: 0 24px 0 10px;
            font-size: 30px;
          }
        }
        .eyes {
          width: 35px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 32px 100%;
          padding: 0 16px;
        }
        .open {
          height: 22px;
          background-image: url("~img/mine/open-eyes.png");
        }
        .close {
          height: 18px;
          background-image: url("~img/mine/close-eyes.png");
        }
      }
    }
    .between {
      justify-content: space-between;
    }
    .baseline {
      align-items: baseline;
    }
  }
  .padding-box {
    padding: 0 20px 20px;
    .mt-20 {
      margin-top: 20px;
    }
  }
  .novice-task-tip {
    margin: 20px auto 0;
    width: 710px;
    height: 140px;
    background-image: url("~img/mine/novice-task-tip.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
}

</style>
