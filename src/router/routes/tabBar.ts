import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import { store } from '@/store'
import router from '@/router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recharge',
    component: Layout,
    children: [
      {
        path: '/recharge',
        name: 'Recharge',
        meta: {
          title: '云油加油',
          navBar: false,
          tarBar: true,
          keepAlive: true,
          auth: false
        },
        component: () => import(/* webpackChunkName: "recharge" */ /* webpackPreload: true */ '@/views/TheRecharge.vue')
      },
      {
        path: '/refuel',
        name: 'Refuel',
        meta: {
          title: '云油加油',
          navBar: false,
          tarBar: true,
          auth: false,
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "refuel" */ /* webpackPreload: true */ '@/views/TheRefuel.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        meta: {
          title: '云油加油',
          navBar: false,
          tarBar: true,
          keepAlive: true,
          auth: false // 因为tabBar是通过 replace 跳转 所以这里auth设置false， 对此页单独处理
        },
        beforeEnter: (to, from, next) => {
          if (!store.state.user.token) {
            if (from.path === '/login') {
              router.replace('/')
            } else {
              router.push('/login')
            }
          } else {
            next()
          }
        },
        component: () => import(/* webpackChunkName: "mine" */ /* webpackPreload: true */ '@/views/TheMine.vue')
      }
    ]
  }
]

export default routes
