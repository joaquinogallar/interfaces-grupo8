class Game {
    
    constructor(ctx, canvasHeight, canvasWidth) {
        this.sizeDisc = 50; // Tamaño del cuadrado del tablero
        this.radiusDisc = this.sizeDisc * 0.35; // Radio de la ficha
        this.ctx = ctx;
        this.height = canvasHeight;
        this.width = canvasWidth;

        this.playerScore1 = 0;
        this.playerScore2 = 0;

        this.players = {
            p1 : "P1",
            p2 : "P2",
            p3 : "P3",
            p4 : "P4",
            p5 : "P5",
            p6 : "P6"
        }

        this.buttons = [];
        
        this.helper = new Helper(ctx);
        
        this.initialTimerValue = 120;
        this.timer = this.initialTimerValue; 
        this.timerInterval = null;
    }



    // Funciones init, reset, play, etc     //

    async initGame(p1, p2, srcImage) {
        

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
    async resetGame(p1 = this.player1, p2 = this.player2, bg = this.bgImg.src, bResetWins = true) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        if (bResetWins) this.resetWins();
        
        this.stopTimer();
        this.resetTimer();
        
        // reinicia el juego
        await this.play(p1, p2, bg, this.columns, this.rows);
    }
        
    start(p1 = "Argentina", p2 = "Brasil", bgImg = "canchaArg.jpg", cols = 7, rows = 6) {
        this.buttons = [];
        this.discs = [];
        this.columns = cols;
        this.rows = rows;
        this.player1 = p1;
        this.player2 = p2;

        this.resetWins();       // Si al dar al boton salir quisieramos que se guarden las victorias comentar esto
        
        // Background
        this.bgImg = new Image();
        
        this.bgImgName = bgImg;

        this.bgImg.src = `./././assets/juego/${this.bgImgName}`;

        this.createBtnsStart();
        this.drawStart();

        this.stopTimer();
        this.resetTimer();
    }

    // Funcion que crea el juego
    async play(p1 = this.player1, p2 = this.player2, bgImg = this.bgImg.src, cols = 7, rows = 6) {
        this.buttons = [];
        this.columns = cols;
        this.rows = rows;
        
        let total = cols * rows;
        let discsForPlayer = total / 2;

        await this.initGame(p1, p2, bgImg);
        

        this.createBoard(cols, rows, "blue"); // Crea y dibuja el tablero con columnas y filas variables y color //
        
        this.createDiscs(this.player1, discsForPlayer, 300, 250);
        this.createDiscs(this.player2, discsForPlayer, 750, 250);
        
        this.createBtnsGame();
        
        this.drawGame();

        this.startTimer();
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

        let teamImg = "argentina";
        if (this.bgImgName != "canchaArg.jpg") {
            teamImg = "brasil";
        }
        
        for (let c = 0; c < columns; c++) {
                board[c] = [];
                
                for (let r = 0; r < rows; r++) {
                let hole = this.createHole(size, size, color, _posX, _posY, teamImg);
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

    createHole(rectHeight, rectWidth, color, posX, posY, teamImg) {
        let randomNum = Math.floor(Math.random() * 4) + 1;  // para que se ponga uno de los 4 holes
        return new Hole(posX, posY, rectWidth, rectHeight, color, this.ctx, this.radiusDisc, teamImg, randomNum);
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
    
        let name = player === this.player1 ? this.player1 : this.player2;
        img.src = "./././assets/juego/disc" + name + ".png";
    
        img.onload = () => {
            for (let i = 0; i < cant; i++) {
                let disc = this.createDisc(radius, img, _posX, _posY, player, i +1);
                this.discs.push(disc);
                _posY += height / 3;
        }
            this.drawDiscs();
        };
    }
    
    createDisc(radius, img, posX, posY, player, num ="" ) {
        return new Disc(posX, posY, radius, img, ctx, player, num );
    }
  
    async drawDiscs() {
        //clearCanvas();
        for (let i = 0; i < this.discs.length; i++) {
            await this.discs[i].draw();
        }
    }

    async drawGame() {
        await this.clearCanvas();
        this.drawBoard();
        this.drawDiscs();
        this.drawUI();
        this.drawButtons();
        this.drawTimer();
    }
      
    drawUI() {
        let font = "200 30px 'Baloo 2'";
        this.helper.drawText(this.player1 + ": " + this.playerScore1, 80, 40, undefined, "white");
        this.helper.drawText(
            this.player2 + ": " + this.playerScore2,
            this.width - 70,
            40,
            undefined,
            "white"
        );
        this.helper.drawText("Turno de " + this.actualPlayer, this.width / 2, 40, font, "white");

        
    }


    // Fin crear juego

    // Interfaz jugar,config,etc //

    async drawStart(width = 500, height = 400) {
        await this.clearCanvas();
        this.ctx.fillStyle = "#3A66DE";

        this.ctx.fillRect(
            (this.width / 2) - (width / 2),  
            (this.height / 2) - (height / 2), 
            width,
            height
        );
   
        this.drawButtons();
        await this.createBtnDiscP1(this.player1);
        await this.createBtnDiscP2(this.player2);
        await this.drawDiscs();
    }

    createBtnsPlayer1() {
        let posX = 50;
        let posY = 50;

        let btnIzq = this.createButton(" < ", posX, posY, "start", 30, 30);
        btnIzq.setAction("backp1");

        
        let btnDer = this.createButton(" > ", posX * 3, posY, "start", 30, 30);
        btnDer.setAction("nextp1");  

        this.buttons.push(btnIzq);
        this.buttons.push(btnDer);
    }

    async createBtnDiscP1() {
        // Disco visualizar
        let height = this.sizeDisc;
        let radius = this.radiusDisc;

        
        const img = new Image();
    
        let name = this.player1;
    
        img.src = "./././assets/juego/disc" + name + ".png";

        //console.log(img.src);
        
        await new Promise((resolve) => {
            img.onload = () => {
              //console.log("Imagen cargada. Inicializando juego.");
      
              resolve();
            };
      
            if (img.complete) {
              img.onload();
            }
          });
  
        let disc = this.createDisc(radius, img, 50 * 2, 50, this.player1);
        this.discs.push(disc);
        
    }

    createBtnsPlayer2() {
        let btnIzq = this.createButton(" < ", this.width - 150, 50, "start", 30, 30);
        btnIzq.setAction("backp2");

        let btnDer = this.createButton(" > ", this.width - 50, 50, "start", 30, 30);
        btnDer.setAction("nextp2");  

        this.buttons.push(btnIzq);
        this.buttons.push(btnDer);
    }

    async createBtnDiscP2() {
        // Disco visualizar
        let height = this.sizeDisc;
        let radius = this.radiusDisc;

    
        const img = new Image();
    
        let name = this.player2;
    
        img.src = "./././assets/juego/disc" + name + ".png";

        await new Promise((resolve) => {
            img.onload = () => {
              //console.log("Imagen cargada. Inicializando juego.");
      
              resolve();
            };
      
            if (img.complete) {
              img.onload();
            }
          });
  
        let disc = this.createDisc(radius, img, this.width - 100, 50, this.player2);
        this.discs.push(disc);
        
    }

    createBtnsStart() {
        const buttonTexts = ["Jugar", "Cambiar fondo", "Configuración"];

        const buttonX = this.width / 2;
        const startingY = this.height / 3;
        const spacing = 100; // Distancia vertical entre botones

        buttonTexts.forEach((text, index) => {
            const buttonY = startingY + index * spacing;
            let btn = this.createButton(text, buttonX, buttonY, "start");
            this.buttons.push(btn);
        });

        this.createBtnsPlayer1();
        this.createBtnsPlayer2();
    }

    createBtnsGame() {
        const buttonTexts = ["Reiniciar", "Salir"];

        const buttonX = 150;
        const startingY = this.height / 3;
        const spacing = 100; // Distancia vertical entre botones

        buttonTexts.forEach((text, index) => {
            const buttonY = startingY + index * spacing;
            let btn = this.createButton(text, buttonX, buttonY, "game");
            this.buttons.push(btn);
        });
    }

    changeBg() {
        this.bgImgName = this.bgImgName === "canchaArg.jpg" ? "canchaBr.jpg" : "canchaArg.jpg";
        this.bgImg.src = `./././assets/juego/${this.bgImgName}`;
        this.drawStart();
    }

    createButton(text, x, y, group, width = 160, height = 50, bgColor = undefined, colorText = undefined) {
        return new Button(this.ctx, text, x, y, width, height, group);  
    }

    drawButtons() {
        //clearCanvas();
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }
    }


    // Funciones Juego //

    nextP1() {
        if (this.player1 === "Argentina") {this.changeP1("Chile")}
        else {
            if (this.player1 === "Chile") this.changeP1("Italia");
        }
        
        this.drawStart();
        //console.log(this.player1);
    }

    backP1() {
        if (this.player1 === "Chile") {this.changeP1("Argentina")}
        else {
            if (this.player1 === "Italia") this.changeP1("Chile");
        }
        
        this.drawStart();
        //console.log(this.player1);
    }

    nextP2() {
        if (this.player2 === "Brasil") {this.changeP2("Peru")}
        else {
            if (this.player2 === "Peru") this.changeP2("Francia");
        }
        this.drawStart();
        
    }

    backP2() {
        if (this.player2 === "Peru") {this.changeP2("Brasil")}
        else {
            if (this.player2 === "Francia") this.changeP2("Peru");
        }

        this.drawStart();  
    }

    changeP1(p1) {
        this.player1 = p1;
    }

    changeP2(p2) {
        this.player2 = p2;
    }

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

                        let objY = obj.getPosY() + obj.getHeight() / 2;
                        this.animateDiscDrop(disc, objY, () => {

                            obj.markAsFilled(disc, c, i);
                            //this.drawGame();

                            // Movida logica de cambio de turno y winner aca por problemas de sincronizacion
                            this.togglePlayer();
                            if (this.checkWinner(disc)) {
                                disc.getPlayer() == game.getPlayer1()
                                                                ? game.addWinPlayer1()
                                                                : game.addWinPlayer2();

                                alert("Winner: " + disc.getPlayer());
                                this.resetGame(undefined, undefined, undefined, false);     // Para resetear las fichas pero no el score
                            }
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

        const self = this;

        function drop() {
            if (disc.getPosition().y < targetY) {  

                disc.setPosition(disc.getPosition().x, Math.min(disc.getPosition().y + speed, targetY));
                self.drawGame();
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

            // Contar hacia una dirección (derecha) y la contraria (izquierda)
            count += countInDirection(dir.x, dir.y);
            count += countInDirection(-dir.x, -dir.y);

            // Si hay 4 o más fichas consecutivas, se detecta victoria
            if (count >= 4) {
                return true;
            }
        }

        return false; // No hay victoria
    }
      
    togglePlayer() {
        this.actualPlayer = this.actualPlayer === this.player1 ? this.player2 : this.player1;
        this.drawGame();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timer > 0) {
                this.timer--; // resta un segundo
                this.drawGame();
                //console.log(this.timer);
                
            } else {
                clearInterval(this.timerInterval); // detiene el timer cuando llega a 0
                this.stopTimer()
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval); 
        this.timerInterval = null; 
    }

    resetTimer() {
        this.stopTimer(); 
        this.timer = this.initialTimerValue; 
    }

    drawTimer() {
        let posX = this.width / 2;
        let posY = this.height - (this.height - 80);
        this.helper.drawText(`${this.timer}`,  posX, posY, "400 30px Silkscreen", "white");
    }

    // Fin funciones juego

    // #Region Utils

    async clearCanvas() {
        await new Promise((resolve) => {
            this.bgImg.onload = () => {
              //console.log("Imagen cargada. Inicializando juego.");
      
              resolve();
            };
      
            if (this.bgImg.complete) {
                this.bgImg.onload();
            }
          });
        this.ctx.drawImage(this.bgImg, 0, 0, this.width, this.height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);
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

    resetWins() {
        this.playerScore1 = 0;
        this.playerScore2 = 0;
    }

    getButtons() {
        return this.buttons;
    }
}