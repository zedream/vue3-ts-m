import request from '@/request'
/**
 * 获取交易记录列表
 */
export const GetTransactionList = data => new Promise<PageData<TransactionListData>>((resolve, reject) => {
  request.post('/api/gas/app/myNewOrderList', data).then((res) => {
    resolve(res.data || {})
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取交易记录详情
 */
export const GetTransactionDetail = (data: {
  orderId: string,
  tradeType: 'REFUELCASHBACK' | 'REFUELCASHBACKEXTRA' | 'FUEL' | 'guide' | 'WITHDRAW' // 'REFUELCASHBACK' | 'REFUELCASHBACKEXTRA' 立返单  'FUEL' | 'guide' 加油交易记录  'WITHDRAW' 提现单
}) => new Promise<TransactionDetailData>((resolve, reject) => {
  request.get(`/api/bwoilSvr/order/flow/fuelOrderDetail/${data.orderId}`, data).then((res) => {
    resolve(res.data || {})
  }).catch(error => {
    reject(error)
  })
})
/**
 * 领取立返金
 */
export const ReceiveCashback = (data: {
  orderNo: string,
  tradeType: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/order/flow/receiveCashBack', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
