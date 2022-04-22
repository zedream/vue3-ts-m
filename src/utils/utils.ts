import { StorageTypesUser, StorageTypesUrlSearch, StorageTypesCommon } from '@/types/storage.types'

class Platform {
  ua: string
  constructor () {
    this.ua = window.navigator.userAgent.toLowerCase()
  }

  IOS () {
    return /(iPhone|iPad|iPod|iOS)/i.test(this.ua)
  }

  Android () {
    return /(Android)/i.test(this.ua)
  }

  WeChat () {
    return /MicroMessenger/i.test(this.ua)
  }
}
const platform = new Platform()

const desensitized = (data: string | number, start: number, end: number) => {
  if (typeof data === 'number') {
    data = data.toString()
  }
  const temp = data.split('')
  const len = temp.length
  for (let i = 0; i < len; i++) {
    if (i >= start && i <= end) {
      temp[i] = '*'
    }
  }
  return temp.join('')
}

const zeroFill = (amount: number | string) => {
  if (!amount) {
    return '0.00'
  }
  if (typeof amount === 'number') {
    amount = amount.toString()
  }
  const integer = amount.split('.')[0]
  let decimal = amount.split('.')[1] || ''
  if (decimal.length === 2) {
    return amount
  }
  let t: string[]
  if (decimal.length < 2) {
    t = decimal.split('')
    for (let i = 1; i >= 0; i--) {
      if (!t[i]) {
        t[i] = '0'
      }
    }
    decimal = t.join('')
  }
  return `${integer}.${decimal}`
}

const compareVersion = (v1: string, v2: string) => {
  const v1T = v1.split('.')
  const v2T = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  // 调整两个版本号位数相同
  while (v1T.length < len) {
    v1T.push('0')
  }
  while (v2T.length < len) {
    v2T.push('0')
  }
  // 循环判断每位数的大小
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1T[i])
    const num2 = parseInt(v2T[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

class BankCard {
  show (number: number | string) {
    if (typeof number === 'number') {
      number = number.toString()
    }
    const t = number.split('')
    const result: string[] = []
    for (let i = 0; i < t.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        result.push(' ')
      }
      result.push(t[i])
    }
    return result.join('')
  }

  hide (number: number | string) {
    if (typeof number === 'number') {
      number = number.toString()
    }
    const pre = number.substring(0, 4)
    const sif = number.substring(number.length - 4)
    return `${pre} **** **** ${sif}`
  }
}
const formatBankCard = new BankCard()

const calculateStorage = () => {
  let size = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string
    const value = localStorage.getItem(key) || ''
    size += key.length + value.length
  }
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i) as string
    const value = sessionStorage.getItem(key) || ''
    size += key.length + value.length
  }
  if (size / 1024 < 1024) {
    return `${(size / 1024).toFixed(2)}Kb`
  } else if (size / 1024 / 1024 < 1024) {
    return `${(size / 1024).toFixed(2)}Mb`
  }
}

const clearStorage = () => {
  const excludes: string[] = [
    StorageTypesUser.APP_STORE_ACCOUNT_LOCAL,
    StorageTypesUser.APP_STORE_TOKEN_LOCAL,
    StorageTypesUser.APP_STORE_MOBILE_LOCAL,
    StorageTypesUser.APP_STORE_MEMBER_ID_LOCAL,
    StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL,
    StorageTypesCommon.APP_ENV_LOCAL,
    StorageTypesCommon.APP_VERSION_LOCAL,
    StorageTypesCommon.APP_SHOWN_NEWBIE_LOCAL
  ]
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string
    if (!excludes.includes(key)) {
      localStorage.removeItem(key)
    }
  }
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i) as string
    if (!excludes.includes(key)) {
      sessionStorage.removeItem(key)
    }
  }
}

class MultipleClick {
  waitTime: number
  lastTime: number
  count: number
  times: number
  timer: NodeJS.Timer | null
  constructor () {
    this.waitTime = 200
    this.lastTime = Date.now()
    this.count = 0
    this.times = 8
    this.timer = null
  }

  click (times = this.times) {
    return new Promise<void>((resolve) => {
      const currentTime = Date.now()
      this.count = (currentTime - this.lastTime) < this.waitTime ? this.count + 1 : 1
      this.lastTime = Date.now()
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.timer && clearTimeout(times)
        if (this.count > this.times) {
          console.log('连续点击大于8次')
          resolve()
        }
      }, this.waitTime + 10)
    })
  }
}
const multipleClick = new MultipleClick()

export {
  platform,
  desensitized,
  zeroFill,
  compareVersion,
  formatBankCard,
  calculateStorage,
  clearStorage,
  multipleClick
}
