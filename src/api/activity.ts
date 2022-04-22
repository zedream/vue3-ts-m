import request from '@/request'
import { store } from '@/store'
/**
 * 主要用于获取渠道活动配置
 */
export const GetActivityConfig = data => new Promise<ActivityConfigData>((resolve, reject) => {
  request.get('/api/operation/common/getH5ActivityConfig', data).then((res) => {
    if (res.status === 10000) {
      if (res.data.errorMsg) {
        reject(res.data.errorMsg)
      } else {
        resolve(res.data)
      }
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取是否活动参与对象
 */
export const CheckParticipate = (data: {
  checkParticipantH5: string
  memberId: string | number
  pcode: string
}) => new Promise<ParticipateData>((resolve, reject) => {
  request.post('/api/bwoilSvr/operation/activity/h5/checkParticipant', data).then((res) => {
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
 * 是否能通过登录落地页登录
 */
export const CheckActivityLogin = (data: {
  mobile: string | number
  memberId: string | number
  pcode: string
}) => new Promise<CheckActivityLoginData>(resolve => {
  request.post('/api/bwoilSvr/operation/activity/h5/checkLogin', data).then((res) => {
    if (res.status === 10000) {
      resolve(res.data)
    }
  }).catch(() => {
    return 0
  })
})
/**
 * 获取新手任务
 */
export const GetNewbieTask = () => new Promise<NewbieTaskData>((resolve, reject) => {
  request.post('/api/bwoilSvr/operation/newMemberTask', {}).then((res) => {
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
 * 获取多弹窗
 */
export const GetActivityMultiplePopup = () => new Promise<ActivityMultiplePopupData[]>((resolve, reject) => {
  request.post('/api/bwoilSvr/operation/popupBox', {}).then((res) => {
    if (res.status === 10000) {
      resolve(res.data || [])
    } else {
      reject(res.info)
    }
  }).catch(() => {
    return 0
  })
})
