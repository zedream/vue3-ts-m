import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/activity',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ActivityLayout',
        component: () => import(/* webpackChunkName: "activity" */ '@/views/activity/index.vue')
      },
      {
        path: '/activity/officialAccount',
        name: 'AfficialAccount',
        meta: {
          title: '关注公众号',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "activity" */ '@/views/activity/OfficialAccount.vue')
      }
    ]
  }
]

export default routes
