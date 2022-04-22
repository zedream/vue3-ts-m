import { useStore } from '@/store'
import { CommonType } from '@/store/mutation.types'

export const useGeolocation = (proxy) => {
  return new Promise<number>((resolve) => {
    const store = useStore()

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    function success (pos) {
      const crd = pos.coords
      console.log(pos.coords)
      console.log(`经纬度： ${crd.longitude}, ${crd.latitude} ------ 定位误差 ${crd.accuracy} meters.`)
      console.timeEnd('H5 Geolocation 定位时间')
      store.commit(`common/${CommonType.SET_LONGITUDE}`, crd.longitude)
      store.commit(`common/${CommonType.SET_LATITUDE}`, crd.latitude)
      console.log('------ 定位成功， 已使用最新位置信息 ------')
      proxy.$toast.clear()
      resolve(0)
    }
    function error (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`) // 1 拒绝授权定位 2 位置不可用 3 超时
      console.log('------ 定位失败， 已使用上次位置信息或默认位置 ------')
      proxy.$toast.clear()
      resolve(err.code)
    }
    console.time('H5 Geolocation 定位时间')
    proxy.$toast.loading({
      message: '定位中...',
      forbidClick: true,
      duration: 0
    })
    navigator.geolocation.getCurrentPosition(success, error, options)
  })
}
