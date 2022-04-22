<script setup lang="ts">
import { ref } from 'vue'
import { GetMessageCode } from '@/api/user'
import { useStore } from '@/store'
import { useVerifyCode } from '@/hooks'
import { desensitized } from '@/utils/utils'

const router = useRouter()
const route = useRoute()
const store = useStore()
const { proxy } = getCurrentInstance()

let timer
const inputFocus = ref(true)
const verifyButtonText = ref('重新获取')
const countdown = ref(60)
const inputRef = ref()
const state = reactive({
  countryCode: '86',
  fastReg: 1,
  loginType: 'vcode',
  mobile: store.state.user.mobile,
  pageUrl: window.location.href,
  pcode: store.state.common.partnerCode,
  ua: window.navigator.userAgent,
  vcode: ''
})

const mobile = computed(() => desensitized(store.state.user.mobile, 3, 6))

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus()
  })
})
onUnmounted(() => {
  clearInterval(timer)
  timer = null
})

if (!store.state.user.mobile) {
  router.back()
}

if (process.env.APP_NODE_ENV !== 'prod') {
  const code = ['1', '4', '7', '2', '5', '8']
  timer = setInterval(() => {
    if (code.length) {
      const c = code.shift() as string
      state.vcode = state.vcode.concat(c)
    } else {
      clearInterval(timer)
    }
  }, 120)
}

useVerifyCode(60, verifyButtonText, countdown)

function onCodeDone () {
  store.dispatch('user/signInByCode', state).then(() => {
    router.go(-2)
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
  })
}

function getMessageCode () {
  if (countdown.value === 0) {
    GetMessageCode({
      countryCode: '86',
      mobile: store.state.user.mobile,
      type: 'signin'
    }).then(() => {
      proxy.$notify({ type: 'success', message: '验证码发送成功' })
      useVerifyCode(60, verifyButtonText, countdown)
    }).catch((error) => {
      proxy.$notify({ type: 'danger', message: error })
    })
  }
}
</script>

<template>
  <div class="verification-container">
    <div class="title">
      输入短信验证码
    </div>
    <div class="sub-title">
      验证码已发送到
      <span class="mobile">
        {{ mobile }}
      </span>
    </div>
    <CodeInput v-model="state.vcode" @on-done="onCodeDone" />
    <div class="code-btn" :class="{ gray: countdown !== 0 }" @click="getMessageCode">
      {{ verifyButtonText }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.verification-container {
  background: #FFFFFF;
  height: 100%;
  padding: 180px 50px 0;
  box-sizing: border-box;
  .title {
    font-size: 48px;
    line-height: 48px;
    color: #292929;
    margin-bottom: 20px;
  }
  .sub-title {
    font-size: 30px;
    line-height: 30px;
    color: #b0b0b0;
    .mobile {
      color: #4981FA;
    }
  }
  .code-btn {
    font-size: 26px;
    color: #4981FA;
  }
  .gray {
    color: #b0b0b0;
  }
}
</style>
