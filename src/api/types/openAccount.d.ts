/**
 * 银行路由规则
 */
type BankType = 'BCM' | 'XIB' | 'CITIC'
interface BankRouteRuleData {
  bankModel: 0 | 1 // 0: 先充值 1: 先开户
  bankName: string
  bankProxyName: string
  bankProxyType: string
  bankType: BankType
  combineType: string
  nextBank: null | string
  nextBankList: null | string
}

interface CheckSupportiveBankData {
  bankInfo: {
    name: string
    typeName: null | string
    type: string
  } | null
  bankUrl: string | null
  bindBankSupportConf: string | null
  errorMsg: string
  status: boolean
}

interface OpenAccountData {
  accountSerialNo: string,
  cardNo: string,
  successDesc: string,
  accountStatus: string,
  activateFlag: boolean,
  needBCMActivationProcess: boolean
}
