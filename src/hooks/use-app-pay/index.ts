import { GenerateRefuelOrder, UpdateOrderPayWay } from '@/api/refuel'
import { store } from '@/store'
import { useMemberInfo } from '@/hooks'
import { GetWXJsSDK } from '@/api/pay'
import { platform } from '@/utils/utils'
import router from '@/router'

enum Payment {
  Ali = 'ali',
  WX = 'wechat',
  Union = 'yeepay'
}

export const useAppPay = (
  stationName?: string
) => {
  const instance = getCurrentInstance()

  const showTip = ref(false)
  const canDo = ref(true)
  const payment = ref('')
  const orderNo = ref('')
  const mpPath = ref(`page2/pages/gasStation/wxCodePay/wxCodePay.html?token=${store.state.user.token}`)
  const memberInfo = reactive<MemberInfoResult>({} as MemberInfoResult)

  useMemberInfo().then(result => {
    Object.assign(memberInfo, result)
  })

  if (platform.WeChat()) {
    GetWXJsSDK()
  }

  const handleToPay = debounce(function (event, id?: string | number, name?: string, type?: number) {
    instance?.proxy?.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    canDo.value = false
    if (orderNo.value) {
      updatePayWay(orderNo.value).then(() => {
        handleStartPay()
        console.log('生成订单成功并已更新支付方式')
      })
    } else {
      generateRefuelOrder(id, name, type).then(orderNo => {
        updatePayWay(orderNo).then(() => {
          handleStartPay()
          console.log('生成订单成功并已更新支付方式')
        })
      })
    }
  }, 200, { leading: true })

  function handlePaymentChange (code) {
    payment.value = code
  }

  function handleStartPay () {
    if (payment.value === Payment.Ali) {
      canDo.value = true
      showTip.value = true
      window.location.href = 'alipayqr://platformapi/startapp?appId=20000056'
    } else if (payment.value === Payment.WX) {
      canDo.value = true
      showTip.value = true
      window.location.href = 'weixin://'
    } else if (payment.value === Payment.Union) {
      router.push({
        path: '/unionPay/pay',
        query: {
          stationName,
          orderNo: orderNo.value
        }
      })
    }
  }

  function generateRefuelOrder (stationId?: string | number, stationName?: string, stationType?: number) {
    return new Promise<string>(resolve => {
      GenerateRefuelOrder({
        lat: store.state.common.latitude,
        lng: store.state.common.longitude,
        memberId: store.state.user.memberId,
        orderStatus: 'dealing',
        payStatus: 'un_pay',
        stationId,
        stationName,
        stationType
      }).then(data => {
        orderNo.value = data.orderNo
        resolve(data.orderNo)
      }).catch(error => {
        instance?.proxy?.$notify({ type: 'danger', message: '创建订单失败' })
        console.error('创建订单失败： ', error)
      })
    })
  }

  function updatePayWay (orderNo) {
    return new Promise<void>(resolve => {
      UpdateOrderPayWay({
        orderNo,
        payWay: payment.value
      }).then(() => {
        resolve()
      }).catch(error => {
        console.error('更新支付方式失败： ', error)
      })
    })
  }

  return {
    showTip,
    canDo,
    payment,
    orderNo,
    mpPath,
    memberInfo,
    handleToPay,
    handlePaymentChange,
    handleStartPay,
    generateRefuelOrder,
    updatePayWay
  }
}
