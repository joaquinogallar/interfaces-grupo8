class Game {
    
    constructor(p1, p2, srcImage) {


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


    resetGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // reinicia las variables del juego
        discs = [];
        holes = [];
        holesInsert = [];
        actualPlayer = player1;
        lastClickedFigure = null;
        
        // reinicia el juego
        play();
    }
        
    // Funcion que crea el juego
    play(cols, rows) {
        this.columns = 7;
        this.rows = 6;
        
        let total = columns * rows;
        let discsForPlayer = total / 2;
        
        createBoard(columns, rows, "blue"); // Crea y dibuja el tablero con columnas y filas variables y color //
        
        createDiscs(player1, discsForPlayer, 300, 250);
        createDiscs(player2, discsForPlayer, 750, 250);
        
        drawGame();
    }

    // Crear juego //

    createBoard(columns, rows, color) {
        const maxBoardSize = getBoardSize();

        // Crea la tabla del juego, agujero por agujero

        //let size = sizeDisc; // TAMAÑO DE AGUJERO//

        let sizeX = maxBoardSize / columns; // Tamaño del hole (cuadrado)
        let sizeY = maxBoardSize / rows;

        let size = Math.min(sizeX, sizeY);

        let _posX = canvasWidth / 2 - (size * columns) / 2; // POSICION INICIAL //
        let _posY = canvasHeight / 2 - (size * rows) / 2;

        let yInicial = _posY;

        for (let c = 0; c < columns; c++) {
            board[c] = [];
            for (let r = 0; r < rows; r++) {
            let hole = createHole(size, size, color, _posX, _posY);
            this.holes.push(hole);
            this.board[c][r] = hole;
            _posY += size;
            }
            _posY = yInicial;
            _posX += size;
        }

        // Visual borrar
        for (let c = 0; c < columns; c++) {
            let holeI = createHole(
            size,
            size,
            "gray" /* Reemplazar por "" para que sea invisible */,
            this.board[c][0].getPosX(),
            this.board[c][0].getPosY() - size
            );
            this.holesInsert.push(holeI);
        }

        drawBoard();
  }


  ///// GETTERS Y SETTER /////

  getBoardSize() {
      return this.BoardSize;
  }
  setBoardSize(value) {
      this.BoardSize = value;
  }
}