import request from '@/request'
/**
 * 获取油站列表
 */
export const GetRefuelStationList = data => new Promise<StationListData>((resolve, reject) => {
  request.post('/api/gas/app/getStationList', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取加油优惠列表轮播数据
 */
export const GetRefuelCarouselList = () => new Promise<RefuelCarouselListData>((resolve, reject) => {
  request.get('/api/operation/common/topBuyOrderList').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取油站详情
 */
export const GetPetrolStationDetail = data => new Promise<PetrolStationData>((resolve, reject) => {
  request.post('/api/gas/app/getStationInfo', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取合作油站快捷加油面额
 */
export const GetQuickAmount = data => new Promise<QuickAmountData[]>((resolve, reject) => {
  request.get('/api/bwoilSvr/order/fuel/preFuelOrder/discounts/listInfo', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取合作油站金额对应的油量与优惠
 */
export const GetAmountDiscountInfo = data => new Promise<QuickAmountData>((resolve, reject) => {
  request.get('/api/bwoilSvr/order/fuel/preFuelOrder/discounts/singleInfo', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 创建加油订单
 */
export const GenerateRefuelOrder = data => new Promise<GenerateRefuelOrderData>((resolve, reject) => {
  request.post('/api/bwoilSvr/order/fuel/preFuelOrder/add', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 更新订单支付方式
 */
export const UpdateOrderPayWay = data => new Promise<void>((resolve, reject) => {
  request.get(`/api/bwoilSvr/order/fuel/preFuelOrder/updatePayWay/${data.orderNo}`, data).then(() => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
/**
 * 搜索联想结果
 */
export const GetSearchSuggestion = data => new Promise<SearchSuggestionData>((resolve, reject) => {
  request.post('/api/bwoilSvr/station/search/public/suggestion', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 搜索结果
 */
export const GetSearchResult = data => new Promise<StationListData>((resolve, reject) => {
  request.post('/api/gas/app/getStationList', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
