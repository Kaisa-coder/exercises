/**
 * 获取CheckBox的值
 * @param {*} name name属性的值
 * @param {*} context 选择器上下文
 * @returns 
 */
export function getCheckBoxValueFromName(name, context) {
    context = context || document
    let nameElementList = Array.from(context.querySelectorAll(`[name=${name}]`))

    let result = []
    for (const nameElem of nameElementList) {
        if (nameElem.checked) {
            result.push(nameElem.value)
        } else {
            result.push(false)
        }
    }
    return result
}



function defineCustomElement(name, generator) {
    let htmlTemplatePath = name + '-template.html';
    fetch(htmlTemplatePath)
        .then(stream => stream.text())
        .then(templateText => customElements.define(name, generator(templateText)));
}
