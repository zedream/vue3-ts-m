import axios from 'axios'
import router from '@/router'
import { version } from '../../config/config'
import { store } from '@/store'
import { UserType } from '@/store/mutation.types'
import { Notify, Toast } from 'vant'
import 'vant/es/notify/style/index'
import Storage from '@/utils/storage'
import { StorageTypesCommon, StorageTypesUrlSearch, StorageTypesUser } from '@/types/storage.types'

const customDomain = Storage.Session.get(StorageTypesCommon.APP_API_DOMAIN_SESSION)

const instance = axios.create({
  baseURL: customDomain || process.env.BASE_URL,
  timeout: 8 * 1000,
  headers: {
    'content-type': 'application/json',
    boVer: version,
    boPlat: 'M'
  }
})

Storage.Session.remove(StorageTypesCommon.APP_API_DOMAIN_SESSION)

instance.interceptors.request.use((config) => {
  Object.assign(config.headers, {
    boToken: store.state.user.token || Storage.Local.get(StorageTypesUser.APP_STORE_TOKEN_LOCAL)
  })
  if (Storage.Session.get(StorageTypesUrlSearch.APP_FROM_APP_SESSION) === 'c2b_android_phone') {
    Object.assign(config.headers, {
      boTerm: 'android',
      boPlat: 'APP'
    })
  } else if (Storage.Session.get(StorageTypesUrlSearch.APP_FROM_APP_SESSION) === 'c2b_ios_phone') {
    Object.assign(config.headers, {
      boTerm: 'ios',
      boPlat: 'APP'
    })
  }
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((response) => {
  /**
   * /mine 特殊处理
   * 别问为什么 懒得说
   */
  if (response.data.status === 90000 && (router.currentRoute.value.meta.auth || router.currentRoute.value.path === '/mine')) { // token过期
    store.commit(`user/${UserType.CLEAR_AUTH}`)
    router.push('/login')
  } else if (response.data.status === 9999) { // 没有token或其他
    console.log(response.data.info)
  } else if (response.data.status === 500) {
    Notify({ type: 'danger', message: response.data.info })
  }
  // if (response.data.status !== 10000) {
  //   Notify({ type: 'danger', message: response.data.info })
  // }
  Toast.clear()
  return response
}, (error) => {
  Notify({ type: 'danger', message: error.message })
  Toast.clear()
  return Promise.reject(error)
})

export default instance
