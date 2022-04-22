import MineIcon from 'img/tabBar/mine.png'
import MineActiveIcon from 'img/tabBar/mine-active.png'
import RefuelIcon from 'img/tabBar/refuel.png'
import RefuelActiveIcon from 'img/tabBar/refuel-active.png'
import RechargeIcon from 'img/tabBar/recharge.png'
import RechargeActiveIcon from 'img/tabBar/recharge-active.png'

export default {
  activeColor: '#1989FA',
  inactiveColor: '#646566',
  backgroundColor: '#FFFFFF',
  list: [
    {
      name: '充值',
      path: '/recharge',
      icon: RechargeIcon,
      activateIcon: RechargeActiveIcon
    },
    {
      name: '加油',
      path: '/refuel',
      icon: RefuelIcon,
      activateIcon: RefuelActiveIcon
    },
    {
      name: '我的',
      path: '/mine',
      icon: MineIcon,
      activateIcon: MineActiveIcon
    }
  ]
}
