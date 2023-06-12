import { dom } from "./dom.js"
import imgWarning from "./img/warning.png"
import imgSuccess from "./img/success.png"
import imgError from "./img/error.png"

let isOpen = false


const imgs = {
    warning: imgWarning,
    success: imgSuccess,
    error: imgError,
}

export function euiConfirm(title, text, type = 'warning') {
    let img = imgs[type]
    return new Promise(resolve => {
        if (!isOpen) {
            let body = dom.select('body')
            let mask = dom.createFromSelector('div.eui-mask')
            mask.attr('data-role', 'confirm')
            let confirmHTML = /* html */`<div class='eui-confirm'>
                <div class="eui-confirm__header"><img src="${img}" class="eui-confirm__icon"/><span>${title}</span></div>
                <div class="eui-confirm__body">${text}</div>
                <div class="eui-confirm__footer">
                    <button id="eui-btn-cancel">取消</button>
                    <button id="eui-btn-confirm" primary>确定</button>
                </div>
            <div>`

            const close = (confirmElement) => {
                let con = dom.create(confirmElement)
                con.animateTo({ top: '25%', opacity: 0 }, '0.2s')
                con.on('transitionend', () => {
                    mask.remove()
                    con.remove()
                }, { once: true })

                isOpen = false
            }

            body.append(confirmHTML).append(mask)
            dom.select('#eui-btn-cancel').on('click', function (event) {
                close(this.parentNode.parentNode)
                resolve(false)
            })
            dom.select('#eui-btn-confirm').on('click', function (event) {
                close(this.parentNode.parentNode)
                resolve(true)
            })


            isOpen = true
        }
    })
}