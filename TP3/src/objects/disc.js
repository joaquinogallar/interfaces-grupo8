class Disc extends Circle {
    constructor(posX, posY, radius, fill, ctx, jugador, num){
        super(posX, posY, radius, fill, ctx);

        this.initialPos = {x: posX, y: posY};
        this.image = fill;
        this.jugador = jugador;
        this.used = false;
        this.num = num;
    }

    draw() {
        if (this.image) {
            this.ctx.drawImage(
                this.image,
                this.posX - this.radius,  
                this.posY - this.radius,  
                this.radius * 2,          
                this.radius * 2           
            );
        }
        // Dibujar el borde 
        this.ctx.beginPath();
        this.ctx.arc(
            this.posX,                 
            this.posY,                 
            this.radius,               
            0, Math.PI * 2             
        );
        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoStyle;
            this.ctx.lineWidth = this.resaltadoWidth;
        }else {
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = this.resaltadoWidth / 2;
        }

        this.ctx.stroke();
        this.ctx.closePath();

        this.drawText(this.num, this.posX, this.posY, '20px Arial', 'white');
    }

    returnToInitialPosition() {
        this.setPosition(this.initialPos.x, this.initialPos.y);
    }

    isUsed() {
        return this.used;
    }

    setUsed(b) {
        this.used = b;
    }

    getJugador() {
        return this.jugador;
    }

    getInfo() {
        return "Disco, jugador: "+ this.jugador ;
    }

    drawText(text, posX, posY, font, color = 'black') {

        this.ctx.font = font;   
        this.ctx.fillStyle = color;   
        this.ctx.strokeStyle = "black";
        this.ctx.textAlign = 'center';  
        this.ctx.textBaseline = 'middle';  
    
        this.ctx.strokeText(text, posX, posY);
        this.ctx.fillText(text, posX, posY);
    }
}