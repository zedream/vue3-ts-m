<script setup lang="ts">
import { GrantCaptain } from '@/api/spread'
import { store } from '@/store'
import router from '@/router'

const { proxy } = getCurrentInstance()

const commissions = inject<CommissionsData[]>('commissions')

if (!store.state.spread.currentCaptainId) {
  router.go(-3)
}

function handleConfirmConfig () {
  grantCaptain().then(() => {
    router.push('success')
  })
}

function grantCaptain () {
  return new Promise<void>(resolve => {
    proxy.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    GrantCaptain({
      agentMemberId: store.state.spread.currentCaptainId,
      allotconfs: commissions.value
    }).then(() => {
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
  <div class="detached-container">
    <div class="title">
      请确认您的队长
      {{ $route.query.phone }}
      佣金结算设置
    </div>
    <div class="section">
      当您的队长成员累计加油金额小于50万元，您享有佣金比例 0.1%的佣金提成，您将其中
      <span class="ratio">
        {{ commissions[0]?.proportion || '0.00' }}%
      </span>
      佣金收益让利给您的队长
    </div>
    <div class="section">
      当您的队长成员累计加油金额大于等于50万元，您享有佣金比例 1%的佣金提成，您将其中
      <span class="ratio">
        {{ commissions[1]?.proportion || '0.00' }}%
      </span>
      佣金收益让利给您的队长
    </div>
    <div class="bottom-button">
      <div class="common-button common-button-plain" @click="$router.back()">
        返回修改
      </div>
      <div class="common-button" @click="handleConfirmConfig">
        确认佣金配置
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detached-container {
  .title {
    font-size: 30px;
    color: #222A37;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .section {
    font-size: 24px;
    color: #434343;
    line-height: 40px;
    text-align: justify;
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
    .ratio {
      font-size: 24px;
      color: #FF7F41;
      font-weight: 600;
    }
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
