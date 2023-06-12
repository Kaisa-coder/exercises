import { modifyOpacity } from './color.js'
import Circle from "./Circle.js"
import { dom } from './dom.js'


let lastId = 0

export function showLoading(text = "Loading...", color = '#40C621') {
    hideLoading()

    lastId++

    const privateKey = 'eui-loading-' + lastId
    const mask = dom.createFromSelector('div.eui-mask').attr('data-role', 'loading').attr('data-id', privateKey)
    const el = dom.createFromSelector('div.eui-loading').attr('id', privateKey)
    const canvas = document.createElement('canvas')

    canvas.width = 150
    canvas.height = 34


    el.append(canvas).appendTo(document.body)
    mask.appendTo(document.body)


    const context = canvas.getContext("2d")
    let centerX = canvas.width / 2
    let centerY = canvas.height / 2

    let gradnent = context.createLinearGradient(22, 0, 20, 22)
    gradnent.addColorStop(0, color)
    gradnent.addColorStop(1, "transparent")

    let circle1 = new Circle(10, gradnent)
    let circle2 = new Circle(15, modifyOpacity(color, 0.8))
    let circle3 = new Circle(15, modifyOpacity(color, 0.8))

    // 设置圆圈的初始位置
    circle1.x = 20
    circle1.y = centerY
    circle2.x = 20
    circle2.y = centerY
    circle3.x = 20
    circle3.y = centerY

    circle1.startAngle = -90
    circle1.endAngle = 150

    circle2.startAngle = -30
    circle2.endAngle = 30;

    circle3.startAngle = 150
    circle3.endAngle = 210

    let offset = 105


    function drawText(ctx, text) {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = "14px Aricl"
        ctx.fillText(text, 50, centerY + 5)
        ctx.restore()
    }

    requestAnimationFrame(function drawFrame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 让circle1旋转
        circle1.rotation -= 1
        if (circle1.rotation < -360) {
            circle1.rotation = 0
        }

        circle1.draw(context)
        circle2.draw(context)
        circle3.draw(context)

        offset += 0.4
        if (offset > 120) {
            offset = 105
        }
        drawText(context, text)
        context.clearRect(offset, 0, canvas.width, canvas.height)
        requestAnimationFrame(drawFrame)
    })
}


export function hideLoading() {
    const privateKey = 'eui-loading-' + lastId
    let el = document.getElementById(privateKey)
    let mask = document.querySelector(`[data-id=${privateKey}`)
    // 
    if (el && mask) {
        document.body.removeChild(el)
        document.body.removeChild(mask)
    }
}