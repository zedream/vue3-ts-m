<script setup lang="ts">
import { GetNoviceState } from '@/api/common'
import router from '@/router'
import { store } from '@/store'

const { proxy } = getCurrentInstance()

const noviceState = reactive<NoviceStateData>({
  activateFlag: false,
  bindInPayway: false,
  certified: false,
  finished: false,
  hasBuyOil: false,
  hasCashBack: false,
  hasRecharge: false,
  hasRedEnvelope: false
})

onBeforeUnmount(() => {
  proxy.$toast.clear()
})

proxy.$toast.loading({
  forbidClick: true,
  loadingType: 'spinner',
  duration: 0
})
GetNoviceState().then(data => {
  Object.assign(noviceState, data)
  proxy.$toast.clear()
  if (data.finished) {
    proxy.$dialog.confirm({
      title: '温馨提示',
      message: '您已经完成了所有任务啦~，快去加油吧',
      confirmButtonText: '去加油',
      cancelButtonText: '我知道了',
      confirmButtonColor: '#389BFF'
    }).then(() => {
      router.replace('/refuel')
    })
  }
})

function handleToDo (task) {
  switch (task) {
    case 0:
      router.replace('/recharge')
      break
    case 1:
      router.replace('/openAccount')
      break
    case 2:
      router.replace('/bind')
      break
    case 3:
      router.replace('/refuel')
      break
    default:
      break
  }
}
</script>

<template>
  <div class="novice-container">
    <div class="back" @click="$router.back()">
      <i class="iconfont icon-back" />
    </div>
    <div class="novice-top" />
    <div class="novice-btm">
      <img class="novice-btm-bg" src="~img/activity/novice-guidance/novice-btm.png" alt="云油加油">
      <div class="task">
        <div class="icon step-1" />
        <div class="task-info">
          <div class="title">
            加油省钱卡充值
          </div>
          <div class="content">
            完成省钱加油钱包首次充值
          </div>
        </div>
        <div class="task-btn" :class="[noviceState.hasRecharge ? 'done' : 'undone']" @click="handleToDo(0)">
          {{ noviceState.hasRecharge ? '已完成' : '去充值' }}
        </div>
      </div>
      <div class="task">
        <div class="icon step-2" />
        <div class="task-info">
          <div class="title">
            省钱卡开通
          </div>
          <div class="content">
            既是省钱卡，也是银行卡，开通即可每次加油领取立返金
          </div>
        </div>
        <div class="task-btn" :class="[noviceState.activateFlag ? 'done' : 'undone']" @click="handleToDo(1)">
          {{ noviceState.activateFlag ? '已完成' : '去开通' }}
        </div>
      </div>
      <div class="task">
        <div class="icon step-3" />
        <div class="task-info">
          <div class="title">
            省钱卡绑卡
          </div>
          <div class="content">
            将开通的省钱卡(银行卡)，绑定在银联云闪付，支付宝或者微信上
          </div>
        </div>
        <div class="task-btn" :class="[noviceState.bindInPayway ? 'done' : 'undone']" @click="handleToDo(2)">
          {{ noviceState.bindInPayway ? '已完成' : '去绑卡' }}
        </div>
      </div>
      <div class="task">
        <div class="icon step-4" />
        <div class="task-info">
          <div class="title">
            首次加油
          </div>
          <div class="content">
            使用云油加油APP/小程序/H5进行加油，用加油省钱卡付款可立返6%
          </div>
        </div>
        <div class="task-btn" :class="[noviceState.finished ? 'done' : 'undone']" @click="handleToDo(3)">
          {{ noviceState.finished ? '已完成' : '去加油' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.novice-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.novice-top {
  width: 750px;
  height: 850px;
  background-image: url("~img/activity/novice-guidance/novice-top.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.novice-btm {
  padding: 0 30px 100px;
  position: relative;
  flex: 1;
  .novice-btm-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .task {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0 8px 12px 0 rgba(10, 14, 21, 0.07);
    border-radius: 24px;
    margin-bottom: 20px;
    .icon {
      width: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      flex-shrink: 0;
    }
    .step-1 {
      background-image: url("~img/activity/novice-guidance/step-1.png");
    }
    .step-2 {
      background-image: url("~img/activity/novice-guidance/step-2.png");
    }
    .step-3 {
      background-image: url("~img/activity/novice-guidance/step-3.png");
    }
    .step-4 {
      background-image: url("~img/activity/novice-guidance/step-4.png");
    }
    .task-info {
      margin: 0 30px 0 16px;
      flex: 1;
      .title {
        font-size: 32px;
        color: #292929;
        line-height: 45px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .content {
        font-size: 22px;
        color: #B0B0B0;
        line-height: 30px;
      }
    }
    .task-btn {
      flex-shrink: 0;
      width: 120px;
      height: 60px;
      border-radius: 30px;
      font-size: 24px;
      line-height: 60px;
      text-align: center;
      font-weight: 600;
    }
    .undone {
      color: #FFFFFF;
      background: linear-gradient(154deg, #82b0fc 0%, #2A86FF 100%);
      box-shadow: 0 6px 7px 0 rgba(25, 52, 112, 0.17), inset 0 2px 4px 0 rgba(255, 255, 255, 0.35);

    }
    .done {
      box-sizing: border-box;
      color: #427CFF;
      border: 1px solid rgba(66, 124, 255, 0.3);
      pointer-events: none;
    }
  }
}
</style>
