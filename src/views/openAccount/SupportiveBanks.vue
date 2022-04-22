<script setup lang="ts">
import { GetSupportiveBanks } from '@/api/openAccount'

const route = useRoute()

const banks = ref<string[]>([])

if (route.params.bank && typeof route.params.bank === 'string') {
  GetSupportiveBanks({
    bank: route.params.bank.toUpperCase()
  }).then(data => {
    banks.value = data.split('、')
    if (banks.value.length % 3 !== 0) {
      const l = 3 - banks.value.length % 3
      for (let i = 0; i < l; i++) {
        banks.value.push('')
      }
    }
  })
}

</script>

<template>
  <div class="supportive-banks-container">
    <div class="supportive-wrapper">
      <div class="supportive-title">
        支持绑定下述银行储蓄卡
      </div>
      <div class="supportive-banks">
        <div v-for="item in banks" :key="item" class="bank">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="$router.back()">
        我知道了
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.supportive-banks-container {
  min-height: 100%;
  background: #FFFFFF;
  padding: 60px 60px 180px;
  box-sizing: border-box;
  .supportive-wrapper {
    border: 2px solid #C9D9E7;
    .supportive-title {
      font-size: 30px;
      font-weight: 600;
      color: #323233;
      background: #F2F8FD;
      text-align: center;
      line-height: 80px;
    }
    .supportive-banks {
      color: #646566;
      font-size: 24px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .bank {
        line-height: 30px;
        padding: 23px 10px;
        box-sizing: border-box;
        border-right: 1px solid #C9D9E7;
        border-bottom: 1px solid #C9D9E7;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        &:nth-child(3n) {
          border-right: none;
        }
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          border-top: 1px solid #C9D9E7;
        }
        &:nth-last-child(1), &:nth-last-child(2), &:nth-last-child(3) {
          border-bottom: none;
        }
        &:nth-child(6n - 2), &:nth-child(6n - 1), &:nth-child(6n) {
          background: #FBFDFF;
        }
      }
    }
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
