<script setup lang="ts">
import { GetAgentSpreadInfo } from '@/api/spread'

const showCopySuccess = ref(false)
const spreadState = reactive<AgentSpreadInfoData>({
  copyWriting: '',
  domainUrl: '',
  inviteCode: '',
  pcode: ''
})

const copyText = computed(() => {
  return `${spreadState.copyWriting} 注册链接：${spreadState.domainUrl}/bdh5std/oilcard.html#/home?inviteCode=${spreadState.inviteCode}&activityCode=${spreadState.pcode}`
})

GetAgentSpreadInfo().then(data => {
  Object.assign(spreadState, data)
}).catch(error => {
  proxy.$notify({ type: 'danger', message: error })
})

function handleCopyMyLink () {
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
}
</script>

<template>
  <div class="detached-container">
    <div class="expand-team-box">
      <div class="gold-coins" />
      <div class="code">
        c2bde5jcltdmmj7o5155
      </div>
      <div class="copy-btn" @click="handleCopyMyLink">
        一键复制并转达
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
  </div>
</template>

<style scoped lang="scss">
.detached-container {
  width: 750px;
  background-image: url("~img/spread/expand-team-backdrop.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  .expand-team-box {
    width: 690px;
    height: 922px;
    background-image: url("~img/spread/expand-team-box.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    .gold-coins {
      width: 91px;
      height: 91px;
      background-image: url("~img/spread/gold-coins.gif");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      position: absolute;
      top: 40px;
      right: 50px;
    }
    .code {
      position: absolute;
      top: 500px;
      width: 100%;
      font-size: 44px;
      line-height: 120px;
      color: #434343;
      font-weight: 600;
      text-align: center;
    }
    .copy-btn {
      width: 550px;
      padding: 20px 0;
      background: linear-gradient(116deg, #FEF2DD 2%, #FFD7A8 97%);
      border-radius: 48px;
      font-size: 40px;
      color: #A35E1D;
      text-align: center;
      line-height: 56px;
      font-weight: 600;
      position: absolute;
      top: 720px;
      left: 70px;
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
}
</style>
