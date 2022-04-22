import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Settings',
        meta: {
          title: '设置中心',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/TheSettings.vue')
      }
    ]
  },
  {
    path: '/issue',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Issue',
        meta: {
          title: '问题反馈',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "issue" */ '@/views/settings/TheIssue.vue')
      }
    ]
  },
  {
    path: '/changelog',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Changelog',
        meta: {
          title: '更新日志',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "changelog" */ '@/views/settings/ChangeLog.vue')
      }
    ]
  }
]

export default routes
