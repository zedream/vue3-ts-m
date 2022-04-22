<script setup lang="ts">
import { useBankRoute } from '@/hooks'

const { proxy } = getCurrentInstance()

const show = ref(true)

function confirm () {
  useBankRoute(proxy)
}
</script>

<template>
  <van-overlay :show="show" class-name="my-overlay" @click="show = false">
    <div class="retain-c" @click.stop>
      <div class="bg" />
      <div>
        <div class="confirm" @click="confirm">
          继续开通
        </div>
        <div class="cancel" @click="show = false">
          残忍退出
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped lang="scss">
.my-overlay {
  z-index: 1994;
}
.retain-c {
  margin: 300px auto 0;
  width: 628px;
  background: #FFFFFF;
  border-radius: 22px;
  overflow: hidden;
  .bg {
    width: 628px;
    height: 520px;
    background-image: url("~img/openAccount/retain-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .confirm {
    margin: 40px auto 0;
    width: 400px;
    padding: 19px 0;
    text-align: center;
    background: linear-gradient(90deg, #6387FF 3%, #3A66FF 100%);
    border-radius: 6px;
    font-size: 32px;
    line-height: 32px;
    color: #FFFFFF;
    font-weight: 600;
  }
  .cancel {
    padding: 20px 0;
    margin: 20px 0;
    font-size: 24px;
    color: #B8B8B8;
    text-align: center;
    line-height: 32px;
  }
}
</style>
