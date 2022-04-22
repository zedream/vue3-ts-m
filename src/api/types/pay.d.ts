interface BindUnionPayResultData {
  result: boolean
  resultDesc: string
}

interface UnionPayCodeNumberData {
  qrCode: string
  payOrderNo: string
  orderValidTime: string
  orderDate: string
}

type Status = 'PROCESSING' | 'SUCCESS' | 'TIME_OUT' | 'FAIL' | 'CLOSE'
interface UnionPayResultData {
  orderNo: string
  payeeMerchantName: string
  realTradeAmount: string
  result: boolean
  status: Status
  validateFlag: boolean
}

interface PayWayListData {
  advance: string | null
  bankInfo: BankInfoData
  cardAdvance: string | null
  code: string
  forbiddenTip: string
  iconUrl: string
  introColorValue: string | null
  isExistTip: boolean
  isForbidden: false
  label: string | null
  labelColorValue: string | null
  limitDesc: string
  mixedTip: string
  payIntro: string
  recommended: true
  sort: number
  title: string
  typeBn: string | null
  unionActivityMinAmount: string | null
  unionActivityTitle: string | null
  wxAppId: string | null
  wxMiniAppId: string | null
  wxMiniPath: string | null
}
interface PayWayData {
  actualAmount: string | null
  balanceTotal: string | null
  dataList: PayWayListData[]
  freezeAmount: string | null
  limitTip: string
  mixed: boolean
  mixedInfo: { forzenTitle: string, forzenDesc: string }
  payLimitUrl: string
  warmTips: string
}

interface PlaceOrderData {
  accountPayAmount: number
  cpnsMoney: number
  createTime: number
  discountMoney: number
  goilMoney: number
  orderNo: string
  orderStatus: string
  productName: string
  realPayAmount: number
  reduceMoney: number
  thirdPartyPayAmount: number
  totalAmount: number
}

interface PayOrderDetailData {
  bindAlipayGuideCopy: string
  bindWechatpayGuideCopy: string
  buyChannel: string
  cancelTime: string | null
  cashBackAmount: number
  cashPlans: string | null
  channelCode: string
  chargeName: string | null
  chargeTime: string | null
  chargeTypeText: string | null
  couponMoney: string | null
  createTime: number
  discountMoney: string | null
  discountRate: string | null
  frozenMoney: number
  generalGiftAmt: string
  giveAmount: string
  giveMoreMoney: string
  goilMoney: string | null
  isActive: boolean
  isBuy: boolean
  isPay: boolean
  limitCreditPay: boolean
  markText: string | null
  memberGrade: string
  oilName: string
  oilPrice: string
  orderNo: string
  orderStatus: string
  payMethod: string | null
  payStatus: string
  payStatusText: string | null
  payTime: string | null
  payType: string
  payWayLock: string
  payment: PayWayData
  paymentName: string | null
  period: number
  periodUnit: string
  productName: string
  qty: number
  realPayAmount: string
  redpacketMoney: string | null
  reduceMoney: string | null
  refuelCardNo: string | null
  regionName: string
  totalAmount: string
  typeBn: string | null
  userRate: string
}

interface CredentialData {
  postParamMap?: string
  redirectUrl?: string
  url?: string
  appId?: string
  nonceStr?: string
  package?: string
  paySign?: string
  signType?: string
  timeStamp?: string
}
interface GeneratePayOrderData {
  credential: CredentialData
  msg: string | null
  orderNo: string
  payWay: string
  tradeStatus: string
  unionPaySdk?: unknown
}

interface WXUserInfoData {
  a?
}

interface VerifyPayCodeData {
  accountSerialNo: string
  passCodeSeq: string
  sendStatus: number
  successDesc: string
}

interface GenerateOrderParams {
  frontUrl: string
  method: string // ALI WX UNIONPAY
  orderAmount: string
  orderNo: string
  payAmount: string
  payVersion: string // v2
  payWay: string
  productName?: string
}
interface WXGenerateOrderParams extends GenerateOrderParams {
  appId: string
  bankId: string
  openId: string
}
