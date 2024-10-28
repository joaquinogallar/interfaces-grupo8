class Button extends Figure{
    constructor(ctx, text, x, y, width = 160, height = 50, bgColor = "#423ADE", textColor = "black") {
        super(x, y, bgColor, ctx);
        this.ctx = ctx;
        this.text = text;
        this.action = text;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.textColor = textColor;

        // Para gestionar el hover y los clics
        this.isHovered = false;
        this.onClick = null;

        this.helper = new Helper(ctx);
    }

    draw() {
        // Cambia el color de fondo si es hover
        super.draw();
        this.ctx.fillStyle = this.isHovered ? "#5A5FFF" : this.bgColor;

        // Pos centrado:
        let posX = this.posX - this.width / 2;
        let posY = this.posY - this.height / 2;
        this.ctx.fillRect(posX, posY, this.width, this.height);

        this.helper.drawText(this.text, this.posX, this.posY);


        //Resaltado borde
        if(this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoStyle;
            this.ctx.lineWidth = this.resaltadoWidth / 2;
            this.ctx.strokeRect(posX, posY, this.width, this.height);
        }else {
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = this.resaltadoWidth / 2;
            this.ctx.strokeRect(posX, posY, this.width, this.height);
        }
    }

    isPointInside(x, y) {
        // Centrado
        return !(
            x < this.posX - this.width / 2 ||
            x > this.posX + this.width / 2 ||
            y < this.posY - this.height / 2 ||
            y > this.posY + this.height / 2
        );
    }

    getAction() {
        return this.action;
    }

    getType() {
        return "button";
    }

}