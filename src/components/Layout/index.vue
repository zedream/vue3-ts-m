<script setup lang="ts">
import variableStyle from '@/assets/styles/variable.global.scss'
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { Env } from '@/utils/global'
import UpdatePopup from '../UpdatePopup/index'
import { onMounted } from 'vue'

const route = useRoute()

const env = Storage.Local.get(StorageTypesCommon.APP_ENV_LOCAL)
/**
 * @description 向子组件提供 navBarRef
 * 主要用于动态修改 title
 * 只能在 onMounted 中使用
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/4/15 16:21
 */
const navBarRef = ref()
provide('navBarRef', readonly(navBarRef))

/**
 * @description 修正正文容器[.main]的高度
 * 感觉以现在的布局再加上这些判断， 搞的有点复杂┭┮﹏┭┮
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/3/1 20:00
 */
const mainHeight = computed(() => {
  let gap = 0
  if (route.meta.navBar && !route.meta.tarBar) {
    gap = parseFloat(variableStyle.navBarHeight)
  } else if (!route.meta.navBar && route.meta.tarBar) {
    gap = parseFloat(variableStyle.tarBarHeight)
  } else if (route.meta.navBar && route.meta.tarBar) {
    gap = parseFloat(variableStyle.tarBarHeight) + parseFloat(variableStyle.navBarHeight)
  } else if (!route.meta.navBar && !route.meta.tarBar) {
    gap = 0
  }
  if (route.meta.navBar) {
    if (env === Env.WeChat || route.meta.detachedNavBar) {
      gap = gap - parseFloat(variableStyle.navBarHeight)
    }
  }
  return `calc(100vh - ${gap}vw)`
})
</script>

<template>
  <div class="container">
    <nav-bar v-if="$route.meta.navBar && env !== Env.WeChat" ref="navBarRef" />
    <main class="main" :style="{ height: mainHeight }">
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <keep-alive :max="10">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <router-view v-else v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
    <tab-bar v-if="$route.meta.tarBar" />
    <UpdatePopup />
    <AuthorizedLogin />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .main {
    overflow-y: auto;
    background: #F7F8FA;
    overflow-x: hidden;
    padding-bottom: calc(constant(safe-area-inset-bottom));
    padding-bottom: calc(env(safe-area-inset-bottom));
  }
}
</style>
