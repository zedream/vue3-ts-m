type GotoType = 'links' |
  'personalHubPageH5' |
  'refuelingListPageH5' |
  'rechargePageH5' |
  'home' |
  'openAccount' |
  'RedEnvelope' |
  ''
interface BdProductListData {
  productName: string
  typeBn: string
}
interface BuyTopConfigData {
  buyTopImg: string
  adJumpusage: GotoType
  sortNo: string
  ruleImg: string
  checkParticipate?: boolean
}
interface ProductTypeMapData {
  firstGiftAmount: string
  recommendMoney: string
}
interface StationRotationData {
  gotoType: GotoType
  image: string
  skipUrl: string
  sortNo: string
  checkParticipate?: boolean
}
interface ExtraJsonData {
  activityImageMid: string
  activityImageMidLinkUrl: string
  gotoType: GotoType
  imageMid: string
  isParticipantNoLimit: boolean
}
/**
 * 渠道活动配置
 */
interface ActivityConfigData {
  activityName: string
  amountReceivedTip: string
  bdProductList: BdProductListData[]
  buyChannel: string
  buyPageImageTop: string
  buyTopConfig: BuyTopConfigData[]
  commonPic: string
  downloadAppFlag: number
  downloadInfo: {
    bgImage1: string
    bgImage2: string
    bgImage3: string
  }
  enable: number
  errorMsg: string
  extraJson: ExtraJsonData
  firstGiveMoney: number
  gotoType: string
  guide: {
    buyResultBanner: string
    skipUrl: string
  }
  guideFlag: number
  h5BuyCardUrl: string
  hasBuyUsers: number
  imageDown: string
  imageTop: string
  memberMsgFlag: number
  mpFlag: string
  payWayWXSort: number
  payWayYLSort: number
  payWayZFBSort: number
  pcode: string
  productType: string[]
  productTypeMap: ProductTypeMapData[]
  qualificationFlag: number
  redirect: string
  refuelGiftTip: string
  ruleImgId: string
  showCommonPic: string
  stationRotation: StationRotationData[]
  stationRotationFlag: number
  subsidyShow: null
  subsidyTimeshow: string
  telephoneFlag: string
  wechatAppFlag: number
}
/**
 * 活动参与
 */
interface listBuyTopRspsData {
  checkH5BuyTopPicParticipant: boolean
  h5SortNo: string
}
interface listRspsData {
  checkParticipantH5: boolean
  image: string
}
interface ParticipateData {
  checkMobileWhiteList: boolean
  checkParticipantMini: boolean
  listBuyTopRsps: listBuyTopRspsData[]
  listRsps: listRspsData[]
}

interface CheckActivityLoginData {
  countUser: null | string
  loginCheck: boolean
}

type OriginView = 'personalHubPageApp' | 'rechargePageApp' | 'refuelingListPageApp' | 'verifiedPageApp' | null
type NewMemberStatus = 0 | 1 | 2 | 3 | 4
interface NewbieTaskData {
  imageUrl: string
  redirectUrl: string | null
  newMemberStatus: NewMemberStatus
  originView: OriginView
}

interface ActivityMultiplePopupData {
  redirectUrl: string | null
  imageUrl: string
  sort: number
  originView: OriginView
}
