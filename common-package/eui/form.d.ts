interface SimpleFormArgs {
    // 表单元素|选择器
    el: string | Element

    // 自动保存数据到 localStorage
    autoSave: boolean
}

// declare module eui


export default class SimpleForm {
    /**
     * @constructor
     * @param el 表单元素|选择器
     * @param autoSave 自动保存数据到 localStorage
     */
    constructor({ el, autoSave }: SimpleFormArgs)

    /**
     * 和 new SimpleForm 一个作用
     * @param  {...any} args 
     * @returns 
     */
    static create(...args: any[]): SimpleForm
    static types: ['select-one', 'text', 'number', 'password']

    /**
     * 获得表单元素值
     * @returns 
     */
    getValues(): object

    /**
     * 设置表单元素的值
     * @param {object} values 
     */
    setValues(values: object): void
    /**
     * 检查元素name属性是否有重复
     * @param {*} inputList 
     */
    checkNames(inputList: Element): void

    /**
     * input元素有变化时调用
     * @param val form的值
     */
    onChange(val: object): void


    /**
     * 表单验证不通过时调用
     * @param checkName 表单名称
     * @param value 值
     */
    onInvalid(checkName: string, value: string | number): void


    /**
     * 从本地恢复
     */
    restoreValues(): void

    /**
     * 设置表单的检查函数 
     * @param name 字段表单名称
     * @param func 检查函数，执行时会传入(name, value, element)三个参数 ，函数返回true时通过验证
     */
    setValidate(name: string, func: (name: string, value: string | number, element: Element) => boolean): void

    /**
     * 检查表单的某个字段
     * @param checkName 字段表单名称
     * @param triggerBehavior 是否触发invalid事件
     * @returns  检查结果
     */
    checkOne(checkName: string, triggerBehavior?: boolean): boolean


    /**
     * 检查整个表单
     * @param checkName 字段名称，不传时会检查整个表单, 传入时会检查该字段
     * @param triggerBehavior 是否触发invalid事件
     * @returns 检查结果
     */
    checkValidate(checkName: string, triggerBehavior?: boolean): boolean
}