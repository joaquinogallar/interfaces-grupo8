class Figure {
    constructor(posX, posY, fill, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoStyle = 'red';
        this.resaltadoWidth = 3;
        this.ctx = ctx;
    }

    setFill(fill) {
        this.fill = fill;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getFill() {
        return this.fill;
    }

    getResaltado() {
        return this.resaltado;
    }

    setResaltado(b) {
        this.resaltado = b;
    }

    getResaltadoStyle(){
        return this.resaltadoStyle;
    }

    setResaltadoStyle(style) {
        this.resaltadoStyle = style;
    }

    getResaltadoWidth() {
        return this.resaltadoWidth;
    }

    setResaltadoWidth(width) {
        this.resaltadoWidth = width;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
    }

    getInfo() {
        return "figura";
    }

    isPointInside(x, y) {};

    isUsed() {
        return false;
    }

    getJugador() {
        return null;
    }
}