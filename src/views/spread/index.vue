<script setup lang="ts">
/**
 * @description 分销一级路由页
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/4/21 9:42
 */
import { GetAgentQualification } from '@/api/spread'
import { store } from '@/store'
import { SpreadType } from '@/store/mutation.types'
import router from '@/router'

const { proxy } = getCurrentInstance()

provide('commissions', ref<CommissionsData[]>([]))

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetAgentQualification().then(data => {
  proxy.$toast.clear()
  if (data.grantStatus) {
    store.commit(`spread/${SpreadType.SET_AGENT_LEVEL}`, data.agentLevel)
    store.commit(`spread/${SpreadType.SET_GRANT_STATUS}`, data.grantStatus)
    // router.replace('/spread/achievement')
  } else {
    proxy.$dialog.alert({
      title: '提示',
      message: '您尚未成为云油推广商，请联系客服申请！',
      confirmButtonText: '好的',
      confirmButtonColor: '#389BFF'
    }).then(() => {
      router.replace('/')
    })
  }
}).catch(error => {
  proxy.$notify({ type: 'danger', message: error })
})
</script>

<template>
  <div class="spread-container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.spread-container {
  height: 100%;
  background: linear-gradient(168deg, #D4DCFE 0%, #E7EFFC 18%, #FFFFFF 99%);
  .detached-container {
    padding: calc($navBarHeight + 20px) 30px 20px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
