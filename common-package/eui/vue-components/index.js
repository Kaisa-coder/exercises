import './transition.css'
import * as directives from './directives'

import Button from './button/index.vue'
import Dialog from './dialog/index.vue'
import Select from './select/select.vue'
import Option from './select/option.vue'
import TreeSelect from './tree-select/index.vue'
// import Tree from './tree/tree.vue'

export default {
    install(app, config) {
        // 注册组件
        app.component('EuiDialog', Dialog)
        app.component('EuiButton', Button)
        app.component('EuiSelect', Select)
        app.component('EuiOption', Option)
        app.component('EuiTreeSelect', TreeSelect)
        // app.component('EuiTree', Tree)


        // 注册指令
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}