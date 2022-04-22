export const usePolling = (
  func: (noKeyboard?: boolean) => Promise<void>,
  interval: number,
  ...arg: []
) => {
  const timer = ref()
  timer.value = setInterval(() => {
    func(...arg).then(() => {
      clearInterval(timer.value)
      timer.value = null
    }).catch(() => {
      clearInterval(timer.value)
      timer.value = null
    })
  }, interval)

  onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = null
  })
}
