class Hole extends Rect {
    constructor(posX, posY, width, height, fill, context, radius){
        super(posX, posY, width, height, fill, context);
        this.radius = radius;

        this.filled = false;
        this.disc = null;
    }

    draw() {
        super.draw();
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

    markAsFilled(disc) {
        this.filled = true;
        this.disc = disc;
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
    
    
    getInfo() {
        return "agujero";
    }
}