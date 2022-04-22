<script setup lang="ts">
import { GetSupportiveBanks, CheckSupportiveBank, OpenAccount } from '@/api/openAccount'
import { IDValid, MobileValid } from '@/utils/validate'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesCommon } from '@/types/storage.types'
import { store } from '@/store'
import router from '@/router'

const { proxy } = getCurrentInstance()

const agree = ref(false)
const supportiveBank = ref(false)
const banks = ref('')
const formState = reactive({
  userName: Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_USERNAME_SESSION),
  idCardNo: Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_ID_CARD_SESSION),
  bindFirstCardNo: Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_BANK_CARD_SESSION),
  mobile: Storage.Session.get(StorageTypesCommon.APP_OPEN_ACCOUNT_MOBILE_SESSION)
})

GetSupportiveBanks({
  bank: 'XIB'
}).then(data => {
  banks.value = data
})

formState.bindFirstCardNo && checkSupportiveBank()

function handleSubmit () {
  if (!formState.userName) {
    return proxy.$toast('请输入真实姓名')
  }
  if (!IDValid(formState.idCardNo)) {
    return proxy.$toast('请输入正确的身份证号')
  }
  if (!supportiveBank.value) {
    return proxy.$toast('请输入被支持的银行卡号')
  }
  if (!MobileValid(formState.mobile)) {
    return proxy.$toast('请输入正确的手机号')
  }
  if (!agree.value) {
    return proxy.$toast('请勾选同意协议')
  }
  openAccount()
}

function handleBlur (key, value) {
  Storage.Session.set(key, value, StorageExpire.Day)
}

function checkSupportiveBank () {
  if (formState.bindFirstCardNo) {
    CheckSupportiveBank({
      bank: 'XIB',
      bankNo: formState.bindFirstCardNo
    }).then(() => {
      supportiveBank.value = true
    }).catch(error => {
      supportiveBank.value = false
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}

function openAccount () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  OpenAccount({
    ...formState,
    areaName: '北京市',
    cityName: '北京市',
    district: '朝阳区',
    combineType: 'payeasenet_xib',
    longitude: store.state.common.longitude,
    latitude: store.state.common.latitude,
    pcode: store.state.common.partnerCode
  }).then(res => {
    if (res.data.activateFlag) {
      router.push('xib/success')
    } else {
      // 需要激活
      Storage.Session.set(StorageTypesCommon.APP_OPEN_ACCOUNT_THIRD_CARD_SESSION, res.data.cardNo, StorageExpire.Day)
      router.push({
        path: 'xib/failure',
        query: {
          status: res.status,
          error: encodeURIComponent(res.info)
        }
      })
    }
  }).catch(res => {
    router.push({
      path: 'xib/failure',
      query: {
        status: res.status,
        error: encodeURIComponent(res.info)
      }
    })
  })
}
</script>

<template>
  <div class="open-account-container">
    <div class="tip">
      开户成功后将从储蓄卡自动转0.01元激活新账户
    </div>
    <div class="form-row bottom-line">
      <div class="label">
        姓名
      </div>
      <div class="value">
        <input
          v-model="formState.userName"
          class="input"
          type="text"
          placeholder="请输入您的真实姓名"
          @blur="handleBlur(StorageTypesCommon.APP_OPEN_ACCOUNT_USERNAME_SESSION, formState.userName)">
      </div>
    </div>
    <div class="form-row bottom-line">
      <div class="label">
        身份证号
      </div>
      <div class="value">
        <input
          v-model="formState.idCardNo"
          class="input"
          type="text"
          placeholder="请输入您的身份证号"
          pattern="[0-9]*"
          maxlength="18"
          @blur="handleBlur(StorageTypesCommon.APP_OPEN_ACCOUNT_ID_CARD_SESSION, formState.idCardNo)">
      </div>
    </div>
    <div class="form-row bottom-line">
      <div class="label">
        银行卡号
      </div>
      <div class="value">
        <input
          v-model="formState.bindFirstCardNo"
          class="input"
          type="text"
          placeholder="请输入支持银行储蓄卡号(有余额)"
          pattern="[0-9]*"
          maxlength="20"
          @blur="checkSupportiveBank();handleBlur(StorageTypesCommon.APP_OPEN_ACCOUNT_BANK_CARD_SESSION, formState.bindFirstCardNo)">
      </div>
    </div>
    <div class="form-row bottom-line">
      <div class="label">
        手机号
      </div>
      <div class="value">
        <input
          v-model="formState.mobile"
          class="input"
          type="text"
          placeholder="请输入上述银行卡预留手机号"
          pattern="[0-9]*"
          maxlength="11"
          @blur="handleBlur(StorageTypesCommon.APP_OPEN_ACCOUNT_MOBILE_SESSION, formState.mobile)">
      </div>
    </div>
    <div class="supportive-banks" @click="$router.push(`/supportive/${$route.params.bank}`)">
      <div>支持绑定下述银行储蓄卡:</div>
      {{ banks }}
    </div>
    <div class="agreement-wrapper">
      <van-checkbox v-model="agree" shape="square" icon-size="4.26667vw">
        我已阅读并同意如下内容：
      </van-checkbox>
      <div class="agreement-box">
        1、同意
        <span class="agreement" @click.stop="$router.push('/agreement/xibAgreement')">
          《厦门国际银行股份有限公司个人银行账户管理协议》
        </span>
        、
        <span class="agreement" @click.stop="$router.push('/agreement/xibNotice')">
          《个人账户资金代收须知》
        </span>
      </div>
      <div class="agreement-box">
        2、本人同意在厦门国际银行III类结算账户成功开立后，授权厦门国际银行将该III类结算账户消费交易信息中的交易时间、银行卡号、交易流水号、交易金额、商户全称、支付渠道提供给云油加油，用以参加赠送加油金等营销活动。
      </div>
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="handleSubmit">
        立即开通
      </div>
      <div class="secure">
        <div class="secure-icon" />
        <div>所提供信息仅用于开通III类结算账户</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-account-container {
  min-height: 100%;
  background: #FFFFFF;
  padding: 30px 30px 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .tip {
    font-size: 24px;
    line-height: 24px;
    color: #CAA067;
    padding: 18px 0;
    text-align: center;
    background: linear-gradient(270deg, #FBF2E2 0%, #FAECD4 94%);
    border-radius: 6px;
  }
  .form-row {
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #292929;
    .label {
      width: 200px;
      height: 110px;
      display: flex;
      align-items: center;
    }
    .value {
      flex: 1;
      height: 110px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      .input {
        width: 100%;
        height: 90%;
        border: none;
        outline: none;
        &::placeholder {
          font-size: 28px;
          color: #B0B0B0;
        }
      }
    }
  }
  .supportive-banks {
    font-size: 22px;
    color: #B0B0B0;
    text-align: justify;
    line-height: 48px;
    max-height: 144px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 30px;
  }
  .agreement-wrapper {
    font-size: 22px;
    color: #323233;
    justify-self: flex-end;
    margin-top: 100px;
    .van-checkbox {
      display: flex;
      align-items: baseline;
    }
    .agreement-box {
      text-align: justify;
      margin-top: 20px;
      .agreement {
        color: #1989FA;
      }
    }
  }
  .bottom-button {
    background: #FFFFFF;
    height: 180px;
    .secure {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #B0B0B0;
      margin-top: 16px;
      .secure-icon {
        width: 31px;
        height: 36px;
        background-image: url("~img/openAccount/secure.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }
  }
}
</style>
