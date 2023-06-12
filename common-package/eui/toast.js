import { dom } from './dom.js'


class Toast {
  static create(text, delay = 1500, callback) {
    dom.selectAll('.eui-toast').remove()

    var toastDiv = dom.create('div').addClass('eui-toast')
    var toastText = dom.create('div').addClass('eui-toast__text')
    var toastCloseBtn = dom.create('div').addClass('eui-toast__close')

    toastText.html(text)
    toastDiv.append(toastText).append(toastCloseBtn)

    toastDiv.animate(100, function (p) {
      this.setStyle('opacity', p)
      this.setStyle('transform', `translate(-50%, -${100 - 100 * p}%)`)
    }, 'quadraticIn')

    setTimeout(() => {
      toastDiv.remove()
      callback && callback()
    }, delay);

    return toastDiv
  }

  static message(text, delay, callback) {
    const toastDiv = Toast.create(text, delay, callback).addClass('message')
    dom.select('body').append(toastDiv)
  }
  static success(text, delay, callback) {
    const toastDiv = Toast.create(text, delay, callback).addClass('success')
    const svg = /* html */`<svg t="1674010909982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3854" width="20" height="20"><path d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128" fill="#ffffff" p-id="3855"></path><path d="M619.072 429.088l-151.744 165.888-62.112-69.6a32 32 0 1 0-47.744 42.624l85.696 96a32 32 0 0 0 23.68 10.688h0.192c8.96 0 17.536-3.776 23.616-10.4l175.648-192a32 32 0 0 0-47.232-43.2" fill="#ffffff" p-id="3856"></path></svg>`
    toastDiv.prepend(svg)
    dom.select('body').append(toastDiv)
  }
  static info(text, delay, callback) {
    const toastDiv = Toast.create(text, delay, callback).addClass('info')
    const svg = /* html */`<svg t="1674010304348" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M512.327324 1024a511.992645 511.992645 0 1 1 511.672849-511.672849 512.31244 512.31244 0 0 1-511.672849 511.672849z m0-944.675998A433.003149 433.003149 0 1 0 945.266513 512.327151a433.195026 433.195026 0 0 0-432.939189-433.003149z" fill="#fff" p-id="2896"></path><path d="M447.984463 256.490726m63.959106 0l0 0q63.959106 0 63.959106 63.959106l0 191.877319q0 63.959106-63.959106 63.959106l0 0q-63.959106 0-63.959106-63.959106l0-191.877319q0-63.959106 63.959106-63.959106Z" fill="#fff" p-id="2897"></path><path d="M447.984463 640.245363m63.959106 0l0 0q63.959106 0 63.959106 63.959106l0 0q0 63.959106-63.959106 63.959106l0 0q-63.959106 0-63.959106-63.959106l0 0q0-63.959106 63.959106-63.959106Z" fill="#fff" p-id="2898"></path></svg>`
    toastDiv.prepend(svg)
    dom.select('body').append(toastDiv)
  }
  static warning(text, delay, callback) {
    const toastDiv = Toast.create(text, delay, callback).addClass('warning')
    const svg = /* html */`<svg t="1674011182832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4812" width="20" height="20"><path d="M543.082667 161.173333a64 64 0 0 1 24.853333 24.853334l317.909333 572.224A64 64 0 0 1 829.866667 853.333333H194.133333a64 64 0 0 1-55.957333-95.082666L456.064 186.026667a64 64 0 0 1 87.018667-24.853334zM512 217.109333L194.112 789.333333H829.866667L512 217.109333zM544 661.333333v64h-64v-64h64z m0-276.437333V618.666667h-64V384.896h64z" fill="#ffffff" p-id="4813"></path></svg>`
    toastDiv.prepend(svg)
    dom.select('body').append(toastDiv)
  }
  static error(text, delay, callback) {
    const toastDiv = Toast.create(text, delay, callback).addClass('error')
    const svg = /* html */`<svg t="1674011302165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5767" width="20" height="20"><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-960a448 448 0 1 0 448 448A448 448 0 0 0 512 64z m160 640a32.256 32.256 0 0 1-22.144-8.96l-0.384 0.32-137.6-151.68-137.28 150.72v0.32l-0.384 0.32A32 32 0 0 1 320 672a31.552 31.552 0 0 1 7.296-19.52l-0.448-0.32 141.92-156.16-138.272-152.64a14.24 14.24 0 0 1-2.4-2.56l-0.96-1.28A31.712 31.712 0 0 1 320 320a32 32 0 0 1 54.144-23.04l0.416-0.32 137.6 151.68 137.28-150.72v-0.32l0.384-0.32a32 32 0 0 1 54.08 23.04 31.552 31.552 0 0 1-7.296 19.52l0.448 0.32-141.92 156.16 138.272 152.64a14.24 14.24 0 0 1 2.4 2.56l0.96 1.28a31.712 31.712 0 0 1 7.264 19.52A32 32 0 0 1 672 704z" fill="#ffffff" p-id="5768"></path></svg>`
    toastDiv.prepend(svg)
    dom.select('body').append(toastDiv)
  }
}

export { Toast }

// call
// Toast.message('hello world');
// Toast.success('hello world');
// Toast.info('hello world');
// Toast.warning('hello world');
// Toast.error('hello world');
