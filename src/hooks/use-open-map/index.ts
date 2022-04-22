import gcoord from 'gcoord'
import { platform } from '@/utils/utils'

export const useOpenMap = (
  longitude: string | number,
  latitude: string | number,
  address: string,
  store
) => {
  const MyPosition = reactive({
    longitude: +store.state.common.longitude,
    latitude: +store.state.common.latitude
  })

  function AMap () {
    const ggLng = bdDecrypt(MyPosition.longitude, MyPosition.latitude).lng
    const ggLat = bdDecrypt(MyPosition.longitude, MyPosition.latitude).lat
    const myResult = gcoord.transform(
      [ggLng, ggLat], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
    )
    const destinationResult = gcoord.transform(
      [+longitude, +latitude], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
    )
    const str = platform.IOS() ? 'iosamap' : 'androidamap'
    window.location.href = `${str}://route/plan/?sid=&slat=${myResult[1]}&slon=${myResult[0]}&sname=我的位置&did=&dlat=${destinationResult[1]}&dlon=${destinationResult[0]}&dname=${address}&dev=0&t=0`
  }

  function BMap () {
    const str = platform.IOS() ? 'baidumap' : 'bdapp'
    const src = platform.IOS() ? 'ios.baidu.openAPIdemo' : 'andr.baidu.openAPIdemo'
    window.location.href = `${str}://map/direction?origin=name:我的位置|latlng:${MyPosition.latitude},${MyPosition.longitude}&destination=name:${address}|latlng:${latitude},${longitude}&coord_type=bd09ll&mode=driving&src=${src}`
  }

  function WeMap () {
    const ggLng = bdDecrypt(+MyPosition.longitude, +MyPosition.latitude).lng
    const ggLat = bdDecrypt(+MyPosition.longitude, +MyPosition.latitude).lat
    const myResult = gcoord.transform(
      [ggLng, ggLat], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
    )
    const destinationResult = gcoord.transform(
      [+longitude, +latitude], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
    )
    window.location.href = `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=${myResult[1]},${myResult[0]}&to=${address}&tocoord=${destinationResult[1]},${destinationResult[0]}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
  }

  function bdDecrypt (bdLng: number, bdLat: number) {
    const X_PI = Math.PI * 3000.0 / 180.0
    const x = bdLng - 0.0065
    const y = bdLat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
    const ggLng = z * Math.cos(theta)
    const ggLat = z * Math.sin(theta)
    return {
      lng: ggLng,
      lat: ggLat
    }
  }

  return {
    AMap,
    BMap,
    WeMap
  }
}
