import { EUITopTip } from "./top-tip.js"
import { Toast } from "./toast.js"
import { showLoading, hideLoading } from "./loading.js"
import { euiConfirm as confirm } from './confirm.js'

/**
 *
 * @param {*} message
 * @param {*} type `normal success error`
 */
async function showTopTip(message, type, timeout) {
  await EUITopTip.show(message, type, timeout)
}

/**
 * 隐藏顶部提示
 */
function hideTopTip() {
  EUITopTip.hide()
}

function showToast(text, type = 'message', delay, callback) {
  return new Promise(resolve => {
    Toast[type](text, delay, function () {
      callback && callback()
      resolve()
    })
  })
}

const eui = Object.freeze({
  showTopTip,
  hideTopTip,
  showToast,
  showLoading,
  hideLoading,
  confirm,
})

export { eui }

// 挂载全局
// window.Tool = Tool
window.eui = eui
// window.dom = dom