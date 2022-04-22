import { defineComponent, h } from 'vue'
import './instructionDialog.scss'
export default defineComponent({
  setup () {
    const instance = getCurrentInstance()

    const message = () => (
      <div class="content">
        <div class="block">
          <div class="title">
            一、如何启用付款码功能
          </div>
          <div class="text">
            可通过银联绑卡界面通过短信认证方式开通银联付款码功能。
          </div>
        </div>
        <div class="block">
          <div class="title">
            二、如何使用付款码完成付款
          </div>
          <div class="text">
            进入银联付款码页面后更换您希望用于完成该笔交易的卡片，并由系统自动生成对应的付款码（包括二维码及条码）。
            <br/>
            您应向商户展示付款码，商户使用扫码枪或者摄像头扫描付款码。为保证您的资金安全，付款码每分钟会自动更新。
          </div>
        </div>
        <div class="block">
          <div class="title">
            三、付款额度
          </div>
          <div class="text">
            银联付款码采用小额免密支付方式，单笔限额为1000元。
          </div>
        </div>
      </div>
    )

    const open = () => {
      instance?.proxy?.$dialog.confirm({
        title: '使用说明',
        message: message,
        showCancelButton: false,
        confirmButtonText: '我知道了',
        messageAlign: 'left',
        confirmButtonColor: '#389BFF',
        closeOnClickOverlay: true
      })
    }

    Object.assign(instance?.proxy, { open })
    return () => null
  }
})
