import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/petrolStation',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/refuel',
        name: 'PetrolStationLayout',
        component: () => import(/* webpackChunkName: "petrolStation" */ /* webpackFetch: true */ '@/views/petrolStation/index.vue')
      },
      {
        path: '/petrolStation/:stationId(\\d+)',
        name: 'PetrolStationDetail',
        meta: {
          title: '油站详情',
          navBar: true,
          tarBar: false,
          auth: true,
          detachedNavBar: true
        },
        component: () => import(/* webpackChunkName: "petrolStation" */ '@/views/petrolStation/index.vue')
      },
      {
        path: '/petrolStation/:pathMatch(.*)*',
        name: 'NotArchive',
        meta: {
          title: '加油付款',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "petrolStation" */ '@/views/petrolStation/index.vue')
      },
      {
        path: '/hongKongAndMacao',
        name: 'HongKongAndMacao',
        meta: {
          title: '油站详情',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "petrolStation" */ '@/views/petrolStation/HongKongAndMacao.vue')
      },
      {
        path: '/search',
        name: 'Search',
        meta: {
          title: '搜索油站',
          navBar: false,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "petrolStation" */ '@/views/petrolStation/TheSearch.vue')
      }
    ]
  }
]

export default routes
