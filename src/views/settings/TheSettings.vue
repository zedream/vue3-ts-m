<script setup lang="ts">
import { store } from '@/store'
import { version } from '../../../config/config'
import { MaskMobile } from '@/utils/security'
import { calculateStorage, clearStorage } from '@/utils/utils'

const router = useRouter()
const { proxy } = getCurrentInstance()

const storageSize = ref(calculateStorage())

function handleSignOut () {
  proxy.$dialog.confirm({
    title: '提示',
    message: '退出后不会删除任何历史数据，下次登录依然可以使用账号。',
    confirmButtonText: '退出登录',
    confirmButtonColor: '#389BFF'
  }).then(() => {
    store.dispatch('user/signOut').then(() => {
      router.replace('/refer')
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: error })
    })
  })
}

function clearStorageMemory () {
  try {
    clearStorage()
    storageSize.value = calculateStorage()
    proxy.$notify({ type: 'success', message: '清除成功' })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <van-cell title="手机号" :value="MaskMobile($store.state.user.mobile)" />
  <van-cell title="找回支付密码" is-link to="/unionPay/retrievePassword" />
  <van-cell
    title="清除缓存"
    is-link
    :value="storageSize"
    @click="clearStorageMemory" />
  <div class="space" />
  <van-cell title="更新日志" is-link to="/changelog" />
  <van-cell title="问题反馈" is-link to="/issue" />
  <van-divider>v{{ version }}</van-divider>
  <div class="bottom-button">
    <van-button
      round
      block
      type="danger"
      @click="handleSignOut">
      退出登录
    </van-button>
  </div>
</template>

<style scoped lang="scss">
.space {
  height: 20px;
}
</style>
