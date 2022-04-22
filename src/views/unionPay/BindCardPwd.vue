<script setup lang="ts">
import { useMemberInfo } from '@/hooks'
import { desensitized, formatBankCard } from '@/utils/utils'
import { GetUnionPayBindCode } from '@/api/pay'
import md5 from 'js-md5'
import router from '@/router'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesPay } from '@/types/storage.types'

const { proxy } = getCurrentInstance()

const agree = ref(false)
const payPassword = ref('')
const bankInfo = ref<BankInfoData>({} as BankInfoData)

const thirdCardNo = computed(() => formatBankCard.hide(bankInfo.value?.thirdCardNo))
const mobile = computed(() => desensitized(bankInfo.value?.mobile || '', 3, 6))

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
useMemberInfo().then(result => {
  bankInfo.value = result?.bankInfo || {}
  proxy.$toast.clear()
}).catch(() => {
  proxy.$toast.clear()
})

function handleObtainCode () {
  if (bankInfo.value.mobile && thirdCardNo.value) {
    if (payPassword.value.length !== 6) {
      proxy.$toast('请输入6位支付密码')
    } else if (!agree.value) {
      proxy.$toast('请先阅读并同意协议')
    } else {
      proxy.$toast.loading({
        forbidClick: true,
        duration: 0
      })
      GetUnionPayBindCode({
        phone: bankInfo.value.mobile,
        payPassword: md5(payPassword.value)
      }).then(() => {
        proxy.$toast.clear()
        Storage.Session.set(StorageTypesPay.APP_BIND_UNION_MOBILE_SESSION, bankInfo.value.mobile, StorageExpire.Hour)
        Storage.Session.set(StorageTypesPay.APP_BIND_UNION_PASSWORD_SESSION, md5(payPassword.value), StorageExpire.Hour)
        router.push('bindSms')
      }).catch(error => {
        proxy.$toast.clear()
        proxy.$notify({ type: 'danger', message: error })
        payPassword.value = ''
      })
    }
  } else {
    proxy.$toast('获取绑卡信息失败，请刷新重试')
  }
}
</script>

<template>
  <div class="header-tip">
    <div class="tip-top">
      加油省钱卡绑定银联云闪付，开启银联云闪付付款码功能向加油站出示付款码即可完成快速付款
    </div>
    <div class="tip-btm">
      * 银联云闪付付款码可在标记有
      <span class="union-icon span" />
      的加油站使用
    </div>
  </div>
  <div class="body-form">
    <div class="form-title">
      填写绑卡信息
    </div>
    <div class="form-top">
      <div class="row bottom-line">
        <div class="label">
          绑定银行卡号
        </div>
        <div v-if="bankInfo.thirdCardNo" class="value card">
          {{ thirdCardNo }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          银行预留手机
        </div>
        <div class="value">
          {{ mobile }}
        </div>
      </div>
    </div>
    <div class="form-title">
      支付密码设置
    </div>
    <div class="form-btm">
      <PasswordInput v-model="payPassword" />
    </div>
  </div>
  <div class="footer">
    <div class="agreement-box">
      <van-checkbox v-model="agree" shape="square" icon-size="4.26667vw">
        我已阅读并同意
        <span class="agreement" @click.stop="$router.push('/agreement/unionPay')">
          《云油加油银联云闪付付款码协议》
        </span>
      </van-checkbox>
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="handleObtainCode">
        下一步
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-tip {
  padding: 30px 30px 20px;
  .tip-top {
    padding: 12px 45px;
    box-sizing: border-box;
    background: #FEF9F2;
    border-radius: 6px;
    line-height: 33px;
    font-size: 24px;
    color: #CAA067;
    text-align: center;
    margin-bottom: 72px;
  }
  .tip-btm {
    font-size: 26px;
    color: #666666;
    line-height: 50px;
    .union-icon {
      width: 50px;
      height: 50px;
      background-image: url("~img/union-pay.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
  }
}
.body-form {
  padding: 0 30px 360px;
  .form-title {
    font-size: 28px;
    color: #292929;
    line-height: 45px;
    font-weight: 600;
    margin-bottom: 20px;
    text-indent: 40px;
  }
  .form-top, .form-btm {
    background: #FFFFFF;
    padding: 0 30px;
    box-shadow: 0 6px 30px 0 rgba(66, 110, 204, 0.08);
    border-radius: 10px;
  }
  .form-top {
    margin-bottom: 20px;
  }
  .form-btm {
    padding-top: 36px;
    padding-bottom: 36px;
  }
  .row {
    height: 125px;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #4A4A4A;
    .label {
      padding-left: 10px;
    }
    .value {
      padding-right: 10px;
      flex: 1;
      text-align: right;
    }
    .card {
      font-size: 30px;
      color: #999999;
    }
    .code-label {
      margin-right: 45px;
    }
    .code {
      .input {
        width: 100%;
        &::placeholder {
          font-size: 30px;
          color: #B0B0B0;
        }
      }
    }
    .btn {
      margin-left: 100px;
    }
  }
}
.footer {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background: #F7F8FA;
  .agreement-box {
    font-size: 22px;
    color: #B0B0B0;
    margin: 30px 0;
    padding: 0 60px;
    .van-checkbox {
      display: flex;
      align-items: baseline;
      text-align: justify;
      .agreement {
        color: #1989FA;
      }
    }
  }
  .bottom-button {
    position: static;
    padding: 0 60px;
    height: 150px;
  }
}
</style>
