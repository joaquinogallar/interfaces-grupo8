class Circle extends Figure {
    constructor(posX, posY, radius, fill, ctx){
        super(posX, posY, fill, ctx);

        this.radius = radius;
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();

        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoStyle;
            this.ctx.lineWidth = this.resaltadoWidth;
            this.ctx.stroke();
        } /*else {
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = this.resaltadoWidth / 2;
            this.ctx.stroke();
        }*/
        this.ctx.closePath();
        
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setResaltado(b) {
        this.resaltado = b;
    }

    getType() {
        return "circle";
    }

    getInfo() {
        return "circulo";
    }
}