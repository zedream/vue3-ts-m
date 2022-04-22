type MemberLevel = '' | 'normal' | 'gold' | 'platinum'

type LoginType = 0 | 1

type BankRoute = ['BCM', 'XIB', 'CITIC']

interface MemberInfoResult {
  activateFlag: boolean
  bankInfo: MemberBankInfoData
  certified: boolean
  bankAmount: string
  availableAmount: string
}
