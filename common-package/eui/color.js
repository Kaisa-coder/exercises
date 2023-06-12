/**
 * 解析css颜色
 * @param {String} cssColorString css颜色字符
 * #rrggbb
 * #rgb
 * rgb(0, 0, 0)
 * rgba(0, 0, 0, 0)
 */
export function parse(cssColorString) {
    let color = [0, 0, 0, 1];
    let str = cssColorString;

    if (!cssColorString) {
        return color;
    }

    if (str.indexOf('#') > -1) {
        let hexColor = str.slice(1);
        if (hexColor.length !== 3 && hexColor.length !== 6) {
            console.error('错误的颜色格式', str);
            return color;
        }

        if (hexColor.length === 3) {
            hexColor = hexColor[0].repeat(2) + hexColor[1].repeat(2) + hexColor[2].repeat(2);
        }

        let value = parseInt(hexColor, 16);

        let r = value >> 16 & 0xFF;
        let g = value >> 8 & 0xFF;
        let b = value & 0xFF;

        color[0] = r;
        color[1] = g;
        color[2] = b;
    }
    else if (str.indexOf('rgb') > -1) {
        str.replace(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/g, function (m, r, g, b, a = 1) {
            color[0] = r * 1;
            color[1] = g * 1;
            color[2] = b * 1;
            color[3] = a * 1;
        });
    }

    return color;

}

/**
 * 将颜色数组转化为十六进制表示
 * @param {Array} color 颜色数组[r, g, b]
 */
export function toHex(color) {
    // // let hex = (r << 16 | g << 8 | b).toString(16)
    let str = '#'
    color.forEach((c) => {
        if (c > 255) {
            c = 255
        }
        else if (c < 0) {
            c = 0
        }
        let hexColor = c.toString(16)
        let hex = c < 16 ? '0' + hexColor : hexColor
        // 
        str += hex
    })

    return str
}

/**
 * 创建渐变色数组
 * @param {String} startColor 开始颜色
 * @param {String} endColor 结束颜色
 * @param {Number} step 生成中间颜色的数量
 */
export function createGradient(startColor, endColor, step) {
    // 0-255 个
    // let value = r << 16 | g << 8 | b;
    let sc = parse(startColor)
    let ec = parse(endColor)

    let rStep = (ec[0] - sc[0]) / step
    let gStep = (ec[1] - sc[1]) / step
    let bStep = (ec[2] - sc[2]) / step
    // let aStep = (sc[3] - ec[3]) / step

    let result = [startColor]

    for (let i = 1; i < step; i++) {
        let r = parseInt(rStep * i + sc[0])
        let g = parseInt(gStep * i + sc[1])
        let b = parseInt(bStep * i + sc[2])

        result.push(toHex([r, g, b]))
    }

    result.push(endColor)

    return result
}


export function modifyOpacity(cssColorString, alpha) {
    let color = parse(cssColorString);
    // modify alpha
    color[3] = alpha;
    let result = 'rgba(' + color.join(',') + ')';
    return result;
}
