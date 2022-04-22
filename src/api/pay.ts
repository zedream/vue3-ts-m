import request from '@/request'
import router from '@/router'
import { store } from '@/store'
import { UserType } from '@/store/mutation.types'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
/**
 * 获取银联付款码协议
 */
export const GetUnionPayAgreement = () => new Promise<AgreementData>((resolve, reject) => {
  request.get('/api/operation/article/detail?id=2281').then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取银联绑卡验证码
 */
export const GetUnionPayBindCode = (data: {
  phone: string,
  payPassword: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdPayway/bindCardRequest', data).then((res) => {
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
 * 银联云闪付绑卡
 */
export const BindUnionPayByCode = (data: {
  smsCode: string
}) => new Promise<BindUnionPayResultData>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdPayway/smsVerification', data).then((res) => {
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
 * 获取银联付款码数字码
 */
export const GetUnionPayCodeNumber = (data: {
  deviceId: string
  orderNo: string
}) => new Promise<UnionPayCodeNumberData>((resolve, reject) => {
  request.get('/api/bwoilSvr/payments/trade/thirdPayway/getOrderQrcode', data).then((res) => {
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
 * 查询银联支付结果
 */
export const GetUnionPayResult = (data: {
  payOrderNo: string
}) => new Promise<ResponseData>((resolve, reject) => {
  request.get('/api/bwoilSvr/payments/trade/thirdPayway/getQrcodePayResult', data).then((res) => {
    if (res.status === 10000) {
      resolve(res)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取支付方式列表
 */
export const GetPayWayList = (data: {
  payType: string
  pcode: string
}) => new Promise<PayWayListData[]>((resolve, reject) => {
  request.get('/api/member/order/paymentList', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data.dataList)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 下单
 */
export const PlaceOrder = (data: {
  pcode: string
  period: string
  productId: number
  qty: 1,
  realPayAmount: string
  ruleDetailId: number
  totalAmount: string
}) => new Promise<PlaceOrderData>((resolve, reject) => {
  request.post('/api/member/order/place', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else if (res.status === 90000) {
      Toast.clear()
      store.commit(`user/${UserType.CLEAR_AUTH}`)
      router.push('/login')
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取订单详情
 * 里面的payment字段可以获取支付方式
 */
export const GetPayOrderDetail = (data: {
  typeBn?: string
  pcode: string
}, orderNo: string) => new Promise<PayOrderDetailData>((resolve, reject) => {
  request.get(`/api/member/order/confirmPay/${orderNo}`, data).then((res) => {
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
 * 生成充值支付订单 ？
 */
export const GeneratePayOrder = data => new Promise<GeneratePayOrderData>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/bankProxy/generateOrder', data).then((res) => {
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
 * 合作油站生成支付单
 */
export const GenerateRefuelPayOrder = (data: GenerateOrderParams) => new Promise<GeneratePayOrderData>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/bankProxy/generateFuelOrder', data).then((res) => {
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
 * 通过微信授权获取的code值获取用户的openid和token
 */
export const GetWXUserInfo = (data: {
  weChatType: 'WECHAT_PAY'
  code: string
}) => new Promise<WXUserInfoData>((resolve, reject) => {
  request.post('/api/oauth/wechat/getOpenIdInfo', data).then((res) => {
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
 * 通过微信授权获取的code值获取用户的openid和token
 */
export const GetWXOAuthUrl = (data: {
  weChatType: 'WECHAT_PAY'
  redirectUri: string
  authType: 'base' | 'userinfo'
}) => new Promise<{ url: string }>((resolve, reject) => {
  let api = '/api/oauth/wechat/toAuth' // userinfo
  if (data.authType === 'base') {
    api = '/api/oauth/wechat/toBase'
  }
  request.post(api, data).then((res) => {
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
 * 验证码（快捷支付）支付发送短信
 */
export const GetVerifyPayCode = (data: {
  amount: string
  idCardNo: string
  mobile: string
  orderNo: string
  type: string
  userName: string
}) => new Promise<VerifyPayCodeData>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdBank/sendMessage', data).then((res) => {
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
 * 验证码（快捷支付）支付发送短信
 */
export const VerifyCodePay = (data: {
  amount: string
  mobileCode: string
  orderNo: string
  payCardNo: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdBank/recharge', data).then((res) => {
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
 * 获取微信签名
 */
export const GetWXJsSDK = () => {
  request.get('/api/bwoilSvr/member/weixin/wechatJSSDK', {
    weChatType: 'WECHAT_APP',
    url: window.location.href
  }).then((res) => {
    if (res.status === 10000) {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'checkJsApi', 'scanQRCode', 'chooseImage', 'previewImage'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表
      })
      wx.ready(function () {
        console.log('ready')
      })
      wx.error(function (res) {
        console.log('err', res)
      })
    } else {
      console.log(res.info)
    }
  }).catch(() => {
    return 0
  })
}
/**
 * 银联付款码找回密码身份证验证
 */
export const CheckIDCard = (data: {
  idCard: string
}) => new Promise<{ result: boolean }>((resolve, reject) => {
  request.get('/api/bwoilSvr/payments/trade/thirdPayway/checkIdCard', data).then((res) => {
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
 * 银联付款码找回密码发送短信
 */
export const SendSms = (data: {
  mobile: string | number
  type: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdPayway/sendSms', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 银联付款码找回密码验证短信
 */
export const CheckSms = (data: {
  mobile: string
  type: string
  vcode: string
}) => new Promise<void>((resolve, reject) => {
  const query = new URLSearchParams(data).toString()
  request.post(`/api/bwoilSvr/member/verifySmsCode?${query}`, {}).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 银联付款码更新支付密码
 */
export const UpdatePayPassword = (data: {
  payPassword: string
}) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdPayway/updatePassword', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 银联付款码密码支付结果校验
 */
export const ValidatePayPassword = (data: {
  payOrderNo: string
  payPassword: string
}) => new Promise<{ result: boolean }>((resolve, reject) => {
  request.post('/api/bwoilSvr/payments/trade/thirdPayway/validate', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
