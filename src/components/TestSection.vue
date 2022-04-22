<script setup lang="ts">
import { name, version } from '../../config/config'
const env = process.env.APP_NODE_ENV

const api = env === 'prod' ? 'https://c2b.brightoilonline.com' : 'https://c2b-test14.brightoilonline.com'
const showDetail = ref(false)
</script>

<template>
  <div class="test-section">
    <van-divider :style="{ fontSize: '3.6vw', padding: '2.66667vw 0', margin: 0 }">
      非正式版本
    </van-divider>
    <van-button
      type="primary"
      size="small"
      block
      @click="showDetail = true">
      点击查看详细信息
    </van-button>
    <van-divider :style="{ fontSize: '3.6vw', padding: '2.66667vw 0', margin: 0 }">
      @author Tang Hao(1115491560@qq.com)
    </van-divider>
    <van-popup
      v-model:show="showDetail"
      round
      position="bottom">
      <van-cell-group>
        <van-cell title="产品名称" :value="name" />
        <van-cell title="当前版本" :value="version" />
        <van-cell title="当前环境" :value="env" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.test-section {
  padding: 0 20px;
  background: #FFFFFF;
  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  color: #4A4A4A;
}
</style>
