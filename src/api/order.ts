import request from '@/request'
/**
 * 获取订单列表
 */
export const GetOrderList = data => new Promise<PageData<OrderListData>>((resolve, reject) => {
  request.get('/api/bwoilSvr/order/fuel/preFuelOrder/query', data).then((res) => {
    resolve(res.data || {})
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取加油订单详情
 */
export const GetRefuelOrderDetail = data => new Promise<OrderDetailData>((resolve, reject) => {
  request.get(`/api/bwoilSvr/order/fuel/preFuelOrder/detail/${data}`).then((res) => {
    if (res.status === 10000) {
      resolve(res.data || {})
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 取消加油订单
 */
export const CancelRefuelOrder = data => new Promise<void>((resolve, reject) => {
  request.post(`/api/bwoilSvr/order/fuel/preFuelOrder/cancel/${data}`, {}).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
