import request from '@/request'
/**
 * 获取用户分销代理资格
 */
export const GetAgentQualification = () => new Promise<AgentQualificationData>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/distribute/agentQualification').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取分销商信息
 */
export const GetAgentInfo = () => new Promise<AgentInfoData>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/commission/getAgentIncomeSummary').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取分销商推广信息
 */
export const GetAgentSpreadInfo = () => new Promise<AgentSpreadInfoData>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/member/getShareInfo').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取成员数量
 */
export const GetSpreadMemberCount = () => new Promise<SpreadMemberCountData>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/member/getAgentTeamSummary').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取成员列表
 */
export const GetSpreadMemberList = (data: {
  page: number,
  pageSize: number
}) => new Promise<SpreadPageData<SpreadMemberListData>>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/member/getAgentTeamMemberList', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取成员详情
 */
export const GetSpreadMemberDetail = (data: string) => new Promise<SpreadMemberDetailData>((resolve, reject) => {
  request.get(`/api/bwoilSvr/channel/member/getAgentTeamMemberInfo/${data}`).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取成员贡献列表
 */
export const GetSpreadMemberContributeList = (data: {
  page: number,
  pageSize: number,
  contributorMemberId: string
}) => new Promise<SpreadPageData<SpreadMemberContributeListData>>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/member/getAgentTeamMemberContributeList', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取佣金比例
 * 佣金比例字段 commissions 用数组返回就很奇怪
 */
export const GetCommissionRatio = (data: string) => new Promise<CommissionRatioData>((resolve, reject) => {
  request.post('/api/bwoilSvr/channel/distribute/getAgentAllotconf', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 设置下级分销队长
 */
export const GrantCaptain = (data) => new Promise<void>((resolve, reject) => {
  request.post('/api/bwoilSvr/channel/distribute/grantAgentQualification', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取收入明细列表
 */
export const GetIncomeList = (data: {
  page: number,
  pageSize: number
}) => new Promise<SpreadPageData<IncomeListData>>((resolve, reject) => {
  request.get('/api/bwoilSvr/channel/commission/getIncomeRecord', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
