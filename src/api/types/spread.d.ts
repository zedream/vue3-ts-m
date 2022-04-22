type MemberType = 2 | 3 // 2 队长 3 队员
type GrantStatus = 0 | 1

interface AgentQualificationData {
  agentLevel: number
  grantStatus: GrantStatus
  grantTime: string
  inviteCode: string
  lockStatus: number
  parentId: string
}

interface AgentInfoData {
  forWithdrawalAmount: string
  phone: string
  totalRewardAmount: string
  withdrawnAmount: string
}

interface AgentSpreadInfoData {
  copyWriting: string
  domainUrl: string
  inviteCode: string
  pcode: string
}

interface SpreadMemberCountData {
  captainCount: number
  memberCount: number
  memberType: MemberType
  totalCount: number
}

interface SpreadMemberListData {
  agentName: string
  channelId: string
  grantStatus: GrantStatus
  incomeMonth: string
  lockstatus: number
  memberId: string
  memberPhone: string
  memberType: MemberType
  regTime: string
}

interface SpreadMemberDetailData {
  contributeIncomeMonth: string
  contributeIncomeTotal: string
  memberType: MemberType
  phone: string
  regTime: string
  totalNumber: number
}

interface SpreadMemberContributeListData {
  contributorType: number
  fuelAmount: string
  fuelNo: string
  fuelTime: string
  incomeAmount: string
  stationName: string | null
}

interface CommissionsData {
  id: number
  proportion: string
  threshold: string
}
interface CommissionRatioData {
  agentMobile: string
  commissions: CommissionsData[]
}

interface IncomeListData {
  contributeTime: string
  contributorPhone: string
  contributorType: string | null
  fuelNo: string
  incomeAmount: string
}
