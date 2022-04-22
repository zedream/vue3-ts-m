import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'refuel',
        name: 'RefuelGuide',
        meta: {
          title: '加油指引',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/RefuelGuide.vue')
      },
      {
        path: 'card',
        name: 'WhatIsCard',
        meta: {
          title: '加油省钱卡是什么',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/WhatIsCard.vue')
      },
      {
        path: 'allowance',
        name: 'AllowanceIntroduce',
        meta: {
          title: '补贴奖励领取流程介绍',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "allowance" */ '@/views/guide/AllowanceIntroduce.vue')
      }
    ]
  },
  {
    path: '/rule',
    component: Layout,
    children: [
      {
        path: 'card',
        name: 'CardRule',
        meta: {
          title: '加油省钱卡规则',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/CardRule.vue')
      },
      {
        path: 'exchange',
        name: 'ExchangeRule',
        meta: {
          title: '规则说明',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "voucher" */ '@/views/guide/ExchangeRule.vue')
      }
    ]
  }
]

export default routes
