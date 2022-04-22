import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/unionPay',
    redirect: '/unionPay/pay',
    component: Layout,
    children: [
      {
        path: 'pay',
        name: 'UnionPay',
        meta: {
          title: '银联云闪付付款码',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "unionPay" */ '@/views/unionPay/ThePay.vue')
      },
      {
        path: 'bindPwd',
        name: 'UnionPayBindCardPwd',
        meta: {
          title: '银联云闪付绑卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "unionPay" */ '@/views/unionPay/BindCardPwd.vue')
      },
      {
        path: 'bindSms',
        name: 'UnionPayBindCardSms',
        meta: {
          title: '银联云闪付绑卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "unionPay" */ '@/views/unionPay/BindCardSms.vue')
      },
      {
        path: 'wapPay',
        name: 'WapPay',
        meta: {
          title: '银联云闪付',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "unionPay" */ '@/views/unionPay/UnionWapPay.vue')
      },
      {
        path: 'retrievePassword',
        name: 'RetrievePassword',
        meta: {
          title: '找回支付密码',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/unionPay/RetrievePassword.vue')
      },
      {
        path: 'result',
        name: 'Result',
        meta: {
          title: '付款结果',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "unionPay" */ '@/views/unionPay/TheResult.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'rechargeCashier',
        name: 'RechargeCashier',
        meta: {
          title: '收银台',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "pay" */ '@/views/pay/RechargeCashier.vue')
      }
    ]
  },
  {
    path: '/pay',
    component: Layout,
    children: [
      {
        path: 'verifyCode',
        name: 'VerifyCode',
        meta: {
          title: '支付验证码',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "pay" */ '@/views/pay/VerifyCodePay.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'refuelCashier',
        name: 'RefuelCashier',
        meta: {
          title: '收银台',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "order" */ '@/views/pay/RefuelCashier.vue')
      }
    ]
  }
]

export default routes
