interface ProductsData {
  amount: string
  discount: string
  giveMoney: string
  giveMoneyTotal: string
  giveMoneyTotalH5: string
  giveMoreMoney: 0
  giveRate: string
  label: string
  period: string
  periods: []
  ruleId: number
  unit: string
  useSelect: boolean
  discountAmount?: number
}
interface PromotionInfo {
  a: number
}

interface RefuelCardData {
  allowBuyeTime: string
  allowBuysTime: string
  allowSale: string
  buyMaxNum: number
  cardType: string
  cashSafe: string
  comparedUrl: string
  defaultPrice: number
  descApp: string
  detail: string
  detailFull: string
  detailUrl: string
  discountDescHeadImg: string
  discountDescImg: string
  discountDescbodyImg: string
  example: string
  exchangeUrl: string
  firstBuyGiftAmount: number
  firstBuyGiftTip: string
  giveRate: number
  grade: string
  gradeTip: string
  gradeUrl: string
  importantnote: string
  isFirstBuyGiftMember: boolean
  issetFirstBuyGiftAmount: boolean
  label: string
  name: string
  oilPrice: string
  paymentList: PromotionInfo
  percentDesc: string
  price: number
  productId: number
  products: ProductsData[]
  promotionInfo: PromotionInfo
  referenceOilText: string
  ruleId: number
  ruleInfo: PromotionInfo
  saleInfo: PromotionInfo
  storeNum: number
  topBanner: string
  typeBn: string
  typeDesc: string
  typeId: number
  webankAccountStatus: string
}
