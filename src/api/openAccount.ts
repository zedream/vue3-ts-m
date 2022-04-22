import request from '@/request'

/**
 * 获取开通三类户有效的银行列表
 */
export const GetSupportiveBanks = (data: {
  bank: string
}) => new Promise<string>((resolve, reject) => {
  request.get('/api/bwoilSvr/operation/bindBankSupportConf/getAllSupportBankName', data).then((res) => {
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
 * 获取银行路由规则
 */
export const GetBankRouteRule = () => new Promise<BankRouteRuleData>((resolve, reject) => {
  request.get('/api/bwoilSvr/payments/payRoute/bankRouteWithRule').then((res) => {
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
 * 检查是否支持改开户卡号
 */
export const CheckSupportiveBank = (data: {
  bank: BankType
  bankNo: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/member/tonglian/checkSupperBank', data).then((res) => {
    if (res.status === 10000) {
      if (res.data.status) {
        resolve()
      } else {
        reject(res.data.errorMsg)
      }
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 开通三类户
 */
export const OpenAccount = (data: {
  userName: string
  mobile: string
  idCardNo: string
  imageOrderNo?: string
  bindFirstCardNo: string
  areaName: string
  cityName: string
  district: string
  mobileCode?: string,
  combineType: string
  longitude: string | number
  latitude: string | number
  pcode: string
}) => new Promise<ResponseData>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdBank/openThirdAccount', data).then((res) => {
    if (res.status === 10000) {
      resolve(res)
    } else {
      reject(res)
    }
  }).catch(() => {
    return 0
  })
})
