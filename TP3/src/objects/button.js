class Button extends Figure{
    constructor(ctx, text, x, y, width = 160, height = 50, bgColor = "#423ADE", textColor = "black") {
        super(x, y, bgColor, ctx);
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;
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
        this.ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        this.helper.drawText(this.text, this.x, this.y);
    }

    // Verifica si el mouse está sobre el botón
    isMouseOver(mouseX, mouseY) {
        return (
            mouseX >= this.x - this.width / 2 &&
            mouseX <= this.x + this.width / 2 &&
            mouseY >= this.y - this.height / 2 &&
            mouseY <= this.y + this.height / 2
        );
    }

    // Asigna la función que se ejecutará al hacer clic
    setOnClick(callback) {
        this.onClick = callback;
    }

    // Gestiona el hover y el clic
    handleMouseMove(mouseX, mouseY) {
        this.isHovered = this.isMouseOver(mouseX, mouseY);
    }

    handleClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.onClick) {
            this.onClick();
        }
    }

    getType() {
        return "button";
    }

}