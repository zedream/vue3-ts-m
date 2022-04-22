import { GetMemberInfo } from '@/api/user'

export const useMemberInfo = () => {
  return new Promise<MemberInfoResult>((resolve, reject) => {
    GetMemberInfo().then(data => {
      const result = {
        activateFlag: data.activateFlag,
        bankInfo: data.bankInfo,
        certified: data.certified,
        bankAmount: data.bankAmount,
        availableAmount: data.availableAmount
      }
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
