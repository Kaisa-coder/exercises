import { dom } from './dom.js'


class EUITopTip {

  static timer = null

  /**
   * 显示顶部全局提示框
   * @param message 提示信息
   * @param type 显示类型`normal success error`
   * @param timeout 自动关闭时间
   * @returns {Promise<unknown>}
   */
  static show(message, type = 'normal', timeout = 2000) {
    return new Promise(resolve => {
      this.hide()
      const toptip = dom.create('div').addClass('eui-toptip').addClass(type).appendTo(document.body)

      toptip.append(message)
      toptip.animate(100, function (p) {
        this.setStyle('top', (p - 1) * 60 + 'px')
      }, 'quadraticIn')

      toptip.on('mouseover', (event) => {
        clearTimeout(EUITopTip.timer)
      })

      toptip.on('mouseout', (event) => {
        close()
      })

      const close  = ()=>{
        if (timeout) {
          EUITopTip.timer = setTimeout(() => {
            toptip.remove()
            resolve()
          }, timeout);
        }
      }

      close()
    

    })
  }

  /**
   * 隐藏顶部全局提示框
   */
  static hide() {
    dom.selectAll('.eui-toptip').remove()
  }
}


export { EUITopTip }
