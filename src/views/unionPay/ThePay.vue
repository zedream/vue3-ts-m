<script setup lang="ts">
import InstructionDialog from './components/InstructionDialog'
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import md5 from 'js-md5'
import { GetUnionPayCodeNumber, GetUnionPayResult, ValidatePayPassword } from '@/api/pay'
import { useMemberInfo, usePolling } from '@/hooks'
import { zeroFill } from '@/utils/utils'
import cloudPayIcon from 'img/cloud-pay-code.png'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const actions = [
  {
    name: '交通银行(6666)',
    bankAmount: '99.99'
  },
  {
    name: '建设银行(7777)',
    bankAmount: '99.99'
  },
  {
    name: '中国银行(8888)',
    bankAmount: '99.99'
  }
]
const isPaying = ref(false)
const showKeyboard = ref(false)
const showBankCards = ref(false)
const showBarcode = ref(false)
const showQRCode = ref(false)
const showBarcodeBefore = ref(false)
const showBarcodeAfter = ref(false)
const barcodeSrc = ref('')
const qrcodeSrc = ref('')
const orderNumber = ref('')
const codeNumber = ref('')
const payOrderNumber = ref('')
const bankAmount = ref('0.00')
const payeeMerchantName = ref('')
const realTradeAmount = ref('0.00')
const payPassword = ref('')
const bankInfo = ref<BankInfoData>({})
const dialogRef = ref()

useMemberInfo().then(result => {
  bankAmount.value = result?.bankAmount
  bankInfo.value = result?.bankInfo || {}
})

orderNumber.value = route.query?.orderNo
if (!orderNumber.value) {
  router.back()
}
/**
 * 每秒轮询一次支付结果
 */
usePolling(getUnionPayResult, 1000)
/**
 * 每分钟更新一次二位（一维）码
 */
usePolling(() => {
  return new Promise((resolve, reject) => {
    getUnionPayCodeNumber().then(() => {
      GenerateBarcode()
      GenerateQRCode()
    }).catch(error => {
      reject(error)
    })
  })
}, 60000)

onMounted(() => {
  getUnionPayCodeNumber().then(() => {
    GenerateBarcode()
    GenerateQRCode()
  })
})

function handleShowBarcode () {
  showBarcode.value = true
  showBarcodeBefore.value = true
}
function handleIKnow () {
  showBarcodeBefore.value = false
  showBarcodeAfter.value = true
}

function GenerateBarcode () {
  const canvas = document.getElementById('barcode') as HTMLCanvasElement
  JsBarcode('#barcode', codeNumber.value, {
    displayValue: false
  })
  barcodeSrc.value = canvas.toDataURL('image/png')
}

function GenerateQRCode () {
  const canvas = document.getElementById('qr-code') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  const icon = new Image()
  icon.src = cloudPayIcon
  QRCode.toCanvas(canvas, codeNumber.value, {
    version: 3,
    width: convertPx(600),
    height: convertPx(600)
  }, (error) => {
    if (error) {
      console.error(error)
    } else {
      icon.onload = function () {
        ctx?.drawImage(icon, 0, 0, 60, 60, (convertPx(600) - convertPx(90)) / 2, (convertPx(600) - convertPx(90)) / 2, convertPx(90), convertPx(90))
        qrcodeSrc.value = canvas.toDataURL('image/png')
      }
    }
  })
}

function getUnionPayCodeNumber () {
  return new Promise<void>((resolve, reject) => {
    GetUnionPayCodeNumber({
      deviceId: 'th20220307',
      orderNo: orderNumber.value
    }).then(data => {
      codeNumber.value = data.qrCode
      payOrderNumber.value = data.payOrderNo
      resolve()
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error.message || error })
      reject(error)
    })
  })
}

function getUnionPayResult (noKeyboard?: boolean) {
  if (payOrderNumber.value) {
    return new Promise<void>((resolve, reject) => {
      GetUnionPayResult({
        payOrderNo: payOrderNumber.value
      }).then(res => {
        if (res.data) {
          realTradeAmount.value = res.data.realTradeAmount
          payeeMerchantName.value = res.data.payeeMerchantName
          if (res.data.result) {
            resolve()
            router.replace({
              path: 'result',
              query: {
                ...route.query,
                amount: realTradeAmount.value
              }
            })
            // 支付成功 终止轮训
          } else if (res.data.validateFlag && !noKeyboard) {
            showKeyboard.value = true
            resolve()
            // 扫码成功 输入支付密码 终止轮训
          }
          // 未支付 继续轮训...
        } else {
          proxy.$notify({ type: 'danger', message: `支付失败：${res.info}` })
          reject(res.info)
          // 支付失败 终止轮训
        }
      }).catch(error => {
        proxy.$notify({ type: 'danger', message: error.message || error })
        reject(error)
        // 其他异常 终止轮训
      })
    })
  } else {
    const error = new Error('无支付码')
    return Promise.reject(error)
  }
}

function validatePayPassword () {
  isPaying.value = true
  return new Promise<void>((resolve, reject) => {
    ValidatePayPassword({
      payOrderNo: payOrderNumber.value,
      payPassword: md5(payPassword.value)
    }).then(data => {
      if (data.result) {
        isPaying.value = false
        resolve()
      }
    }).catch(error => {
      if (error === '密码错误') {
        isPaying.value = false
        payPassword.value = ''
        proxy.$notify({ type: 'danger', message: error })
        reject(error)
      } else {
        isPaying.value = false
        payPassword.value = ''
        proxy.$notify({ type: 'danger', message: error })
        reject(error)
      }
    })
  })
}

function onClose () {
  if (payPassword.value.length === 6) {
    validatePayPassword().then(() => {
      showKeyboard.value = false
      usePolling(getUnionPayResult, 1000, true)
    }).catch(error => {
      if (error !== '密码错误') {
        showKeyboard.value = false
        usePolling(getUnionPayResult, 1000)
      }
    })
  } else {
    proxy.$toast('请输入6位支付密码')
  }
}

function convertPx (px: number): number {
  const client = document.documentElement || document.body
  return +(client.clientWidth * (px / 750)).toFixed(6)
}
</script>

<template>
  <div class="payment-code-container">
    <div class="payment-code-wrapper">
      <div class="payment-code-header">
        <div class="left">
          <span class="span">
            向标记有
          </span>
          <span class="union-icon span" />
          <span class="span">
            的商家付款
          </span>
        </div>
        <div class="right" @click="$refs.dialogRef.open()">
          使用说明
        </div>
      </div>
      <div class="payment-code-body">
        <div class="tip">
          点击可查看付款码数字
        </div>
        <div class="bar-code" @click="handleShowBarcode">
          <canvas id="barcode" />
        </div>
        <div class="qr-code" @click="showQRCode = true">
          <canvas id="qr-code" />
        </div>
      </div>
      <div class="payment-code-footer" @click="showBankCards = true">
        <div class="bank-name-box">
          <template v-if="bankInfo.bankName">
            <div class="icon" :style="{ backgroundImage: `url('${bankInfo.bankIcon}')` }" />
            <div>{{ bankInfo?.bankName }}(尾号{{ bankInfo?.thirdCardNo?.slice(bankInfo.thirdCardNo.length - 4) }})</div>
          </template>
        </div>
        <div class="balance">
          余额：￥{{ zeroFill(bankAmount) }}
        </div>
      </div>
    </div>
    <div class="more-payment" @click="$toast('努力开发中...')">
      如果商家不支持银联云闪付，可选其他支付方式
      <i class="iconfont icon-right" />
    </div>
  </div>
  <InstructionDialog ref="dialogRef" />
  <van-action-sheet
    v-model:show="showBankCards"
    :actions="actions"
    cancel-text="取消"
    title="选择支付银行卡"
    close-on-click-action />
  <van-overlay
    class-name="my-overlay"
    :show="showBarcode"
    z-index="2022"
    @click="showBarcode = false">
    <div class="barcode-preview">
      <div v-if="showBarcodeBefore" class="before-barcode">
        <i class="iconfont icon-security" />
        <div class="before-barcode-tip">
          付款码数字仅用于支付时向收银员展示，请勿发送给他人，
        </div>
        <div class="before-barcode-tip">
          以防诈骗。
        </div>
        <van-button
          class="i-know"
          round
          type="primary"
          size="small"
          @click.stop="handleIKnow">
          知道了
        </van-button>
      </div>
      <div v-if="showBarcodeAfter" class="barcode">
        <div class="barcode-tip">
          付款码数字仅用于支付时向收银员展示，请勿泄露以防诈骗。
        </div>
        <img class="img" :src="barcodeSrc">
        <div class="barcode-number">
          {{ codeNumber }}
        </div>
      </div>
    </div>
  </van-overlay>
  <van-overlay
    class-name="my-overlay"
    :show="showQRCode"
    z-index="2022"
    :lazy-render="false"
    @click="showQRCode = false">
    <div class="qr-code-preview">
      <img :src="qrcodeSrc">
    </div>
  </van-overlay>
  <van-overlay
    :show="showKeyboard"
    z-index="1221"
    :lazy-render="false">
    <van-number-keyboard
      v-model="payPassword"
      :show="showKeyboard"
      :maxlength="6"
      :hide-on-click-outside="false"
      :close-button-loading="isPaying"
      :extra-key="['00']"
      random-key-order
      theme="custom"
      close-button-text="完成"
      @close="onClose">
      <template #title-left>
        <div class="keyboard-custom-title-wrapper">
          <div class="password-title bottom-line">
            请输入支付密码
          </div>
          <div v-if="realTradeAmount || payeeMerchantName" class="pay-info bottom-line">
            <div v-if="realTradeAmount" class="price-box">
              <span class="pay-unit">
                ￥
              </span>
              <span class="pay-amount">
                {{ realTradeAmount }}
              </span>
            </div>
            <div v-if="payeeMerchantName" class="station-name">
              {{ payeeMerchantName }}
            </div>
          </div>
          <div class="password">
            <PasswordInput v-model="payPassword" />
          </div>
          <div class="forget-pwd">
            忘记支付密码，
            <router-link class="to" to="/unionPay/retrievePassword">
              去找回 >
            </router-link>
          </div>
        </div>
      </template>
    </van-number-keyboard>
  </van-overlay>
</template>

<style scoped lang="scss">
.payment-code-container {
  font-size: 60px;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100%;
  background: #FFFFFF;
}
.payment-code-wrapper {
  border-radius: 20px;
  border: 10px solid #C11F13;
  height: 960px;
  box-sizing: border-box;
  background: #C11F13;
  .payment-code-header {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    border-radius: 20px 20px 0 0;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.06);
    padding: 0 16px;
    .left {
      font-size: 30px;
      color: #292929;
      text-align: center;
      .span {
        line-height: 44px;
        display: inline-block;
        vertical-align: middle;
      }
      .union-icon {
        width: 60px;
        height: 60px;
        background-image: url("~img/union-pay.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
    .right {
      font-size: 24px;
      color: #999999;
      line-height: 44px;
      padding: 20px 0 20px 20px;
    }
  }
  .payment-code-body {
    height: 690px;
    background: #FFFFFF;
    border-radius: 0 0 20px 20px;
    padding-top: 60px;
    box-sizing: border-box;
    .tip {
      font-size: 24px;
      color: #666666;
      text-align: center;
      line-height: 44px;
    }
    .bar-code {
      width: 560px;
      height: 140px;
      margin: 20px auto 0;
      background: #FFFFFF;
      #barcode {
        width: 100%;
        height: 100%;
      }
    }
    .qr-code {
      width: 360px;
      height: 360px;
      margin: 10px auto 0;
      background: #FFFFFF;
      #qr-code {
        width: 100%!important;
        height: 100%!important;
      }
    }
  }
  .payment-code-footer {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    color: #FFFFFF;
    line-height: 44px;
    .bank-name-box {
      display: flex;
      align-items: center;
      font-size: 26px;
      line-height: 40px;
      .icon {
        width: 40px;
        height: 40px;
        margin-right: 16px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
    .balance {
      font-size: 24px;
    }
  }
}
.more-payment {
  margin-top: 30px;
  padding: 0 20px;
  background: #F7F7F7;
  border-radius: 20px;
  font-size: 28px;
  color: #4A4A4A;
  line-height: 44px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon-right {
    color: #4A4A4A;
  }
}
.my-overlay {
  background: #FFFFFF;
  .qr-code-preview {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .barcode-preview {
    transform: rotate(90deg);
    transform-origin: 0 0;
    width: 100vh;
    height: 100vw;
    position: absolute;
    left: 100%;
    .before-barcode {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #323233;
      .icon-security {
        font-size: 72px;
        margin-bottom: 40px;
      }
      .before-barcode-tip {
        font-size: 28px;
        line-height: 48px;
      }
      .i-know {
        margin-top: 40px;
        width: 160px;
      }
    }
    .barcode {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .barcode-tip {
        color: #323233;
        font-size: 28px;
      }
      .img {
        margin-top: 40px;
      }
      .barcode-number {
        color: #000000;
        font-weight: 600;
        font-size: 40px;
      }
    }
  }
}
.keyboard-custom-title-wrapper {
  width: 100vw;
  background: #FFFFFF;
  border-radius: 40px 40px 0 0;
  .password-title {
    line-height: 100px;
    font-size: 34px;
    color: #292929;
    //font-weight: 600;
    text-align: center;
  }
  .pay-info {
    padding: 50px 0;
    text-align: center;
    .price-box {
      font-weight: 600;
      .pay-unit {
        font-size: 34px;
        color: #242424;
      }
      .pay-amount {
        font-size: 80px;
        color: #242424;
        line-height: 110px;
      }
    }
    .station-name {
      margin-top: 10px;
      font-size: 30px;
      color: #939393;
    }
  }
  .password {
    padding: 60px 60px 0;
  }
  .forget-pwd {
    font-size: 26px;
    color: #9B9B9B;
    line-height: 100px;
    text-align: right;
    padding: 0 60px;
    .to {
      color: #1989FA;
    }
  }
}
/* van-keyboard 自定义样式 */
.van-number-keyboard {
  background: #FFFFFF;
  :deep(.van-number-keyboard__header) {
    height: auto;
    .van-number-keyboard__title-left {
      position: relative;
    }
  }
  :deep(.van-key) {
    background: #F2F3F5;
  }
  :deep(.van-key--active) {
    background: #F7F8FA;
  }
  :deep(.van-key--blue) {
    background: #1989FA;
  }
}
</style>
