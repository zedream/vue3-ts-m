<script setup lang="ts">
import { GetCommissionRatio } from '@/api/spread'
import { store } from '@/store'
import router from '@/router'

const route = useRoute()

const phone = ref('')
const commissions = inject('commissions') as CommissionsData[]

if (!store.state.spread.currentCaptainId) {
  router.go(-2)
}

GetCommissionRatio({
  agentMemberId: route.params.memberId
}).then(data => {
  phone.value = data.agentMobile
  commissions.value = data?.commissions
})
</script>

<template>
  <div class="detached-container">
    <div class="title">
      您的队长
      {{ phone }}
      佣金结算设置
    </div>
    <div class="section">
      现在将为您的队长设置佣金比例，队长及其带来的队员产生的加油佣金都可结算成你的佣金。请合理设置佣金收益让利比例，您在躺赢的同时可吸引队长为您带来更多的队员。
    </div>
    <div class="section">
      当队长带来的队员累计加油金额小于50万元，您享有佣金比例 0.50%的佣金提成，您将其中
      <input
        v-if="commissions.length"
        v-model="commissions[0].proportion"
        class="input"
        maxlength="6"
        type="text">
      %（让利佣金比例）佣金收益让利给您的队长
    </div>
    <div class="section">
      当队长带来的队员累计加油金额大于等于50万元以上，您享有佣金比例 1%的佣金提成，您将其中
      <input
        v-if="commissions.length"
        v-model="commissions[1].proportion"
        class="input"
        maxlength="6"
        type="text">
      %（让利佣金比例）佣金收益让利给您的队长
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="$router.push(`confirm?phone=${phone}`)">
        下一步
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
    .input {
      background: none;
      width: 80px;
      border-bottom: 1px solid #DCDEED;
      text-align: center;
    }
  }
  .bottom-button {
    background: #FFFFFF;
  }
}
</style>
