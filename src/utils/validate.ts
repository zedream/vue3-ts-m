export const MobileValid = (mobile) => {
  return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(mobile)
}

export const AmountValid = (amount) => {
  return /^([1-9]\d{0,5}|0)([.]?|(\.\d{1,2})?)$/.test(amount)
}

export const IDValid = (id) => {
  const MainlandReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
  const HongKongReg = /^[a-zA-Z]\d{6}\([\dA]\)$/
  const MacaoReg = /^[1|5|7]\d{6}\([\d]\)$/
  const TaiwanReg = /^[a-zA-Z][0-9]{9}$/
  return (MainlandReg.test(id) || HongKongReg.test(id) || MacaoReg.test(id) || TaiwanReg.test(id))
}
