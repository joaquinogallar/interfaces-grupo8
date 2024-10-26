class Hole extends Rect {
    constructor(posX, posY, width, height, fill, context, radius){
        super(posX, posY, width, height, fill, context);
        this.radius = radius;

        this.filled = false;
        this.disc = null;
    }

    draw() {
        const img = new Image();  // Crear una nueva instancia de imagen
        img.src = '././assets/juego/hole.png';  // Asegúrate de poner la ruta correcta a tu imagen

        
            this.ctx.drawImage(
                img, 
                this.posX, this.posY, 
                this.width, this.height
            );
            
            if (this.resaltado === true) {
                this.ctx.strokeStyle = this.resaltadoStyle;
                this.ctx.lineWidth = this.resaltadoWidth;
                this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
            }
        
        this.addCircle(this.radius);
    }

    addCircle(radius) {

        if (this.disc != null) {
            this.disc.setPosition(this.posX + this.width / 2, this.posY + this.height / 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // transparente
        } else {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // transparente
        }
        
        this.ctx.beginPath();
        this.ctx.arc(this.posX + this.width / 2, this.posY + this.height / 2, radius, 0, Math.PI * 2, false);
        this.ctx.fill(); 
        this.ctx.closePath();

    }

    isPointInside(x, y) {
        const margin = 10; // margen de error en píxeles
        return !(x < this.posX || x > this.posX + this.width || 
                 y < this.posY - margin || y > this.posY + this.height + margin);
    }

    markAsFilled(disc, c, r) {
        this.filled = true;
        this.disc = disc;
        disc.setUsed(true);
        disc.setBoardPosition(c, r);
    }

    markAsEmpty() {
        this.filled = false;
    }

    setFilled(isFilled) {
        this.filled = isFilled;
    }

    isFilled() {
        return this.filled;
    }
    
    getDisc() {
        return this.disc;
    }
    
    getInfo() {
        return "agujero";
    }
}