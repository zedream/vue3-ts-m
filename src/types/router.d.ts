import { RouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string // 页面title
    navBar?: boolean // 是否需要Header组件
    tarBar?: boolean // 是否需要Menu组件
    auth: boolean // 是否需要登录
    keepAlive?: boolean // 是否需要缓存组件
    icon?: string // 主菜单iconfont类名
    detachedNavBar?: boolean
    navBarBackdrop?: string // Header背景颜色
    notLine?: boolean
  }
}
