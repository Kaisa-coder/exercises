function toRad(deg) {
    return deg * Math.PI / 180
}

function toDeg(rad) {
    return rad * 180 / Math.PI
}

export default class Circle {
    constructor(radius = 20, color = '#fff') {
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
        this.x = 0;
        this.y = 0;
        this.startAngle = 0;
        this.endAngle = 360;
        this.lineWidth = 2;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(toRad(this.rotation))
        ctx.fillStyle = "#ccc";
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.arc(0, 0, this.radius, toRad(this.startAngle), toRad(this.endAngle));
        ctx.stroke();
        ctx.restore()
    }
}