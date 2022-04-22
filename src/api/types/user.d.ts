interface MemberBankInfoData {
  bankIcon: string
  bankName: string
  bankType: string
  bindFirstCardNo: string
  bindInPayWay: string[]
  certifyStatus: number
  certifyTime: number
  channelId: number
  channelName: string
  enableBindPayWay: boolean
  firstCardName: string
  idCardNo: string
  memberCode: string
  mobile: string
  registerMobile: string
  secondCardNo: string
  thirdCardNo: string
  userName: string
}
interface RouteData {
  bankModel: number
  bankName: string
  bankProxyName: string
  bankProxyType: string
  bankType: string
  combineType: string
  nextBank: string | null
  nextBankList: string | null
}

interface MemberInfoData {
  activateFlag: boolean
  activeUrl: string
  activitySource: string | null
  availableAmount: string
  bankAmount: string
  bankCardFlag: number
  bankInfo: MemberBankInfoData
  bindInPayWay: string | null
  carOwnerType: string
  cardAvailableAmount: string
  cardNo: string | null
  cashBackAmount: string
  cashBackRate: number
  certified: boolean
  city: string
  freezeAmount: string | null
  grade: MemberLevel
  gradeDesc: string
  guideUrl: string
  hasCashBack: boolean
  hasConsumed: boolean
  hasFqlRecharge: boolean
  hasRecharge: boolean
  lastMonthCashBackAmount: string
  maxSupportAmount: number
  medalType: string | null
  minRefuelAmount: number
  myCardDesc: string
  needUpgrade: boolean
  novicePageUrl: string
  novicePictureUrl: string
  oilBnName: string
  popEdgeDistance: number
  promotionFlag: boolean
  protocolUrl: string
  province: string
  redEnvelopeAmount: number
  route: RouteData
  systemAmount: string | null
  totalCashBackAmount: string
  totalConsumedAmount: string
  totalFuelAmount: number
  totalFuelLiter: string
  unReceiveCashAmount: string
  unReceiveFuelCount: number
  unReceiveRedEnvelopeAmount: string
  upgradePopUrl: string
  upgradeUrl: string
  userFlag: string
  vipConsumedAmount: string
  wechatOpid: string | null
  withdrawalAmount: string | null
}

interface SignInData {
  account: string
  csrfToken: string | null
  firstGiftFlag: boolean
  memberBn: string
  memberId: number
  mobile: string
  opType: string
  token: string
}

interface CheckUserAuthInfoData {
  authResult: 'Y' | 'N'
  mchuid: string
  memberId: number | string
  mobile: string
  pcode: string
  token: string
}

interface SilentLoginData {
  authResult: string
  memberId: number | string
  mobile: string
  token: string
}

interface TongLianInfoData {
  acctLevel: string
  bankNo: string
  boscAcct: string | null
  guideUrl: string
  h5TongLianActLv1LimitAmt: number
  hasOpenAccount: boolean
  idNo: string | null
  mobile: string
  nextStatus: string
  realName: string
  status: string
  tongLianBanksUrl: string
  tongLianPayLimitUrl: string
  updateAcctResult: string
  usedAmount: number
  yearLimitAmount: number
}
interface AccountInfoData {
  account: string
  avatarUrl: string | null
  bankCardNo: string | null
  bankCardNoFull: string | null
  bdShowMember: string | null
  cooperationUrl: string
  countryCode: string
  createTime: number
  downloadAppFlag: string | null
  email: string | null
  fuelCard: string | null
  hasBuyV5: boolean
  identityNumber: string
  identityNumberFull: string | null
  insuranceInfo: string | null
  inviteUrl: string | null
  lastLoginTime: string | null
  memberBn: string
  memberId: number | string
  mobile: string
  mobileFull: string
  nickName: string
  noticeInfo: string | null
  openId: string | null
  realNameAuth: boolean
  rechargeOpen: boolean
  showBindingCard: boolean
  tongLianInfo: TongLianInfoData
  tradePwdAuth: boolean
  trueName: string
  trueNameFull: string | null
  yunAcctFlag: string
}
