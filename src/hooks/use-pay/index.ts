import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesPay } from '@/types/storage.types'
import router from '@/router'
import { GeneratePayOrder, GenerateRefuelPayOrder, GetWXUserInfo, GetWXOAuthUrl } from '@/api/pay'
import { platform } from '@/utils/utils'

type ReturnParam = GenerateOrderParams | WXGenerateOrderParams

const StrategyPay = {
  UNIONPAY: function (arg) {
    Storage.Session.set(StorageTypesPay.APP_UNION_WAP_URL_SESSION, arg.url, StorageExpire.Hour)
    Storage.Session.set(StorageTypesPay.APP_UNION_WAP_PARAMS_MAP_SESSION, arg.params, StorageExpire.Hour)
    router.push('/unionPay/wapPay')
  },
  ALI: function (arg) {
    window.location.href = arg.url
  },
  WX: function () {
    console.log('Wechat pay')
  }
}

export const usePay = (
  type: 'recharge' | 'refuel'
) => {
  const route = useRoute()
  const instance = getCurrentInstance()

  const orderNo = route.query?.orderNo
  const orderAmount = ref('0.00')
  const payAmount = ref('0.00')
  const productName = ref('')
  const payCode = ref('')

  function handlePay () {
    if (payCode.value) {
      if (formatParams()) {
        instance?.proxy?.$toast.loading({
          forbidClick: true,
          duration: 0
        })
        if (type === 'recharge') {
          GeneratePayOrder(formatParams()).then(data => {
            instance?.proxy?.$toast.clear()
            payRoute(payCode.value, {
              url: data.credential.redirectUrl,
              params: data.credential.postParamMap
            })
          }).catch(error => {
            instance?.proxy?.$toast.clear()
            instance?.proxy?.$notify({ type: 'danger', message: error })
          })
        } else if (type === 'refuel') {
          GenerateRefuelPayOrder(formatParams() as GenerateOrderParams).then(data => {
            instance?.proxy?.$toast.clear()
            payRoute(payCode.value, {
              url: data.credential.redirectUrl,
              params: data.credential.postParamMap
            })
          }).catch(error => {
            instance?.proxy?.$toast.clear()
            instance?.proxy?.$notify({ type: 'danger', message: error })
          })
        }
      }
    } else {
      instance?.proxy?.$toast('请选择支付方式')
    }
  }

  function formatParams (): ReturnParam | 0 {
    const params = {
      frontUrl: decodeURIComponent(location.href),
      method: payCode.value,
      orderAmount: orderAmount.value,
      orderNo: orderNo,
      payAmount: payAmount.value,
      payVersion: 'v2',
      productName: productName.value
    } as ReturnParam
    switch (payCode.value) {
      case 'UNIONPAY':
        Object.assign(params, {
          payWay: 'UNION_H5'
        })
        break
      case 'WX':
        // GetWXUserInfo({
        //   weChatType: 'WECHAT_PAY',
        //   code: 'WX'
        // }).then(data => {
        //
        // })
        // GetWXOAuthUrl({
        //   weChatType: 'WECHAT_PAY',
        //   redirectUri: encodeURIComponent(window.location.href),
        //   authType: 'base'
        // }).then(data => {
        //   window.location.href = data.url
        // })
        Object.assign(params, {
          method: platform.WeChat() ? 'WX_PUB' : 'WX_WAP',
          appId: 'wx1b3ac33d68eaeac5',
          bankId: '',
          openId: '',
          payWay: 'WX_WAP'
        })
        break
      case 'ALI':
        Object.assign(params, {
          payWay: 'ALI_WAP'
        })
        break
      case 'XIB':
      case 'BCM':
        router.push({
          path: '/pay/verifyCode',
          query: {
            orderNo
          }
        })
        return 0
      default:
        break
    }
    return params
  }

  function payRoute (code, arg) {
    return StrategyPay[code](arg)
  }

  return {
    orderAmount,
    payAmount,
    payCode,
    productName,
    handlePay
  }
}
