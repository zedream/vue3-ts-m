export const useReachBottom = (
  fn: () => void,
  distance: number,
  ele: HTMLElement
) => {
  const reachBottomFlag = ref(true)

  // onMounted(() => {
  //   ele.addEventListener('scroll', viewScroll)
  // })
  //
  // onUnmounted(() => {
  //   ele.removeEventListener('scroll', viewScroll)
  // })

  const viewScroll = throttle(function () {
    if (ele.scrollHeight - ele.scrollTop - ele.clientHeight < distance) {
      reachBottom()
      reachBottomFlag.value = false
    } else {
      reachBottomFlag.value = true
    }
  }, 17)

  const reachBottom = once(function () {
    console.warn(`------ 已达到触底距离: ${distance} ------`)
    fn.apply(null)
  })

  function once (fn) {
    return function () {
      if (reachBottomFlag) {
        reachBottomFlag.value = false
        fn.apply()
      }
    }
  }

  return 123
}
