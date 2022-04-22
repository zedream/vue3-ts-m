import request from '@/request'
/**
 * 获取会员属性信息
 */
export const GetMemberInfo = () => new Promise<MemberInfoData>((resolve, reject) => {
  request.get('/api/bwoilSvr/member/queryMemberAccountInfo').then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.status)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取登录短信验证码
 */
export const GetMessageCode = data => new Promise<void>((resolve, reject) => {
  request.post('/api/common/sms/send', data).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 验证码登录/注册
 */
export const SignInByCode = data => new Promise<SignInData>((resolve, reject) => {
  request.post('/api/member/account/signin', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 退出登录
 */
export const SignOut = () => new Promise<void>((resolve, reject) => {
  request.post('/api/member/account/signout', {}).then((res) => {
    if (res.status === 10000) {
      resolve()
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
/**
 * 检测用户是否授权登录过
 */
export const CheckUserAuthInfo = (data: {
  userInfo: string,
  pcode: string
}) => new Promise<CheckUserAuthInfoData>((resolve, reject) => {
  request.post('/api/bwoilSvr/member/h5auth/checkMchUserAuthInfo', data).then((res) => {
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
 * 已授权静默登陆
 */
export const SilentLogin = (data: {
  agreeAuth: string
  mchuid: string
  mobile: string | number
  pcode: string
}) => new Promise<SilentLoginData>((resolve, reject) => {
  request.post('/api/bwoilSvr/member/h5auth/saveMchUserAuthInfo', data).then((res) => {
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
 * 获取账号信息
 */
export const GetAccountInfo = () => new Promise<AccountInfoData>((resolve, reject) => {
  request.post('/api/member/account/info', {}).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    } else {
      reject(res.info)
    }
  }).catch(error => {
    reject(error)
  })
})
