import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/openAccount',
    redirect: '/openAccount/guide',
    component: Layout,
    children: [
      {
        path: 'guide',
        name: 'OpenAccountGuide',
        meta: {
          title: '开通加油省钱卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/openAccount/TheGuide.vue')
      },
      {
        path: '/openAccount/:bank(bcm|xib|citic)',
        name: 'OpenAccount',
        meta: {
          title: '开通加油省钱卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        beforeEnter: (to, from, next) => {
          if (to.path.toLocaleLowerCase().indexOf('xib') > -1) {
            to.meta.title = '开通厦门国际银行加油省钱卡'
            document.title = '开通厦门国际银行加油省钱卡'
          } else if (to.path.toLocaleLowerCase().indexOf('bcm') > -1) {
            to.meta.title = '开通交通银行III类结算账户'
            document.title = '开通交通银行III类结算账户'
          } else if (to.path.toLocaleLowerCase().indexOf('citic') > -1) {
            to.meta.title = '开通中信银行加油省钱卡'
            document.title = '开通中信银行加油省钱卡'
          }
          next()
        },
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/openAccount/OpenAccount.vue')
      },
      {
        path: '/openAccount/:bank(bcm|xib|citic)/failure',
        name: 'OpenAccountFailure',
        meta: {
          title: '省钱卡开通结果',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/openAccount/TheFailure.vue')
      },
      {
        path: '/openAccount/:bank(bcm|xib|citic)/success',
        name: 'OpenAccountSuccess',
        meta: {
          title: '省钱卡开通结果',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/openAccount/TheSuccess.vue')
      },
      {
        path: '/openAccount/:bank(bcm|xib|citic)/activate',
        name: 'OpenAccountActivate',
        meta: {
          title: '开通加油省钱卡',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/openAccount/TheActivate.vue')
      }
    ]
  },
  {
    path: '/supportive/:bank',
    component: Layout,
    children: [
      {
        path: '',
        name: 'SupportiveBanks',
        meta: {
          title: '加油省钱卡开户支持银行',
          navBar: true,
          tarBar: false,
          auth: true
        },
        beforeEnter: (to, from, next) => {
          if (to.path.toLocaleLowerCase().indexOf('xib') > -1) {
            to.meta.title = '厦门国际银行加油省钱卡开户支持银行'
            document.title = '厦门国际银行加油省钱卡开户支持银行'
          } else if (to.path.toLocaleLowerCase().indexOf('bcm') > -1) {
            to.meta.title = '交通银行III类结算账户开户支持银行'
            document.title = '交通银行III类结算账户开户支持银行'
          } else if (to.path.toLocaleLowerCase().indexOf('citic') > -1) {
            to.meta.title = '中信银行加油省钱卡开户支持银行'
            document.title = '中信银行加油省钱卡开户支持银行'
          }
          next()
        },
        component: () => import(/* webpackChunkName: "bank" */ '@/views/openAccount/SupportiveBanks.vue')
      }
    ]
  }
]

export default routes
