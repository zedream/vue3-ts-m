<script setup lang="ts">
import Storage from '@/utils/storage'
import { StorageTypesPay } from '@/types/storage.types'
import router from '@/router'

const url = Storage.Session.get(StorageTypesPay.APP_UNION_WAP_URL_SESSION)
const params = JSON.parse(Storage.Session.get(StorageTypesPay.APP_UNION_WAP_PARAMS_MAP_SESSION) || '{}')

if (!url || !params.orderId) {
  router.back()
}

onMounted(() => {
  document.yeepay.submit()
})
</script>

<template>
  <van-loading size="36px" vertical>
    跳转中...
  </van-loading>
  <form name="yeepay" :action="url" method="post">
    <input v-model="params.bizType" type="hidden" name="bizType">
    <input v-model="params.backUrl" type="hidden" name="backUrl">
    <input v-model="params.txnSubType" type="hidden" name="txnSubType">
    <input v-model="params.orderId" type="hidden" name="orderId">
    <input v-model="params.signature" type="hidden" name="signature">
    <input v-model="params.merName" type="hidden" name="merName">
    <input v-model="params.txnType" type="hidden" name="txnType">
    <input v-model="params.channelType" type="hidden" name="channelType">
    <input v-model="params.frontUrl" type="hidden" name="frontUrl">
    <input v-model="params.certId" type="hidden" name="certId">
    <input v-model="params.encoding" type="hidden" name="encoding">
    <input v-model="params.acqInsCode" type="hidden" name="acqInsCode">
    <input v-model="params.version" type="hidden" name="version">
    <input v-model="params.merAbbr" type="hidden" name="merAbbr">
    <input v-model="params.orderTimeout" type="hidden" name="orderTimeout">
    <input v-model="params.accessType" type="hidden" name="accessType">
    <input v-model="params.txnTime" type="hidden" name="txnTime">
    <input v-model="params.merId" type="hidden" name="merId">
    <input v-model="params.merCatCode" type="hidden" name="merCatCode">
    <input v-model="params.currencyCode" type="hidden" name="currencyCode">
    <input v-model="params.txnAmt" type="hidden" name="txnAmt">
    <input v-model="params.signMethod" type="hidden" name="signMethod">
    <input v-model="params.orderDesc" type="hidden" name="orderDesc">
  </form>
</template>

<style scoped lang="scss">
.van-loading {
  margin-top: 30%;
}
</style>
