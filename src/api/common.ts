import request from '@/request'
/**
 * 获取协议
 */
export const GetAgreement = data => new Promise<AgreementData>((resolve, reject) => {
  request.get(`/api/operation/article/detailByTitleCode/${data}`).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取关于云油
 */
export const GetAboutUs = () => new Promise<AboutUsData>((resolve, reject) => {
  request.get('/api/operation/common/brandList').then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取支付方式列表
 */
export const GetPaymentList = () => new Promise<PaymentListData>((resolve, reject) => {
  request.get('/api/bwoilSvr/member/getFuelPayWayList').then((res) => {
    resolve(res.data || [])
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取用户新手任务状态
 */
export const GetNoviceState = () => new Promise<NoviceStateData>((resolve, reject) => {
  request.get('/api/bwoilSvr/member/redenvelope/getNoviceTaskInfo').then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取客服中心tab栏
 */
export const GetServiceTabs = () => new Promise<ServiceTabsListData>((resolve, reject) => {
  request.get('/api/operation/article/getUserHelp').then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取客服中心tab栏下的问题列表
 */
export const GetServiceQAList = data => new Promise<PageData<ServiceQAListData>>((resolve, reject) => {
  request.get('/api/operation/article/listByType', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      resolve({
        current: 1,
        dataList: [],
        pageTotal: 0
      })
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 检查兑换码
 */
export const CheckVoucherCode = data => new Promise<void>((resolve, reject) => {
  request.post('/api/Operation/jd/checkCode', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 发送京东兑换码短信
 */
export const GetJDVoucherSmsCode = data => new Promise<void>((resolve, reject) => {
  request.post('/api/Operation/jd/sendCode', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 京东兑换码兑换
 */
export const ExchangeJDVoucher = data => new Promise<void>((resolve, reject) => {
  request.post('/api/Operation/jd/exchange', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取加油补贴列表
 */
export const GetAllowanceList = (data?: {
  statusList: string // 1 | 1,2,3  0-老用户 1-待发放 2-待解锁 3-待领取 4-已领取 5-已过期
}) => new Promise<AllowanceData[]>((resolve, reject) => {
  request.get('/api/bwoilSvr/member/redenvelope/getUserRedEnvelope', data).then((res) => {
    resolve(res.data || [])
  }).catch(error => {
    reject(error)
  })
})
/**
 * 领取红包
 */
export const ReceiveAllowance = data => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/member/redenvelope/withdrawnRedEnvelope', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取红包详情
 */
export const GetRedEnvelopeDetail = data => new Promise<AllowanceData>((resolve, reject) => {
  request.get(`/api/bwoilSvr/member/redenvelope/getRedEnvelopeDetail/${data}`).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
