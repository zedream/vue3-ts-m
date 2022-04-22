import request from '@/request'
/**
 * 主要用于获取加油卡面额
 */
export const GetRefuelCard = data => new Promise<RefuelCardData>((resolve, reject) => {
  request.post(`/api/catalog/product/viewByType/amount_refuel_cloud_v5/0?channel=${data.channel}`, {}).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
