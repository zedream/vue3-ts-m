import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import { store } from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录/注册',
      auth: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.token) {
        next(from.path)
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "access" */ '@/views/common/TheLogin.vue')
  },
  {
    path: '/refer',
    name: 'Refer',
    meta: {
      title: '车主加油大优惠',
      navBar: false,
      tarBar: false,
      auth: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.token) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "access" */ '@/views/common/TheRefer.vue')
  },
  {
    path: '/verification',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Verification',
        meta: {
          title: '短信验证码',
          navBar: true,
          tarBar: false,
          auth: false
        },
        component: () => import(/* webpackChunkName: "access" */ '@/views/common/TheVerification.vue')
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        meta: {
          title: '关于云油',
          navBar: true,
          tarBar: false,
          auth: false
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/AboutUs.vue')
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: '',
        name: 'MemberBenefit',
        meta: {
          title: '会员权益',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/MemberBenefit.vue')
      }
    ]
  },
  {
    path: '/guidance',
    component: Layout,
    children: [
      {
        path: '',
        name: 'NoviceGuidance',
        meta: {
          title: '新手福利',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/NoviceGuidance.vue')
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Service',
        meta: {
          title: '客服中心',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/ServiceCenter.vue')
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Card',
        meta: {
          title: '我的卡号',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/MyCard.vue')
      }
    ]
  },
  {
    path: '/bind',
    component: Layout,
    children: [
      {
        path: '',
        name: 'BindCard',
        meta: {
          title: '绑卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "common" */ '@/views/common/BindCard.vue')
      }
    ]
  },
  {
    path: '/exchange',
    component: Layout,
    children: [
      {
        path: '',
        name: 'VoucherExchange',
        meta: {
          title: '卡券兑换',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "voucher" */ '@/views/common/VoucherExchange.vue')
      }
    ]
  },
  {
    path: '/allowance',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Allowance',
        meta: {
          title: '加油补贴',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "allowance" */ '@/views/common/TheAllowance.vue')
      }
      // {
      //   path: '/allowance/:allowanceId',
      //   name: 'AllowanceDetail',
      //   meta: {
      //     title: '我的红包',
      //     navBar: true,
      //     tarBar: false,
      //     auth: true
      //   },
      //   component: () => import(/* webpackChunkName: "allowance" */ '@/views/common/RedEnvelopeDetail.vue')
      // }
    ]
  }
]

export default routes
