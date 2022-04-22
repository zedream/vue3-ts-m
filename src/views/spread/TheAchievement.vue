<script setup lang="ts">
import { GetAgentInfo, GetAgentSpreadInfo } from '@/api/spread'
import { sections } from './constant'
import router from '@/router'

const { proxy } = getCurrentInstance()

const showCopySuccess = ref(false)
const copyTextRef = ref()
const agentState = reactive<AgentInfoData>({
  forWithdrawalAmount: '0.00',
  phone: '',
  totalRewardAmount: '0.00',
  withdrawnAmount: '0.00'
})
const spreadState = reactive<AgentSpreadInfoData>({
  copyWriting: '',
  domainUrl: '',
  inviteCode: '',
  pcode: ''
})

const copyText = computed(() => {
  return `${spreadState.copyWriting} 注册链接：${spreadState.domainUrl}/bdh5std/oilcard.html#/home?inviteCode=${spreadState.inviteCode}&activityCode=${spreadState.pcode}`
})

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetAgentInfo().then(data => {
  Object.assign(agentState, data)
  proxy.$toast.clear()
}).catch(error => {
  proxy.$notify({ type: 'danger', message: error })
  proxy.$toast.clear()
})

function handleCopyMyLink () {
  getAgentSpreadInfo().then(() => {
    navigator.clipboard.writeText(copyText.value).then(function () {
      showCopySuccess.value = true
    }, function (clipboardErr) {
      console.log('复制失败, clipboardErr: ', clipboardErr)
      const target = copyTextRef.value
      try {
        const range = document.createRange()
        range.selectNodeContents(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        showCopySuccess.value = true
      } catch (e) {
        window.getSelection().removeAllRanges()
        console.log('复制失败：', e)
        proxy.$notify({ type: 'danger', message: '复制失败' })
      }
    })
  })
}

function getAgentSpreadInfo () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  return new Promise<void>(resolve => {
    GetAgentSpreadInfo().then(data => {
      Object.assign(spreadState, data)
      proxy.$toast.clear()
      resolve()
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
      proxy.$toast.clear()
    })
  })
}
</script>

<template>
  <p ref="copyTextRef" class="copy-text">
    {{ copyText }}
  </p>
  <div class="spread-achievement-container">
    <div class="info-wrapper">
      <div class="left">
        <div class="avatar" />
        <div class="account">
          {{ agentState.phone }}
        </div>
      </div>
      <div class="right">
        <div class="copy-btn" @click="handleCopyMyLink" />
      </div>
    </div>
    <div class="amount-wrapper">
      <div class="amount-item">
        <div class="value">
          {{ agentState.totalRewardAmount }}
        </div>
        <div class="label">
          累计有效业绩(元)
        </div>
      </div>
      <div class="amount-item">
        <div class="value">
          {{ agentState.withdrawnAmount }}
        </div>
        <div class="label">
          已提现金额(元)
        </div>
      </div>
    </div>
    <div class="withdrawal-wrapper">
      <div class="withdrawal-btn" @click="$router.push('withdrawal')">
        提现
      </div>
      <div class="withdrawal-amount">
        <span class="amount">
          {{ agentState.forWithdrawalAmount }}
        </span>
        <span class="unit">
          元
        </span>
      </div>
    </div>
    <div v-for="section in sections" :key="section.section" class="section-wrapper">
      <div class="title">
        {{ section.section }}
      </div>
      <div class="section-box">
        <div
          v-for="item in section.items"
          :key="item.name"
          class="item"
          @click="$router.push(item.path)">
          <img class="icon" :src="item.icon">
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-overlay
    class-name="my-overlay"
    :show="showCopySuccess"
    @click="showCopySuccess = false">
    <div class="copy-success-box">
      <div class="copy-success-title">
        复制成功！
      </div>
      <div class="copy-success-content">
        立即告知亲朋好友点击链接进行注册
      </div>
    </div>
    <div class="close" />
  </van-overlay>
</template>

<style scoped lang="scss">
.copy-text {
  position: absolute;
  top: -520px;
  opacity: 0;
  user-select: auto;
}
.spread-achievement-container {
  height: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  padding: calc($navBarHeight + 20px) 30px 20px;
  overflow-y: auto;
  .info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 100px;
        height: 100px;
        background-image: url("~img/spread/avatar.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        margin-right: 10px;
      }
      .account {
        font-size: 30px;
        color: #222A37;
        font-weight: 600;
      }
    }
    .right {
      margin-right: -30px;
      .copy-btn {
        width: 276px;
        height: 80px;
        background-image: url("~img/spread/copy-exclusive.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
    }
  }
  .amount-wrapper {
    display: flex;
    align-items: center;
    margin-top: 50px;
    .amount-item {
      flex: 1;
      text-align: center;
      .value {
        font-size: 40px;
        color: #1E1E1E;
        font-weight: 600;
        line-height: 60px;
      }
      .label {
        font-size: 24px;
        color: #787878;
      }
    }
  }
  .withdrawal-wrapper {
    margin-top: 50px;
    width: 690px;
    height: 140px;
    background-image: url("~img/spread/withdrawal-box.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    .withdrawal-btn {
      position: absolute;
      font-size: 30px;
      color: #A35E1D;
      font-weight: 600;
      line-height: 42px;
      padding: 7px 40px;
      border-radius: 28px;
      background: linear-gradient(144deg, #FEF2DD 7%, #FFD7A8 97%);
      right: 50px;
      top: 42px;
    }
    .withdrawal-amount {
      position: absolute;
      color: #FFFFFF;
      line-height: 50px;
      left: 100px;
      bottom: 8px;
      .amount {
        font-size: 36px;
        font-weight: 600;
      }
      .unit {
        font-size: 24px;
      }
    }
  }
  .section-wrapper {
    background: linear-gradient(179deg, #F3F7FF 0%, #FFFFFF 75%);
    box-shadow: 0 5px 12px 0 rgba(3, 32, 64, 0.05);
    border-radius: 12px;
    padding: 0 30px;
    overflow: hidden;
    margin-top: 30px;
    .title {
      font-size: 32px;
      color: #222A37;
      font-weight: 600;
      margin-top: 36px;
    }
    .section-box {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 140px);
      justify-content: space-between;
      .item {
        height: 180px;
        width: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon {
          width: 60px;
          height: 60px;
        }
        .name {
          font-size: 26px;
          color: #434343;
          font-weight: 600;
          margin-top: 16px;
        }
      }
    }
  }
}
.my-overlay {
  z-index: 2022;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .copy-success-box {
    width: 578px;
    height: 423px;
    background-image: url("~img/spread/copy-success.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    text-align: center;
    .copy-success-title {
      font-size: 34px;
      color: #FF9111;
      font-weight: 600;
      line-height: 48px;
      margin-top: 200px;
    }
    .copy-success-content {
      font-size: 28px;
      color: #434343;
      line-height: 40px;
      margin-top: 20px;
    }
  }
  .close {
    margin-top: 60px;
    width: 44px;
    height: 44px;
    background-image: url("~img/spread/close.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 44px 44px;
    padding: 20px;
  }
}
</style>
