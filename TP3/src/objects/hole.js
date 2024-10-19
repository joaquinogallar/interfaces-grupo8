class Hole extends Rect {
    constructor(posX, posY, width, height, fill, context, radius){
        super(posX, posY, width, height, fill, context);
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.addCircle(this.radius);
    }

    addCircle(radius) {

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // transparente
        
        this.ctx.beginPath();
        this.ctx.arc(this.posX + this.width / 2, this.posY + this.height / 2, radius, 0, Math.PI * 2, false);
        this.ctx.fill(); 
        this.ctx.closePath();

    }

}