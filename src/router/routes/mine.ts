import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Order',
        meta: {
          title: '我的订单',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "order" */'@/views/order/index.vue')
      },
      {
        path: '/order/:orderNo',
        name: 'OrderDetail',
        meta: {
          title: '订单详情',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "order" */ '@/views/order/OrderDetail.vue')
      }
    ]
  },
  {
    path: '/transaction',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Transaction',
        meta: {
          title: '交易记录',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "transaction" */'@/views/transaction/index.vue')
      },
      {
        path: '/transaction/:orderId',
        name: 'TransactionDetail',
        meta: {
          title: '',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "transaction" */ '@/views/transaction/TransactionDetail.vue')
      }
    ]
  }
]

export default routes
