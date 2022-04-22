export const useCountDown = (
  second: number,
  onChange: (remainTime: number) => void
) => {
  let timer
  const current = ref(second)

  // onChange(second)

  onBeforeUnmount(() => {
    pause()
  })

  function start () {
    timer = setInterval(() => {
      current.value -= 1
      onChange(Math.floor(current.value))
      if (current.value === 0) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  }

  function pause () {
    clearInterval(timer)
    timer = null
  }

  function reset (remainTime: number) {
    current.value = remainTime
    start()
  }

  return {
    current,
    start,
    pause,
    reset
  }
}
