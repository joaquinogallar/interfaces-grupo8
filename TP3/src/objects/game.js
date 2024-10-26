class Game {
    
    constructor(ctx, canvasHeight, canvasWidth) {
        this.ctx = ctx;
        this.height = canvasHeight;
        this.width = canvasWidth;

        this.playerScore1 = 0;
        this.playerScore2 = 0;
        
    }


    // Funciones init, reset, play, etc     //

    async initGame(p1, p2, srcImage) {
        this.sizeDisc = 50; // Tamaño del cuadrado del tablero
        this.radiusDisc = this.sizeDisc * 0.35; // Radio de la ficha

        this.discs = [];
        this.holes = []; // Board
        this.board = [];
        this.holesInsert = [];

        this.boardSize = 350; // Tamaño maximo del board (pixeles)

        this.player1 = p1;
        this.player2 = p2;      // Player
        this.actualPlayer = this.player1;


        // Background
        this.bgImg = new Image();
        
        this.bgImg.src = srcImage;

        // Espera a que la imagen se cargue
        await new Promise((resolve) => {
            this.bgImg.onload = () => {
                //console.log("Imagen cargada. Inicializando juego.");

                resolve(); 
            };

            if (this.bgImg.complete) {
                this.bgImg.onload(); 
            }
        });

    }

    // Poder hacer reset con datos opcionalemente cambiables
    async resetGame(p1 = this.player1, p2 = this.player2, bg = this.bgImg.src) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // reinicia el juego
        await this.play(p1, p2, bg, this.columns, this.rows);
    }
        
    // Funcion que crea el juego
    async play(p1 = "Argentina", p2 = "Brasil", bgImg = "", cols = 7, rows = 6) {
        this.columns = cols;
        this.rows = rows;
        
        let total = cols * rows;
        let discsForPlayer = total / 2;

        await this.initGame(p1, p2, bgImg);
        

        this.createBoard(cols, rows, "blue"); // Crea y dibuja el tablero con columnas y filas variables y color //
        
        this.createDiscs(this.player1, discsForPlayer, 300, 250);
        this.createDiscs(this.player2, discsForPlayer, 750, 250);
        
        
        this.drawGame();
    }

    // Crear juego, funciones //

    createBoard(columns, rows, color) {
        const maxBoardSize = this.getBoardSize();

        // Crea la tabla del juego, agujero por agujero
        let board = this.board;
        let size = this.sizeDisc; // TAMAÑO DE AGUJERO//

        let sizeX = maxBoardSize / columns; // Tamaño del hole (cuadrado)
        let sizeY = maxBoardSize / rows;

        

        let _posX = this.width / 2 - (size * columns) / 2; // POSICION INICIAL //
        let _posY = this.height / 2 - (size * rows) / 2;

        let yInicial = _posY;
        
        for (let c = 0; c < columns; c++) {
                board[c] = [];
                
                for (let r = 0; r < rows; r++) {
                let hole = this.createHole(size, size, color, _posX, _posY);
                this.holes.push(hole);
                board[c][r] = hole;
                _posY += size;
            }
            _posY = yInicial;
            _posX += size;
        }


        // Holes para inserta disco
        for (let c = 0; c < columns; c++) {
            let holeI = this.createHole(
                size,
                size,
                "gray" /* Reemplazar por "" para que sea invisible */,
                board[c][0].getPosX(),
                board[c][0].getPosY() - size
            );
            this.holesInsert.push(holeI);
        }

        this.drawBoard();
    }

    createHole(rectHeight, rectWidth, color, posX, posY) {
        return new Hole(posX, posY, rectWidth, rectHeight, color, this.ctx, this.radiusDisc);
    }
  
    drawBoard() {
        for (let i = 0; i < this.holes.length; i++) {
            this.holes[i].draw();
        }
        // pinta los agujeros donde se sueltan las fichas
        // for (let i = 0; i < holesInsert.length; i++) {
        //   holesInsert[i].draw();
        // }
    }

    
    createDiscs(player, cant, _posX, _posY) {
        // Crea los discos para los jugadores
    
        let height = this.sizeDisc;
        let radius = this.radiusDisc;

    
        const img = new Image();
    
        let name = player === this.player1 ? "P1" : "P2";
        img.src = "./././assets/juego/disc" + name + ".png";
    
        img.onload = () => {
            for (let i = 0; i < cant; i++) {
                let disc = this.createDisc(radius, img, _posX, _posY, player, i);
                this.discs.push(disc);
                _posY += height / 3;
        }
            this.drawDiscs();
        };
    }
    
    createDisc(radius, img, posX, posY, player, num) {
        return new Disc(posX, posY, radius, img, ctx, player, num + 1);
    }
  
    drawDiscs() {
        //clearCanvas();
        for (let i = 0; i < this.discs.length; i++) {
            this.discs[i].draw();
        }
    }

    drawGame() {
        this.clearCanvas();
        this.drawBoard();
        this.drawDiscs();
        this.drawUI();
        
    }
      
    drawUI() {
        let font = "200 30px 'Baloo 2'";
        this.drawText(this.player1 + ": " + this.playerScore1, 80, 40, undefined, "white");
        this.drawText(
            this.player2 + ": " + this.playerScore2,
            this.width - 70,
            40,
            undefined,
            "white"
        );
        this.drawText("Turno de " + this.actualPlayer, this.width / 2, 40, font, "white");
    }

    // Fin crear juego

    // Funciones Juego //

    putDisc(posX, posY, disc) {
        let columna = this.canPutDisc(posX, posY);
        if (columna !== -1) {
            if (this.insertDisc(posX, posY, columna, 0, disc)) {
                this.drawGame();
                return true;
            }
        }
        disc.returnToInitialPosition();
        this.drawGame();
        return false;
    }

    insertDisc(x, y, c, i, disc) {
        if (i === this.board[c].length) {
            return false;
        } else {
            let obj = this.board[c][i];
            if (obj) {
                let isFilled = obj.isFilled();
                if (isFilled) {
                    return false;
                } else {
                    if (!this.insertDisc(x, y, c, i + 1, disc)) {
                        // Aquí iniciamos la animación de caída
                        obj.markAsFilled(disc, c, i);
                        this.animateDiscDrop(disc, obj.getPosY(), () => {

                            
                           //console.log("Col: " + disc.getBoardPosition().c + " Row: " + disc.getBoardPosition().r)
                            this.drawGame();
                        });
                        return true;
                    }
                }
            }
        }
        return true;
    }

    animateDiscDrop(disc, targetY, onComplete) {
        let speed = 10;


        function drop() {
            if (disc.getPosition().y < targetY) {      
                disc.setPosition(disc.getPosition().x, Math.min(disc.getPosition().y + speed, targetY));
                this.drawGame();
                requestAnimationFrame(drop); 
            } else {
            if (onComplete) onComplete(); 
                //obj.markAsFilled(disc, disc.getPosition().x, targetY);

            }
        }

        requestAnimationFrame(drop); 
    }

    canPutDisc(posX, posY) {
        for (let i = 0; i < this.holesInsert.length; i++) {
            if (this.holesInsert[i].isPointInside(posX, posY)) {
                return i;
            }
        }
        return -1;
    }
    
    checkWinner(disc) {
        const board = this.board;
        let boardPosition = disc.getBoardPosition();
        let col = boardPosition.c;
        let row = boardPosition.r;
        let player = disc.getPlayer();

        /*
        console.log("CHECK WINNER LOGS");
        console.log("Checking winner for player:", player);
        console.log("Disc position: col =", col, "row =", row);
*/
        const directions = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 },
        ];

        function countInDirection(dx, dy) {
            let count = 0;
            let c = col + dx;
            let r = row + dy;

            while (
                c >= 0 &&
                c < board.length &&
                r >= 0 &&
                r < board[c].length &&
                board[c][r].getDisc() != null &&
                board[c][r].getDisc().getPlayer() === player
            ) {
                count++;
                c += dx;
                r += dy;
            }
            return count;
        }

        // Revisa las cuatro direcciones
        for (let dir of directions) {
            let count = 1; // Inicia en 1 para contar la ficha que acaba de caer

            // Contar hacia una dirección (ejemplo: derecha) y la contraria (ejemplo: izquierda)
            count += countInDirection(dir.x, dir.y);
            count += countInDirection(-dir.x, -dir.y);

            // Si hay 4 o más fichas consecutivas, se detecta victoria
            if (count >= 2) {
            return true; // Victoria
            }
        }

        return false; // No hay victoria
    }
      
    togglePlayer() {
        this.actualPlayer = this.actualPlayer === this.player1 ? this.player2 : this.player1;
        this.drawGame();
    }

    // Fin funciones juego

    // #Region Utils

    clearCanvas() {
        this.ctx.drawImage(this.bgImg, 0, 0, this.width, this.height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
  
    drawImage(src, x, y, width, height) {
        const img = new Image();
        img.src = src;
        img.onload = function () {
        
            this.ctx.drawImage(img, x, y, width, height);
        };
    }

    drawText(
        text,
        posX,
        posY,
        font = "bold 20px 'Baloo 2'",
        color = "black"
    ) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(text, posX, posY);
    }
    

    ///// GETTERS Y SETTER /////

    getBoardSize() {
        return this.boardSize;
    }
    setBoardSize(value) {
        this.boardSize = value;
    }

    getDiscs() {
        return this.discs;
    }

    getActualPlayer() {
        return this.actualPlayer;
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }

    addWinPlayer1() {
        this.playerScore1 = this.playerScore1 + 1;
    }

    addWinPlayer2() {
        this.playerScore2 = this.playerScore2 + 1;
    }

    resetWins() {
        this.playerScore1 = 0;
        this.playerScore2 = 0;
    }
}