class Button extends Figure{
    constructor(ctx, text, x, y, width = 160, height = 50, group, bgColor = "lightblue", textColor = "black") {
        super(x, y, bgColor, ctx);
        this.ctx = ctx;
        this.text = text;
        this.action = text;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.textColor = textColor;

        this.group = group;
        
        // Para gestionar el hover y los clics
        this.isHovered = false;
        this.onClick = null;

        this.helper = new Helper(ctx);
    }

    draw() {
        // Cambia el color de fondo si es hover
        super.draw();
        this.ctx.fillStyle = this.isHovered ? "lightblue" : this.bgColor;

        // Pos centrado:
        let posX = this.posX - this.width / 2;
        let posY = this.posY - this.height / 2;
        this.ctx.fillRect(posX, posY, this.width, this.height);

        const textMetrics = this.ctx.measureText(this.text);
        const textY = this.posY + textMetrics.actualBoundingBoxAscent / 2;

        // Dibujar texto centrado
        this.helper.drawText(this.text, this.posX, textY, undefined, this.textColor);


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

    setAction(act) {
        this.action =  act;
    }

    getAction() {
        return this.action;
    }

    getGroup() {
        return this.group;
    }

    getType() {
        return "button";
    }

}