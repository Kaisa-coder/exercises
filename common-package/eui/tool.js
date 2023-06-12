import { eui } from "./index.js"

class Tool {
  static loadScriptCallback(src, callback) {
    let script = document.createElement('script')
    script.src = src


    script.onload = () => callback(null, script)
    script.onerror = () => callback(new Error(`Script load error for ${src}`))

    document.head.append(script)
  }

  static loadScript(src) {
    return new Promise((resolve, reject) => {
      Tool.loadScriptCallback(src, (err, script) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(script)
        }
      })
    })
  }

  static random(start, end) {
    let n = Math.floor(Math.random() * (end - start + 1))
    return start + n
  }

  static randomAlpha() {
    let n = this.random(65, 90)
    let c = String.fromCharCode(n)
    return c
  }

  static randomChar(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      let alpha = this.randomAlpha()
      let num = this.random(0, 9)
      str += Math.random() > 0.5 ? alpha : num
    }
    return str
  }

  static uuid_set = new Set()
  static randomUUID() {
    let uuid = [8, 4, 4, 12].map(n => this.randomChar(n)).join('-')
    let has_uuid = this.uuid_set.has(uuid)
    if (has_uuid) {
      uuid = this.randomUUID()
    }
    this.uuid_set.add(uuid)
    return uuid
  }


  static debounce(func, ms) {
    let timeout
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    }
  }


  static throttle(func, ms) {
    let isThrottled = false
    let savedArgs
    let savedThis

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments
        savedThis = this
      }

      isThrottled = true

      func.apply(this, arguments)

      setTimeout(() => {
        isThrottled = false
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs)
          savedArgs = savedThis = null
        }
      }, ms);
    }

    return wrapper
  }


  static httpWrap = (func, responseMethod = 'json') => {
    return async function (...args) {
      let response = await func.call(this, ...args)
      if (response.ok) {
        const result = await response[responseMethod]()
        if (result.code == 200) {
          return result
        }
        else {
          eui.showTopTip('Request-Error: ' + result.msg, 'error')
        }
      } else {
        eui.showTopTip("HTTP-Error: " + response.status, 'error');
      }
    }
  }

  static object2urlParams = (params) => {
    let qs = new URLSearchParams()
    if (params != null && typeof params == 'object') {
      for (const [name, value] of Object.entries(params)) {
        qs.append(name, value)
      }
    }
    return qs
  }
  
  static formData2JSON = (formData) => {
    let json = {}
    for (const [name, value] of formData) {
      json[name] = value
    }
    return json
  }
    
  
  static http_get = Tool.httpWrap(function (url, params) {
    let absUrl = 'http://' + API_HOST + url
    let qs =  Tool.object2urlParams(params)
    if (params) {
      absUrl += '?' + qs
    }
  
    let headers = void 0
    let token = getToken()
  
    if (token != null) {
      headers = {
        'Authorization': 'Bearer '+ token
      }
    }
  
    return fetch(absUrl, {
      method: 'get',
      headers: headers,
    })
  })
  
  static http_post_json = Tool.httpWrap(function (url, json) {
    let absUrl = 'http://' + API_HOST + url
    let token = getToken()
    return fetch(absUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
      body: JSON.stringify(json)
    })
  })

  static raw_type = function (value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }
  
  static animate({ timing, draw, duration, done }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction：已过去的时间与总时间之比，代表动画完成度。 其值从 0 增加到 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // 计算当前动画状态
      let progress = timing(timeFraction);
      // 绘制
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }else{
        done && done()
      }
    })
  }
}

export { Tool }
