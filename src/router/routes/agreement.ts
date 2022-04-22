import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/agreement',
    redirect: '/agreement/license',
    component: Layout,
    children: [
      {
        path: '/agreement/:type',
        name: 'Agreement',
        meta: {
          title: '服务协议',
          navBar: true,
          tarBar: false,
          auth: false
        },
        beforeEnter: (to, from, next) => {
          if (to.params.type === 'license') {
            to.meta.title = '服务协议'
            document.title = '服务协议'
          } else if (to.params.type === 'private') {
            to.meta.title = '隐私政策'
            document.title = '隐私政策'
          } else if (to.params.type === 'xibAgreement') {
            to.meta.title = '银行账户管理协议'
            document.title = '厦门国际银行股份有限公司个人银行账户管理协议'
          } else if (to.params.type === 'xibNotice') {
            to.meta.title = '资金代收须知'
            document.title = '厦门国际银行个人Ⅱ、Ⅲ类账户资金代收须知'
          } else if (to.params.type === 'unionPay') {
            to.meta.title = '云油加油银联付款码协议'
            document.title = '云油加油银联付款码协议'
          }
          next()
        },
        component: () => import(/* webpackChunkName: "agreement" */ '@/views/agreement/index.vue')
      }
    ]
  }
]

export default routes
