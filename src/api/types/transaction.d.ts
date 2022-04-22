interface ButtonData {
  buttonTitle: string
  dataInfo: {
    refuelOrderId: string
    orderId: string
    typeBn: string | null
  }
  orderId: string
  refuelOrderId: string
  typeBn: string | null
  gotoType:'orderRefundApplyFenQiLe'
    | 'orderRefundFenQiLeProceeding'
    | 'payOrder'
    | 'cancelOrder'
    | 'cancelRefuelOrder'
    | 'orderRefundApplyNewPage'
    | 'buyOrder'
    | 'payRefuelOrder'
    | 'buyRefuelOrder'
    | 'orderRefundApplyOldPage'
  linkWebsite: string | null
}
interface TransactionListData {
  accountAmt: string
  amount: number
  buttons: ButtonData[]
  buyCardDate: null
  buyCardGiftAmount: null
  canCancelDrawbackCard: boolean
  canDrawBackCard: boolean
  cardNo: null
  cardNoTail: string
  cashBackReceiveStatus: string
  commentSeq: null
  commonCashBack: null
  createDate: string
  createTime: string
  drawbackAmount: null
  drawbackWay: null
  flowId: number
  flowVersion: string
  fuelCashBack: string
  giveAmount: null
  giveAmountText: null
  ifShangHaiPay: null
  isCashBack: boolean
  isCommented: boolean
  isShBankPay: boolean
  memberId: number
  memo: string
  memoDesc: string
  noCashBackReason: null
  orderDesc: string
  orderId: string
  orderType: string
  payStatus: string
  payStatusText: string
  payway: string
  profitAmount: number
  realAmount: string
  referenceId: string
  refuelGiftAmount: null
  remark: null
  stationInfo: null
  thirdbankPayedAmount: string
  title: string
  totalCashBack: null
  tradeType: string
  typeBn: null
}

interface TransactionDetailData {
  balance: number
  bankType: string
  cancelTime: string | null
  cardInfo: string
  cardNo: string
  cashBackAmount: number
  cashBackFlowNo: string
  cashBackReceiveStatus: string
  createTime: string
  fuelAmount: number
  fuelOrderFlowNo: string
  marchFuelOrderNo: string
  merchantName: string
  merchantNo: string
  noCashBackReason: string
  orderNo: string
  payWay: string
  receiveTime: string | null
}
