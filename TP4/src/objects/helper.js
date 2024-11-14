class Helper {
    constructor(ctx) {
        // HELPER SINGLETON
        if (typeof Helper.instance === "object") {
            return Helper.instance;
        }

        this.ctx = ctx;

        Helper.instance = this;
        return this;
    }

    async drawImage(src, x, y, width, height) {
        const img = new Image();
        img.src = src;
        img.onload = function () {
        
            this.ctx.drawImage(img, x, y, width, height);
        };
        await new Promise((resolve) => {
            img.onload = () => {
              //console.log("Imagen cargada. Inicializando juego.");
      
              resolve();
            };
      
            if (img.complete) {
              img.onload();
            }
          });
    }
    

    drawText(text, posX, posY, font = "bold 20px 'Baloo 2'", color = "black") {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(text, posX, posY);
    }

}