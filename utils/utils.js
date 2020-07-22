export function debounce(fn, delay) {
  let timer = null
  return function (...params) {
    timer && clearTimeout(timer)
    setTimeout(() => {
      fn.apply(this, params)
    }, delay)
  }
}