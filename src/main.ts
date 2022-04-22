import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from '@/store'
import VConsole from 'vconsole'
// import createDirective from './utils/directive'
import '@/utils/global'
import { Toast, Notify, Dialog } from 'vant'
import 'vant/es/toast/style/index'
import 'vant/es/notify/style/index'
import 'vant/es/dialog/style/index'

const app = createApp(App)

// createDirective(app)

if ('serviceWorker' in navigator && process.env.APP_NODE_ENV === 'prod') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      console.log('SW registered ', registration)
    }).catch((registrationError) => {
      console.log('SW registration failed ', registrationError)
    })
  })
}

if (process.env.APP_NODE_ENV !== 'prod') {
  const vConsole = new VConsole()
}

app.config.globalProperties.$toast = Toast
app.config.globalProperties.$notify = Notify
app.config.globalProperties.$dialog = Dialog

app.use(store, key).use(router).mount('#app')
