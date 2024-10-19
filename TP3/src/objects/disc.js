class Disc extends Circle {
    constructor(posX, posY, radius, fill, ctx, jugador){
        super(posX, posY, radius, fill, ctx);

        this.image = fill;
        this.jugador = jugador;
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
    }

    getJugador() {
        return this.jugador;
    }

    getInfo() {
        return "Disco, jugador: "+ jugador ;
    }
}