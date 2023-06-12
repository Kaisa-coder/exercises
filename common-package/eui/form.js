const formKey = Symbol('formKey')
let idStart = 0

export default class SimpleForm {
    /**
     * @constructor
     * @param {Element|string} el 表单元素|选择器
     * @param {Boolean} autoSave 自动保存数据到 localStorage
     */
    constructor({ el, autoSave }) {
        this._validate = {}
        this.formElem = typeof el === 'string' ? document.querySelector(el) : el
        this.autoSave = autoSave
        this.inputList = this.formElem.querySelectorAll('.eui-form-input')
        this[formKey] = '__form-' + (idStart++)
        this.formElem.dataset.privateKey = this[formKey]
        this.checkNames(this.inputList)
        this.bindEvent(this.inputList)
    }

    /**
     * 和 new SimpleForm 一个作用
     * @param  {...any} args 
     * @returns 
     */
    static create(...args) {
        return new this(...args)
    }

    static types = ['select-one', 'text', 'number', 'password']

    /**
     * 获得表单元素值
     * @returns 
     */
    getValues() {
        let obj = {}
        for (const input of this.inputList) {
            if (SimpleForm.types.includes(input.type)) {
                if (!input.name) {
                    continue
                }
                obj[input.name] = input.value
            }
        }
        return obj
    }

    /**
     * 设置表单元素的值
     * @param {*} values 
     */
    setValues(values) {
        for (const input of this.inputList) {
            if (SimpleForm.types.includes(input.type)) {
                if (!input.name) {
                    continue
                }
                input.value = values[input.name] === void 0 ? '' : values[input.name]
            }
        }
    }
    /**
     * 检查元素name属性是否有重复
     * @param {*} inputList 
     */
    checkNames(inputList) {
        let names = []
        for (const input of inputList) {
            const name = input.name
            if (names.includes(name)) {
                console.error('名称 ' + name + ' 重复了')
            } else {
                name && names.push(name)
            }
        }
    }


    onChange() { }
    onInvalid() { }

    /**
     * 绑定事件
     * @param {*} inputList 
     */
    bindEvent(inputList) {
        const self = this
        for (const input of inputList) {
            input.addEventListener('change', function () {
                let val = self.getValues()
                // emit change
                self.onChange(val)
                // auto save
                if (self.autoSave) {
                    const privateKey = self[formKey]
                    localStorage.setItem(privateKey, JSON.stringify(val))
                }
            })
            input.addEventListener('blur', function () {
                self.checkOne(input.name)
            })
        }
    }

    /**
     * 从本地恢复
     */
    restoreValues() {
        const privateKey = this[formKey]
        let json = localStorage.getItem(privateKey)
        if (json !== null) {
            this.setValues(JSON.parse(json))
        }
    }

    /**
     * 设置表单的检查函数 
     * @param {string} name 字段表单名称
     * @param {Function} func 检查函数，执行时会传入(value, element)三个参数 ，函数返回true时通过验证
     */
    setValidate(name, func) {
        this._validate[name] = func
    }

    /**
     * 检查表单的某个字段
     * @param {string} checkName 字段表单名称
     * @param {Boolean} triggerBehavior 是否触发invalid事件
     * @returns {Boolean} 检查结果
     */
    checkOne(checkName, triggerBehavior = true) {
        let values = this.getValues()
        let func = this._validate[checkName]
        let value = values[checkName]
        let el = this.formElem.elements[checkName]

        if (typeof func === 'function') {
            let valid = func(value, el)
            if (!valid && triggerBehavior) {
                el.classList.add('invalid')
                // emit invalid
                this.onInvalid(checkName, value)
            } else {
                el.classList.remove('invalid')
            }
            return valid
        }
        return true
    }


    /**
     * 检查整个表单
     * @param {string} checkName 字段名称，不传时会检查整个表单, 传入时会检查该字段
     * @param {Boolean} triggerBehavior 是否触发invalid事件
     * @returns  {Boolean} 检查结果
     */
    checkValidate(checkName, triggerBehavior = true) {
        if (checkName) {
            return checkOne(checkName, triggerBehavior)
        }

        let names = Object.keys(this._validate)

        for (let i = 0; i < names.length; i++) {
            const name = names[i]
            let valid = this.checkOne(name, triggerBehavior)
            if (!valid) {
                return false
            }
        }
        return true
    }
}