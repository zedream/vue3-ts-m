<script setup lang="ts">
import router from '@/router'
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { formatBankCard } from '@/utils/utils'

interface Props {
  bankName: string
}
const props = withDefaults(defineProps<Props>(), {
  bankName: ''
})

const route = useRoute()

const { proxy } = getCurrentInstance()

const cardNumberRef = ref<HTMLElement>()
const myCard = ref(Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_BANK_CARD_SESSION))
const thirdCard = ref(Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_THIRD_CARD_SESSION))

function handleCopyCard () {
  navigator.clipboard.writeText(thirdCard.value).then(function () {
    proxy.$notify({ type: 'success', message: '复制成功' })
  }, function (clipboardErr) {
    console.log('复制失败, clipboardErr: ', clipboardErr)
    const target = cardNumberRef.value
    try {
      const range = document.createRange()
      range.selectNodeContents(target)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
      proxy.$notify({ type: 'success', message: '复制成功' })
    } catch (e) {
      window.getSelection().removeAllRanges()
      console.log('复制失败：', e)
      proxy.$notify({ type: 'danger', message: '复制失败' })
    }
  })
}

function handleToActivate () {
  console.log(route.params)
}

function handleToExchange () {
  console.log(111)
}
</script>

<template>
  <div class="open-guide-container">
    <p ref="cardNumberRef" class="card-number-copy">
      {{ thirdCard }}
    </p>
    <div class="main-title">
      <i class="iconfont icon-light-bulb" />
      <span>如何继续开通加油省钱卡</span>
    </div>
    <div class="scheme">
      <div class="title">
        方案一：手动转账开通
      </div>
      <div class="sub-title">
        ① 手动转账，去开通
      </div>
      <div class="scheme-desc">
        {{ `用绑定储蓄卡: ${ formatBankCard.hide(myCard) }转款0.01元到${ bankName }加油省钱卡: ${ formatBankCard.hide(thirdCard) }` }}
        <span class="copy-btn" @click="handleCopyCard">
          复制卡号
        </span>
      </div>
      <div class="sub-title">
        ② 确保绑卡有余额，去开通
      </div>
      <div class="scheme-desc">
        {{ `绑定储蓄卡：(${ formatBankCard.hide(myCard) }）余额>0元` }}
      </div>
      <div class="button" @click="handleToActivate">
        继续开通加油省钱卡
      </div>
    </div>
    <div class="scheme">
      <div class="title">
        方案二：更换储蓄卡开通
      </div>
      <div class="sub-title">
        ① 更换另一张有余额的储蓄卡，重新开通省钱卡
      </div>
      <div class="button" @click="handleToExchange">
        更换储蓄卡
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-guide-container {
  background: #F3F3F3;
  border-radius: 8px;
  padding: 40px 20px;
  margin-top: 80px;
  .card-number-copy {
    position: absolute;
    top: -520px;
    opacity: 0;
    user-select: auto;
  }
  .main-title {
    font-size: 26px;
    color: #666666;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon-light-bulb {
      font-weight: 400;
      font-size: 26px;
      color: #B0B0B0;
      margin-right: 16px;
    }
  }
  .scheme {
    &:last-child {
      border-top: 1px dotted #DCDEE0;
      padding-top: 40px;
      margin-top: 30px;
    }
    .title {
      font-size: 26px;
      color: #999999;
      font-weight: 600;
    }
    .sub-title {
      font-size: 24px;
      color: #999999;
      margin: 10px 6px;
      font-weight: 600;
    }
    .scheme-desc {
      font-size: 22px;
      color: #999999;
      line-height: 32px;
      padding-left: 30px;
      .copy-btn {
        text-decoration: underline;
        color: #4A90E2;
        margin-left: 5px;
      }
    }
    .button {
      border: 1px solid #4A90E2;
      border-radius: 8px;
      color: #4A90E2;
      font-size: 30px;
      line-height: 30px;
      padding: 15px 0;
      width: 360px;
      text-align: center;
      margin: 30px auto 0;
    }
  }
}
</style>
