import { createRouter, createWebHistory } from 'vue-router'
// import { name } from '../../config/config'
import { store } from '@/store'
import { NavType } from '@/store/mutation.types'
import tabBar from './routes/tabBar'
import petrolStation from './routes/petrolStation'
import mine from './routes/mine'
import common from './routes/common'
import activity from './routes/activity'
import openAccount from './routes/openAccount'
import pay from './routes/pay'
import settings from './routes/settings'
import other from './routes/guide'
import agreement from './routes/agreement'
import spread from './routes/spread'

const router = createRouter({
  history: createWebHistory(process.env.PUBLIC_PATH),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // linkExactActiveClass: 'is-active',
  routes: [
    ...tabBar,
    ...petrolStation,
    ...mine,
    ...common,
    ...activity,
    ...openAccount,
    ...pay,
    ...settings,
    ...other,
    ...agreement,
    ...spread
  ]
})

router.beforeEach((to, from, next) => {
  // document.title = `${to.meta.title} - ${name}`
  document.title = to.meta.title
  store.commit(`nav/${NavType.SET_PATH}`, to.path)
  if (to.meta.auth && !store.state.user.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
