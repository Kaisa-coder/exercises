# Common Package


## 使用说明

1. 先将仓库克隆至本地
```bash
git clone http://192.168.0.61:8888/fe/common-package.git
```
2. 进入项目目录，将项目利用`npm link`链接至全局, 例如：
```bash
cd common-package/eui
npm link
```
3. 在使用时，执行`npm link eui`，创建软链接，然后就可以当做正常的npm包使用。例如：
```bash
cd emind-data-visualization
npm link eui
```

[目录]
- eui： dom和ui相关 (包含dom、insertCss、toast、topTip, loading等组件)
- eui/quick.css 用于进行快速布局的样式
- eui/dom dom 操作的简易封装
- form： 表单相关(正在开发中)



## eui/quick.css 文档
### 宽度
- `w1 ~ w5` 可以快速设置元素的宽度为10% ~ 50%
- `w10` 设置元素宽度为100%（实际中不常用）

### 定位
- `pos-fmt` 格式化为绝对定位，并且生成BFC，使得当前元素填充满其`offsetParent`元素,

- `pos-ct` 水平居中（注：父元素要为非static定位）
- `pos-md` 垂直居中（注：父元素要为非static定位）
- `pos-mc` 垂直+水平居中（注：父元素要为非static定位）


### 弹性盒子
- `flex` 设置元素为弹性盒子
- `flex-md` 等效于 align-items: center;
- `flex-ct` 等效于 justify-content: center;
- `flex-dir-column` 等效于 flex-direction: column;
- `flex-sb` 等效于 justify-content: space-between;
- `flex-sa` 等效于 justify-content: space-around;
- `flex-mc` 同时设置 align-items: center;justify-content: center;
- `flex-item-1 ~ flex-item-4` 设置flex属性为1~4


### 边距
- `pd5、pd10、pd15` 设置左右的内边距
- `mg5、mg10、mg15` 设置上下的外边距


### 颜色
- `bg-指定颜色名称` 设置背景颜色
- `color-指定颜色名称` 设置文字颜色

### 文字
- `txt-ct` 居中
- `txt-left` 靠左
- `txt-right` 靠右
- `txt-justify` 两端对齐
- `single-text-overflow` 单行超出隐藏
- `multiple-text-overflow` 多行超出隐藏（2行）
- `font12 ~ font30` 设置12 ~ 30 之间的常用字体大小
- `font-wb` 加粗
- `font-wn` 设为常规字体

## eui 文档
常用的UI交互组件
- `showLoading(text?: string, color?: string): void` 打开全局Loading
- `hideLoading(): void` 关闭全局Loading
- `showTopTip(message: string, type: TopTipType, timeout: number): Promise<void>` 打开顶部提示
- `hideTopTip(): void` 关闭顶部提示
- `showToast(text: string, type: ToastType, delay: number, callback: Function): Promise<void>` 显示轻提示


## eui/dom 文档
dom 操作的简易封装，类似于jquery。

#### API

- `dom.select(selector, context)` 选择一个元素，返回 `DOMList`
- `dom.selectAll(selector, context)` 选择多个元素，返回 `DOMList`
- `dom.create(tag)` 创建指定标签,返回 `DOMList`
- `dom.parse(string)` 解析 `HTML/SVG/XML` 字符串，返回 `DOMList`
- `dom.render(tpl, data)` 极简模板引擎，返回 `字符串`
  - 取值：<%= variable %>
  - 表达式：<% if {} %>
- `dom.extendFn(name, fn)` 扩展 `DOMList` 上的方法

#### DOMList

> DOMList 继承自数组，可以使用数组的所有方法

DOMList 自身的方法如下:

- `on(eventType, eventHandler, option)` 为所选元素添加事件，返回 `DOMList`
- `off(eventType, eventHandler, option)` 移除事件，返回 `DOMList`
- `remove()` 删除所选元素，返回 `DOMList`
- `clone()` 复制所选元素，返回一个新的 `DOMList`
- `getRaw(index)` 获得真实的 `元素`
- `appendTo(target)` 将当前元素插入到目标元素，返回 `DOMList`
- `append(dom)` 在当前元素中插入子元素，位置在该元素内部所有元素的最后，参数 dom 可以是 `String|HTMLElement|DOMList`，返回 `DOMList`
- `prepend(dom)` 在当前元素中插入子元素，位置在该元素内部所有元素之前，参数 dom 可以是 `String|HTMLElement|DOMList`，返回 `DOMList`
- `before(dom)` 在当前元素之前插入元素，参数 dom 可以是 `String|HTMLElement|DOMList`，返回 `DOMList`
- `after(dom)` 在当前元素之后插入元素，参数 dom 可以是 `String|HTMLElement|DOMList`，返回 `DOMList`
- `prev(hasTextNode)` 获得所选元素的前一个元素，hasTextNode 表示是否包含文本节点，返回 `DOMList`
- `next(hasTextNode)` 获得所选元素的后一个元素，hasTextNode 表示是否包含文本节点，返回 `DOMList`
- `prevAll(hasTextNode)` 获得所选元素前面的所有相邻元素，hasTextNode 表示是否包含文本节点，返回 `DOMList`
- `nextAll(hasTextNode)` 获得所选元素后面的所有相邻元素，hasTextNode 表示是否包含文本节点，返回 `DOMList`
- `html(str)` 获取或者设置 `innerHTML`，str 是 html 字符串或者实现了 toString 方法的对象
- `empty()` 清空所选元素里边的内容
- `show(animate = 'fadeIn')` 显示所选元素，animate 表示显示时的动画样式类名
- `hide(animate = 'fadeOut')` 隐藏所选元素，animate 表示隐藏时的动画样式类名
- `attr(key, value)` 获取或者设置属性
- `animate(duration, draw, timing, done)` 执行动画，
  - duration 总时间，毫秒值
  - draw(p) 绘制函数，p：经过时序函数处理过的时间进度
  - timing(ep) 时序函数，ep:已过去的时间与总时间之比, 代表动画完成度 值从 0-1
  - done() 完成回调
- `animateTo(params, duration, timing = '')` 设置过度动画, params 为样式对象,如: `{ background: '#0ff', color: '#ccc' }`
- `removeClass(className)` 移除所选元素的样式类名，返回 `DOMList`
- `addClass(className)` 给所选元素增加样式类名
- `getStyle(name, index)` 获得样式，name 为样式的属性名，index 为集合中当前元素的索引，可以不传
- `setStyle(key, value)` 设置单个样式
- `setStyles(styleObject)` 设置样式，styleObject 为 css 对象, 支持中划线和驼峰, 例如: `{ color: 'red', backgroundColor: '#fff', 'border-radius': '3px' }`
- `hasDom()` 集合中是否有元素

