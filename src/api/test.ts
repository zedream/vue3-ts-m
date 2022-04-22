import request from '@/request'
/**
 * 新中台登录
 */
export const Login = data => new Promise((resolve, reject) => {
  request.post('/newmid/auth/oauth/login', data).then((res) => {
    resolve(res)
  }).catch(error => {
    reject(error)
  })
})
