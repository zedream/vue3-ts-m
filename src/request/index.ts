import axios from './axios'

class HttpRequest implements RequestMethods {
  get (url, params?) {
    return new Promise<ResponseData>((resolve, reject) => {
      axios.get(url, { params }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  post (url, data) {
    return new Promise<ResponseData>((resolve, reject) => {
      axios.post(url, data).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default new HttpRequest()
