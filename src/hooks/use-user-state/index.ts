import router from '@/router'

export const useUserState = (userState, proxy) => {
  // return true
  if (!userState.certified && userState.availableAmount > 0) {
    proxy.$dialog.confirm({
      title: '您无加油省钱卡',
      message: '尊敬的用户，您未开通加油省钱卡，无法完成本次充值，请先开通',
      confirmButtonText: '去开通',
      cancelButtonText: '放弃',
      confirmButtonColor: '#389BFF'
    }).then(() => {
      router.push('/openAccount')
    })
    return false
  } else if (!userState.activateFlag && userState.availableAmount > 0) {
    proxy.$dialog.confirm({
      title: '未激活省钱加油钱包',
      message: '尊敬的用户，您未激活加油省钱卡，无法完成本次充值，请先激活',
      confirmButtonText: '去激活',
      cancelButtonText: '放弃',
      confirmButtonColor: '#389BFF'
    }).then(() => {
      router.push('/openAccount')
    })
    return false
  } else {
    return true
  }
}
