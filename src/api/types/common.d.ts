interface PageData<T> {
  current?: number
  items?: T[]
  dataList?: T[]
  pageSize?: number
  pageTotal?: number
  total?: number
}

interface SpreadPageData<T> extends PageData {
  orders: []
  searchCount: boolean
  size: number
  pages: number
  records: T[]
}

interface AgreementData {
  author: string
  content: string
  id: number
  pubTime: number
  title: string
}
interface AboutUsListData {
  content: string
  gotoType: string
  headLine: string
  listTitle: string
  mainTitle: string
  sort: number
  subTitle: string
  thumbnail: string
}
interface AboutUsData {
  dataList: AboutUsListData[]
}

interface BankInfoData {
  bankName: string
  bankType: string
  cardNo: string
  cardType: string
  smallLogo: string | null
  wholeCardNo: string
}
interface PaymentData {
  bankTip: string | null
  cashBackTip: string | null
  code: string
  guideUrl: string | null
  hasBind: boolean
  iconUrl: string
  recommended: boolean
  showRecommendationIcon: boolean
  title: string
  wxAppId: string | null
  wxMiniAppId: string | null
  wxMiniPath: string | null
}
interface PaymentListData {
  bankInfo: BankInfoData
  bindTip: string
  dataList: PaymentData[]
  hasOpenAcct: string
  userRate: string
}

interface NoviceStateData {
  activateFlag: boolean
  bindInPayway: boolean
  certified: boolean
  finished: boolean
  hasBuyOil: boolean
  hasCashBack: boolean
  hasRecharge: boolean
  hasRedEnvelope: boolean
}

interface ServiceTabsData {
  link_url: string
  title: string
}
interface ServiceTabsListData {
  dataList: ServiceTabsData[]
}

interface ServiceQAListData {
  author: string
  content: string
  id: number
  pubTime: number
  thumbnail: string
  title: string
}

interface AllowanceData {
  acquireCondition: number
  acquireConditionStr: string
  acquireTime: number
  grantNo: string
  grantStatus: null
  invalidTime: number
  oriStatus: number
  redEnvelopeAmount: number
  redEnvelopeAmountStr: string
  redEnvelopeId: number
  status: string
  taskName: string
  validDays: number
  showDesc?: boolean
}
