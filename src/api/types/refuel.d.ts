interface DataListData {
  addr: string
  afterCashBackPrice: string
  area: string
  bestOffer: null
  bwoilPrice: string
  chinaMainland: number
  closest: null
  coorpCashBackText: string
  currencyCode: string
  discountAmount: string
  discountAmt: number
  discountPrice: number
  discountText: string
  distance: string
  distanceText: string | null
  economizeLabel: string[]
  gangaolabel: string
  hasLastBuy: boolean
  hzType: string
  iconUrl: string | null
  img: string
  imgSelected: string
  isAddOil: boolean
  isCommon: boolean
  isOverRange: boolean
  isSupportDiesel: boolean
  labelList: string
  latitude: string | number
  longitude: string | number
  nationalPrice: string | number
  navigateDistance: string | number
  oilId: number
  oilName: string
  oilPrice: string
  oilSimpleName: string
  priceCutText: string | null
  radioText: string
  rebateFullText: string
  rebateScaleText: string
  refuelRebateText: string
  saleOilPrice: number
  showDiscountLabel: boolean
  smartlabel: string
  standardPrice: string
  stationBackRatio: null
  stationId: number
  stationName: string
  stationSubsidy: null
  stationSubsidyCopywriting: boolean
  syxStatus: string
  type: number
}

interface OilTypeData {
  isDefault: number
  isSelect: number
  oilId: number
  oilName: string
  oilNum: string
}

interface BrandFiltersData {
  brandId: string
  filter: string[]
  img: string
  imgSelected: string
  isSelected: boolean
  name: string
}

interface OilFilterGroupData {
  chai: OilTypeData[]
  qi: OilTypeData[]
}

interface RuleFiltersData {
  data: string
  isAll: number
  isDefault: number
  ruleText: string
}

interface FiltersData {
  brandFilters: BrandFiltersData[]
  currentOilId: number
  oilFilterGroup: OilFilterGroupData
  oilFilters: OilTypeData[]
  ruleFilters: RuleFiltersData[]
}
/**
 * 油站列表
 */
interface StationListData {
  dataList: DataListData[]
  filters: FiltersData
  jyPhotoDownUrl: string
  jyPhotoUpUrl: string
}
/**
 * 加油轮播列表
 */
interface RefuelCarouselListData {
  dataList: string[]
  totalSaveAmount: number
}
interface PetrolStationDetailData {
  addr: string
  area: string
  cooperationTips: null
  currencyCode: string
  discountPrice: string
  distance: string
  goToText: string
  hzType: string | null
  latitude: number | string
  longitude: number | string
  maxRebateRate: string
  minMoneyLimit: number
  oilId: number
  popEdgeDistance: number
  popTips: string
  rebateAmountText: string
  rebateMoneyText: string
  rebateRate: string
  rebateRateText: string
  rebateTip: string
  rebateTitle: string
  rechargeSaleText: string
  rechargeText: string
  rechargeTitle: string
  stationId: number
  stationImageUrl: string
  stationName: string
  stationSubsidy: null
  stationSubsidyCopywriting: null
  type: number
  typeBn: string
  webankStatus: number
}
interface PetrolStationOilsData {
  afterCashBackPrice: null
  bwoilOilPrice: null
  bwoilPrice: null
  discountPrice: null
  discountText: null
  economizeLabel: null
  gunList: string[]
  marketPrice: null
  oilId: number
  oilName: string
  oilPrice: string
  price: null
  radioText: null
  radioTextList: null
  sort: number
  standradPrice: null
  subsidyCopywriting: null
}
/**
 * 油站详情
 */
interface PetrolStationData {
  detail: PetrolStationDetailData
  lat: string | null
  lon: string | null
  oils: PetrolStationOilsData[]
}

interface QuickAmountData {
  discountAmount: string
  literNumber: string
  orderAmount: string
  payAmount: string
}

interface GenerateRefuelOrderData {
  accountBalance: number
  bankName: string
  bankNo: string
  bankProxy: null
  canContinuePay: boolean
  canRefund: boolean
  canReimburse: boolean
  cancelTime: string | null
  cashBackReceiveStatus: string | null
  cashierUrlParams: string | null
  channelId: string
  channelName: string
  createDateStr: string
  createTime: string
  createTimestamp: string
  deleteFlag: null
  extendJson: null
  gunName: string | null
  hzType: string | null
  id: string
  lat: string
  literNum: string | number | null
  lng: string
  matchedConsumedNo: string | null
  memberId: number
  merchantId: string | number | null
  mobile: string
  noCashBackReason: string | null
  oilId: number | null
  oilName: string | null
  orderAmount: number | null
  orderNo: string
  orderStatus: string
  payAmount: string | number | null
  payByThirdBank: string | null
  payStatus: string
  payStatusStr: string
  payTime: string | null
  payWay: string | null
  redEnvelopAmount: string | number | null
  redEnvelopReceiveStatus: string | number | null
  reduceAmount: string | number | null
  refuelcorpOrderAuditInfo: string | null
  refuelcorpOrderInfo: string | null
  refundInfo: string | null
  remainingTime: string
  remark: string | null
  stationAddress: string
  stationId: string
  stationName: string
  stationType: string
  stationTypeStr: string
  thirdOrderNo: string
  totalSaveAmount: string
  updateTime: string
  vipReduceAmount: string | number
}

interface SuggestionListData {
  address: string
  chinaMainland: number
  cooperationType: string | number | null
  distance: number
  hzType: number | null
  id: number | null
  latitude: number
  longitude: number
  mainland: boolean
  name: string
  stationType: number | null
  type: number
  wordCount: number
}
interface SearchSuggestionData {
  items: SuggestionListData[]
  refresh: boolean
}

interface SearchResultData {
  a: number
}
