import { defineComponent, h } from 'vue'
export default defineComponent({
  setup () {
    const instance = getCurrentInstance()

    const message = () => (
      <div class="content">
        <p style="padding: 1vw 0">
          <span style="font-weight: 600">
            1.手机第三方安全软件拦截：
          </span>
          如手机下载安全卫士、手机管家等手机安全软件，请查看是否设置了短信拦截；
        </p>
        <p style="padding: 1vw 0">
          <span style="font-weight: 600">
            2.手机拦截黑名单：
          </span>
          打开手机设置，找到安全与隐私，骚扰拦截，查看手机是否设置拦截黑名单，如果有设置，请进行修改；
        </p>
        <p style="padding: 1vw 0">
          <span style="font-weight: 600">
            3.手机欠费、停机：
          </span>
          如手机出现欠费情况，所有短信将发送失败，请马上进行缴费；
        </p>
        <p style="padding: 1vw 0">
          <span style="font-weight: 600">
            4.信号网络延迟：
          </span>
          如手机处于信号覆盖盲区、网络信号屏蔽地区时，可稍后尝试重新获取；
        </p>
        <p style="padding: 1vw 0">
          5.如排除以上原因仍接收不到短信验证码，请致电400 666 8666客服咨询。
        </p>
      </div>
    )

    const open = () => {
      instance?.proxy?.$dialog.confirm({
        title: '收不到验证码的可能原因',
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
