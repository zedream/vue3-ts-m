interface RequestMethods {
  get(url: string, params?: object): void
  post(url: string, data?: object): void
}

interface ResponseData {
  data?
  info: string
  status: number
}
