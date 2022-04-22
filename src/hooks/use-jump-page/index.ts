import router from '@/router'

export const useJumpPage = (gotoType, imageHyperlink) => {
  const StrategyJumpPage = {
    link: function () {
      window.location.href = imageHyperlink
    },
    personalHubPageH5: function () {
      router.replace('/mine')
    },
    refuelingListPageH5: function () {
      router.replace('/refuel')
    },
    rechargePageH5: function () {
      router.replace('/recharge')
    },
    home: function () {
      router.replace('/recharge')
    },
    openAccount: function () {
      router.push('/openAccount')
    },
    RedEnvelope: function () {
      router.push('/allowance')
    }
  }

  gotoType && StrategyJumpPage[gotoType]()
}
