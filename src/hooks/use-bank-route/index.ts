import { GetBankRouteRule } from '@/api/openAccount'
import router from '@/router'

export const useBankRoute = (proxy) => {
  const bankRoutes: BankRoute = ['BCM', 'XIB', 'CITIC']

  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  GetBankRouteRule().then(data => {
    if (bankRoutes.includes(data.bankType)) {
      router.push(`/openAccount/${data.bankType.toLowerCase()}`)
    } else {
      proxy.$toast('未知的银行路由规则')
    }
  })
}
