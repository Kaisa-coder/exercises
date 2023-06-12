
/**
 * 常用的缓动函数集合
 */
const easingFuncs = {
  linear: function (k) {
    return k;
  },
  quadraticIn: function (k) {
    return k * k
  },
  quadraticOut: function (k) {
    return k * (2 - k);
  },
  quadraticInOut: function (k) {
    if ((k *= 2) < 1) { return 0.5 * k * k; }
    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function (k) {
    return k * k * k;
  },
  cubicOut: function (k) {
    return --k * k * k + 1;
  },
  cubicInOut: function (k) {
    if ((k *= 2) < 1) { return 0.5 * k * k * k; }
    return 0.5 * ((k -= 2) * k * k + 2);
  },
  quarticIn: function (k) {
    return k * k * k * k;
  },
  quarticOut: function (k) {
    return 1 - (--k * k * k * k);
  },
  quarticInOut: function (k) {
    if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  quinticIn: function (k) {
    return k * k * k * k * k;
  },
  quinticOut: function (k) {
    return --k * k * k * k * k + 1;
  },
}

class DOMList extends Array {

  // constructor(...args) {
  //     super(...args)
  // }

  /* ------------------ */
  /* 事件 */
  /* ------------------ */
  on(eventType, eventHandler, option) {
    this.forEach(el => {
      el.addEventListener(eventType, eventHandler, option);
    });
    return this;
  }
  off(eventType, eventHandler, option) {
    this.forEach(el => {
      el.removeEventListener(eventType, eventHandler, option);
    });
    return this;
  }

  /* ------------------ */
  /* 增删查 */
  /* ------------------ */

  /**
   * 移除所选元素
   * @returns
   */
  remove() {
    this.forEach(el => {
      el.remove();
    });
    return this;
  }

  /**
   * 复制所选元素
   * @param {Boolean} deep
   * @returns {DOMList}
   */
  clone(deep = false) {
    let list = new this.constructor();
    this.forEach(el => {
      list.push(el.cloneNode(deep));
    });
    return list;
  }

  /**
   * 获得真实DOM
   * @param {Number|String} index 索引
   * @returns {HTMLElement}
   */
  getRaw(index = 0) {
    return this[index];
  }

  /**
   * 将当前元素插入到目标元素
   * @param {HTMLElement|DOMList} target 目标元素
   */
  appendTo(target) {
    if (target instanceof this.constructor) {
      target.append(this);
    }
    else {
      let parent = this.constructor.of(target);
      parent.append(this);
    }
    return this;
  }

  /**
   * 插入元素
   * @param {String} 插入位置
   * @param {String|HTMLElement|DOMList} dom 要插入的元素
   */
  insert(position, dom) {
    let el = this.getRaw();

    if (typeof dom === 'string') {
      el.insertAdjacentHTML(position, dom);
    }
    else if (dom instanceof HTMLElement) {
      el.insertAdjacentElement(position, dom);
    }
    else if (dom instanceof this.constructor && dom.length > 0) {
      let first = dom[0];
      this.insert(position, first);
      let iter = this.constructor.of(first);
      // 按顺序插入后面的元素
      for (let i = 1; i < dom.length; i++) {
        iter.after(dom[i]);
        iter = this.constructor.of(dom[i]);
      }
    }

    return this;
  }

  /**
   * 在当前元素中插入子元素，位置在该元素内部所有元素的最后
   * @param {String|HTMLElement|DOMList} dom 要插入的元素
   */
  append(dom) {
    return this.insert('beforeEnd', dom);
  }

  /**
   * 在当前元素中插入子元素，位置在该元素内部所有元素之前
   * @param {String|HTMLElement|DOMList} dom 要插入的元素
   */
  prepend(dom) {
    return this.insert('afterBegin', dom);
  }

  /**
   * 在当前元素之前插入元素
   * @param {String|HTMLElement|DOMList} dom 要插入的元素
   */
  before(dom) {
    return this.insert('beforeBegin', dom);
  }

  /**
  * 在当前元素之后插入元素
  * @param {String|HTMLElement|DOMList} dom 要插入的元素
  */
  after(dom) {
    return this.insert('afterEnd', dom);
  }

  /**
   * 获得所选元素的前一个元素
   * @param {Boolean} hasTextNode 是否包含文本节点
   * @returns
   */
  prev(hasTextNode) {
    return this.neighbor('previous', hasTextNode);
  }

  /**
  * 获得所选元素的后一个元素
  * @param {Boolean} hasTextNode 是否包含文本节点
  * @returns
  */
  next(hasTextNode) {
    return this.neighbor('next', hasTextNode);
  }
  neighbor(dir, hasTextNode = false) {
    if (dir !== 'previous' && dir !== 'next') {
      throw new Error('参数错误, 请指定 dir 为 previous 或 next');
    }
    let el = this.getRaw();
    let neighbor = hasTextNode ? el[dir + 'Sibling'] : el[dir + 'ElementSibling'];
    if (neighbor != null) {
      return this.constructor.of(neighbor);
    }
    return new this.constructor();
  }
  neighborAll(dir, hasTextNode = false) {
    if (dir !== 'previous' && dir !== 'next') {
      throw new Error('参数错误, 请指定 dir 为 previous 或 next');
    }
    let list = new this.constructor();
    let cur = this.neighbor(dir, hasTextNode);
    while (cur.hasDom()) {
      list.push(cur.getRaw());
      cur = cur.neighbor(dir, hasTextNode);
    }
    return list;
  }
  siblings() {
    return this.prevAll().concat(this.nextAll());
  }

  /**
  * 获得所选元素前面的所有相邻元素
  * @param {Boolean} hasTextNode 是否包含文本节点
  * @returns
  */
  prevAll(hasTextNode) {
    return this.neighborAll('previous', hasTextNode);
  }

  /**
  * 获得所选元素后面的所有相邻元素
  * @param {Boolean} hasTextNode 是否包含文本节点
  * @returns
  */
  nextAll(hasTextNode) {
    return this.neighborAll('next', hasTextNode);
  }

  /**
   * 获取或者设置innerHTML
   * @param {undefined|string|object} str html字符串, 或者实现了toString方法的对象
   * @returns
   */
  html(str) {
    let el = this.getRaw();
    if (el && str === undefined) {
      return el.innerHTML;
    } else if (el && (typeof str === 'string' || typeof str.toString === 'function')) {
      el.innerHTML = String(str);
    }
    return this;
  }

  /**
   * 清空所选元素里边的内容
   * @returns
   */
  empty() {
    this.forEach(el => {
      el.innerHTML = '';
    });
    return this;
  }
  /* ------------------ */
  /* 显示相关 */
  /* ------------------ */

  /**
   * 显示所选元素
   * @param {string} animate 动画样式类名
   * @returns
   */
  show(animate = 'linear') {
    this.setStyle('display', 'block')
    return this;
  }
  /**
   * 隐藏所选元素
   * @param {string} animate 动画样式类名
   * @returns
   */
  hide(animate = 'linear') {
    this.forEach((el, i) => {
      let originDisplay = this.getStyle('display', i);
      if (!el.dataset.originDisplay) {
        el.dataset.originDisplay = originDisplay;
      }
    });
    this.setStyle('display', 'none');
    return this;
  }

  /* ------------------ */
  /* 属性操作 */
  /* ------------------ */


  /**
   * 获取或者设置属性
   * @param {*} key 名称
   * @param {*} value 值
   */
  attr(key, value) {
    if (key === undefined) {
      let attrDict = Object.create(null);
      let attrs = Array.from(this.getRaw().attributes);
      attrs.forEach(attr => {
        let k = attr.name;
        let v = attr.value;
        attrDict[k] = v;
      });
      return attrDict;
    }
    if (value === undefined) {
      return this.getRaw().getAttribute(key);
    }
    this.forEach(e => {
      e.setAttribute(key, value);
    });
    return this;
  }

  /* ------------------ */
  /* 动画 */
  /* ------------------ */

  /**
   * 执行动画
   * @param {Number} duration 总时间,毫秒值
   * @param {Function} draw 绘制函数
   * @param {Function|String} timing 时序函数
   * @param {Function} done 完成回调
   */
  animate(duration, draw, timing, done) {
    let start = performance.now();
    let self = this;
    requestAnimationFrame(function animate(time) {

      // 已过去的时间与总时间之比, 代表动画完成度 值从 0-1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        done && done();
        timeFraction = 1;
      }

      // 计算当前动画状态
      if (timing === undefined) {
        timing = easingFuncs.linear;
      } else if (typeof timing === 'string') {
        timing = easingFuncs[timing];
      }

      let process = timing(timeFraction);

      // 绘制
      if (draw.length === 1) {
        draw.call(self, process);
      }
      else if (draw.length === 2) {
        draw.call(self, self.getRaw(), process);
      }
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });

    return this;
  }

  animateTo(params, duration, timing = '') {
    this.forEach(el => {
      el.style.transition = 'all ' + duration + ' ' + timing;
      Object.keys(params).forEach(key => {
        el.style[key] = params[key];
      });
    });
  }


  /* ------------------ */
  /* 样式相关 */
  /* ------------------ */


  /**
   * 移除所选元素的样式类名
   * @param {string} className 样式名称
   * @returns
   */
  removeClass(className) {
    this.forEach(el => {
      el.classList.remove(className);
    });
    return this;
  }

  /**
   * 给所选元素增加样式类名
   * @param {string} className 样式名称
   * @returns
   */
  addClass(className) {
    this.forEach(el => {
      el.classList.add(className);
    });
    return this;
  }

  /**
   * 切换所选元素的样式类名
   * @param {*} className 
   * @returns 
   */
  toggleClass(className) {
    this.forEach(el => {
      el.classList.toggle(className)
    })
    return this
  }

  /**
   * 获得样式
   * @param {string} name 样式的属性名
   * @param {number} index 可以不传, 集合中当前元素的索引
   * @returns
   */
  getStyle(name, index) {
    let el = this.getRaw(index);
    return getComputedStyle(el, null)[name];
  }

  /**
   * 设置单个样式
   * @param {*} key 样式的属性名
   * @param {*} value 样式的属性值
   * @returns
   */
  setStyle(key, value) {
    this.forEach(el => {
      el.style[key] = value;
    });
    return this;
  }

  /**
   * 设置样式
   * @param {object} styleObject css对象, 支持中划线和驼峰, 例如: {color: 'red', backgroundColor: '#fff'}
   * @returns
   */
  setStyles(styleObject) {
    Object.keys(styleObject).forEach((key) => {
      var csskey = key.replace(/-[a-z]/g, m => m.slice(1).toUpperCase());
      this.setStyle(csskey, styleObject[key]);
    });
    return this;
  }
  hasDom(dom) {
    if (dom === undefined) {
      return this.length > 0;
    }
    return this.includes(dom);
  }
}

const dom = Object.freeze({
  v: '1.0.0',
  select(sel, ctx = document) {
    let el = ctx.querySelector(sel);
    let list = new DOMList();
    if (el != null) {
      list.push(el);
    }
    return list;
  },
  selectAll(sel, ctx = document) {
    let list = ctx.querySelectorAll(sel);
    return DOMList.of(...list);
  },

  /**
   * 生成一个DOMList
   * @param {String|HTMLElement|DOMList|Array} tag 支持标签字符串:如 a div p等， html元素以及DOMList对象，传入DOMList时会复制一份
   */
  create(tag) {
    if (typeof tag === 'string') {
      return DOMList.of(document.createElement(tag));
    }
    if (tag instanceof HTMLElement) {
      return DOMList.of(tag);
    }
    if (tag instanceof DOMList) {
      return tag.clone();
    }
    if (Array.isArray(tag)) {
      let list = new DOMList();
      tag.forEach(e => {
        if (tag instanceof HTMLElement) {
          list.push(e);
        }
      });
      return list;
    }
    return new DOMList();
  },

  /**
   * 从选择器创建
   * @param {String|Array} selectors 选择器或选择器数组
   * 例如: 
   * createFromSelector('div')                 -> <div></div>
   * createFromSelector('div.test')            -> <div class="test"></div>
   * createFromSelector('div#app')             -> <div id="app"></div>
   * createFromSelector('div#app.test')        -> <div id="app" class="test"></div>
   * createFromSelector('div#app.test1.test2') -> <div id="app" class="test1 test2"></div>
   */
  createFromSelector(selectors) {
    const create = (selector) => {
      let hasId = selector.includes('#')
      let hasClass = selector.includes('.')

      if (hasId) {
        let [tagName, idAndClass] = selector.split('#')
        let el = document.createElement(tagName)

        if (idAndClass.includes('.')) {
          let classList = idAndClass.split('.')
          let id = classList.shift()
          el.id = id
          for (const className of classList) {
            el.classList.add(className)
          }
        } else {
          el.id = idAndClass
        }
        return el
      }
      else if (hasClass) {
        let classList = selector.split('.')
        let tagName = classList.shift()
        let el = document.createElement(tagName)
        for (const className of classList) {
          el.classList.add(className)
        }
        return el
      } else {
        return document.createElement(selector)
      }
    }

    // 
    let domList = new DOMList()
    if (Array.isArray(selectors)) {
      for (const selector of selectors) {
        domList.push(create(selector))
      }
    }
    else {
      domList.push(create(selectors))
    }
    return domList
  },

  /**
   * 解析HTML/SVG/XML字符串
   * @param {string} str
   */
  parse(str) {
    let range = document.createRange();
    let frag = range.createContextualFragment(str);
    return DOMList.of(...frag.childNodes);
  },

  ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        callback();
      });
    }
  },
  /**
   * render
   * 取值：<%= variable %>
   * 表达式：<% if {} %>
   * 例子：
   *  <div>
   *    <div class="weui-mask"></div>
   *    <div class="weui-dialog">
   *    <% if(typeof title === 'string'){ %>
   *           <div class="weui-dialog__hd"><strong class="weui-dialog__title"><%=title%></strong></div>
   *    <% } %>
   *    <div class="weui-dialog__bd"><%=content%></div>
   *    <div class="weui-dialog__ft">
   *    <% for(var i = 0; i < buttons.length; i++){ %>
   *        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>"><%=buttons[i]['label']%></a>
   *    <% } %>
   *    </div>
   *    </div>
   *  </div>
   * A very simple template engine
   * @param {String} tpl
   * @param {Object=} data
   * @returns {String}
   */
  render(tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
      tpl
        .replace(/[\r\t\n]/g, ' ')
        .split('<%').join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '\',$1,\'')
        .split('\t').join('\');')
        .split('%>').join('p.push(\'')
        .split('\r').join('\\\'')
      + '\');}return p.join(\'\');';
    return new Function(code).apply(data);
  },
  /**
   * 给DOMList上增加方法
   * @param {*} name 函数名
   * @param {*} func 函数
   */
  extendFn(name, func) {
    Object.defineProperty(DOMList.prototype, name, {
      value: func,
      configurable: false,
      writable: false,
      enumerable: false
    });
  },

  insertCSS(css) {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = css
    document.head.appendChild(styleTag)
  }

});

export { dom, easingFuncs }
