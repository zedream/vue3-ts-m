import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/spread',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/spread/achievement',
        name: 'Spread',
        meta: {
          title: '',
          navBar: true,
          tarBar: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/index.vue'),
        children: [
          {
            path: 'achievement',
            name: 'Achievement',
            meta: {
              title: '我的业绩',
              navBar: true,
              detachedNavBar: true,
              tarBar: false,
              auth: true
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/TheAchievement.vue')
          },
          {
            path: 'team',
            name: 'MyTeam',
            meta: {
              title: '我的战队',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/MyTeam.vue')
          },
          {
            path: 'income',
            name: 'Income',
            meta: {
              title: '收入明细',
              navBar: true,
              tarBar: false,
              auth: true
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/TheIncome.vue')
          },
          {
            path: 'expand',
            name: 'ExpandTeam',
            meta: {
              title: '扩充战队',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/ExpandTeam.vue')
          },
          {
            path: 'problem',
            name: 'CommonProblem',
            meta: {
              title: '常见问题',
              navBar: true,
              tarBar: false,
              auth: true
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/CommonProblem.vue')
          },
          {
            path: 'withdrawal',
            name: 'Withdrawal',
            meta: {
              title: '提现',
              navBar: true,
              tarBar: false,
              auth: true
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/TheWithdrawal.vue')
          },
          {
            path: 'team/:memberId',
            name: 'MemberDetail',
            meta: {
              title: '',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/MemberDetail.vue')
          },
          {
            path: 'team/:memberId/setting',
            name: 'MemberSetting',
            meta: {
              title: '佣金设置',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/MemberSetting.vue')
          },
          {
            path: 'team/:memberId/confirm',
            name: 'MemberSettingConfirm',
            meta: {
              title: '确认佣金设置',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/MemberSettingConfirm.vue')
          },
          {
            path: 'team/:memberId/success',
            name: 'MemberSettingSuccess',
            meta: {
              title: '佣金设置成功',
              navBar: true,
              detachedNavBar: true,
              notLine: true,
              tarBar: false,
              auth: true,
              navBarBackdrop: 'transparent'
            },
            component: () => import(/* webpackChunkName: "spread" */ '@/views/spread/MemberSettingSuccess.vue')
          }
        ]
      }
    ]
  }
]

export default routes
