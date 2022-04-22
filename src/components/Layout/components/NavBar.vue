<script setup lang="ts">
import variableStyle from '@/assets/styles/variable.global.scss'

const route = useRoute()
const { proxy } = getCurrentInstance()

function setTitle (title) {
  route.meta.title = title
  document.title = title
  proxy.$forceUpdate()
}

defineExpose({
  setTitle
})
</script>

<template>
  <div class="nav-bar-wrapper" :style="{ height: $route.meta.detachedNavBar ? 0 : variableStyle.$navBarHeight }">
    <div class="nav-bar" :class="{ 'bottom-line': !$route.meta.notLine }" :style="{ background: $route.meta.navBarBackdrop }">
      <div class="nav-bar-back" @click="$router.back()">
        <i class="iconfont icon-back" />
      </div>
      <div class="nav-bar-title">
        {{ $route.meta.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar-wrapper {
  height: $navBarHeight;
  .nav-bar {
    height: $navBarHeight;
    background: #FFFFFF;
    z-index: 1220;
    display: flex;
    align-items: center;
    color: #323233;
    .nav-bar-back {
      height: $navBarHeight;
      width: $navBarHeight;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      .icon-back {
        font-size: 36px;
        margin-left: -18px;
      }
    }
    .nav-bar-title {
      position: absolute;
      width: calc(100% - 2 * $navBarHeight);
      left: $navBarHeight;
      text-align: center;
      font-size: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
