class Game {
    
    constructor(p1, p2, ctx, canvasHeight, canvasWidth, srcImage) {
        this.ctx = ctx;
        this.height = canvasHeight;
        this.width = canvasWidth;
        this.initGame(p1, p2, srcImage);
        
    }


    // Funciones init, reset, play, etc     //

    initGame(p1, p2, srcImage) {
        this.sizeDisc = 50; // Tamaño del cuadrado del tablero
        this.radiusDisc = sizeDisc * 0.35; // Radio de la ficha

        this.discs = [];
        this.holes = []; // Board
        this.board = [];
        this.holesInsert = [];

        this.player1 = p1;
        this.player2 = p2;
        this.playerScore1 = 0;      // Player
        this.playerScore2 = 0;
        this.actualPlayer = player1;


        // Background
        this.bgImg = new Image();
        this.bgImg.src = srcImage;
    }

    // Poder hacer reset con datos opcionalemente cambiables
    resetGame(p1 = this.player1, p2 = this.player2, bg = this.bgImg.src) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // reinicia las variables del juego
        this.initGame(p1, p2, bg)
        
        // reinicia el juego
        this.play();
    }
        
    // Funcion que crea el juego
    play(cols, rows) {
        this.columns = cols;
        this.rows = rows;
        
        let total = columns * rows;
        let discsForPlayer = total / 2;
        
        this.createBoard(this.columns, this.rows, "blue"); // Crea y dibuja el tablero con columnas y filas variables y color //
        
        this.createDiscs(player1, discsForPlayer, 300, 250);
        this.createDiscs(player2, discsForPlayer, 750, 250);
        
        this.drawGame();
    }

    // Crear juego, funciones //

    createBoard(columns, rows, color) {
        const maxBoardSize = this.getBoardSize();

        // Crea la tabla del juego, agujero por agujero

        //let size = sizeDisc; // TAMAÑO DE AGUJERO//

        let sizeX = maxBoardSize / columns; // Tamaño del hole (cuadrado)
        let sizeY = maxBoardSize / rows;

        let size = Math.min(sizeX, sizeY);

        let _posX = canvasWidth / 2 - (size * columns) / 2; // POSICION INICIAL //
        let _posY = canvasHeight / 2 - (size * rows) / 2;

        let yInicial = _posY;

        for (let c = 0; c < columns; c++) {
            this.board[c] = [];
            for (let r = 0; r < rows; r++) {
            let hole = this.createHole(size, size, color, _posX, _posY);
            this.holes.push(hole);
            this.board[c][r] = hole;
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
            this.board[c][0].getPosX(),
            this.board[c][0].getPosY() - size
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
    
        let name = player === player1 ? "P1" : "P2";
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
        for (let i = 0; i < discs.length; i++) {
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
        if (i === board[c].length) {
          return false;
        } else {
          let obj = board[c][i];
          if (obj) {
            let isFilled = obj.isFilled();
            if (isFilled) {
              return false;
            } else {
              if (!insertDisc(x, y, c, i + 1, disc)) {
                // Aquí iniciamos la animación de caída
                obj.markAsFilled(disc, c, i);
                animateDiscDrop(disc, obj.getPosY(), function() {
      
                  
                  //console.log("Col: " + disc.getBoardPosition().c + " Row: " + disc.getBoardPosition().r)
      
                  drawGame();
                });
                return true;
              }
            }
          }
        }
        return true;
      }

    ///// GETTERS Y SETTER /////

    getBoardSize() {
        return this.BoardSize;
    }
    setBoardSize(value) {
        this.BoardSize = value;
    }
}