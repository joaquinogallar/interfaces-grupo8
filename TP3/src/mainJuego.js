let canvas = document.querySelector("#canvas-juego");
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


const CANT_FIG = 10;

const sizeDisc = 50;                    // Tamaño del cuadrado del tablero
const radiusDisc = sizeDisc * 0.35;     // Radio de la ficha

let discs = [];
let holes = [];     // Board
const board = [];
let holesInsert = [];

const player1 = "Argentina";
const player2 = "Brasil";
let actualPlayer = player1;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;



// Funcion que crea el juego
function play() {
    let columns = 7;
    let rows = 6;

    let total = columns * rows;
    let discsForPlayer = total / 2;

    createBoard(columns,rows,"blue");        // Crea y dibuja el tablero con columnas y filas variables y color //


    createDiscs(player1, discsForPlayer, 300, 250);
    createDiscs(player2, discsForPlayer, 750, 250);

    drawGame();
}



// Add Figures

function addRect(rectWidth, rectHeight, posX, posY) {
    /*let rectWidth = 20;
    let rectHeight = 20;

    let posX = Math.round(Math.random() * (canvasWidth - rectWidth));
    let posY = Math.round(Math.random() * (canvasHeight - rectHeight));*/
    let color = randomRGBA();

    let rect = new Rect(posX, posY, rectWidth, rectHeight, color, ctx);
    figures.push(rect);
}

function addCircle(radius, posX, posY) {
    /*let radius = 10;

    let posX = Math.round(Math.random() * (canvasWidth - 2 * radius) + radius);
    let posY = Math.round(Math.random() * (canvasWidth - 2 * radius) + radius);*/
    let color = randomRGBA();

    let circle = new Circle(posX, posY, radius, color, ctx);
    //console.log(figures);
    figures.push(circle);
}

function addFigures() {
    addFigure();
    if (figures.length -1 < CANT_FIG) {
        setTimeout(addFigures, 333);
    }
}

function addFigure() {
    if (Math.random() > 0.5) {
        addRect(20, 20);
    }
    else {
        addCircle(10);
    }

}

// fin figuras

// Mouse Functions

function onMouseDown(e) {
    isMouseDown = true;
    //console.log("Mousedown");

    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null; 
    }

    let clickFig = findClickedDisc(e.layerX, e.layerY);
    if (clickFig != null) {
        if (clickFig.getJugador() === actualPlayer){
            clickFig.setResaltado(true);     

            document.body.style.cursor = 'grabbing';

            lastClickedFigure = clickFig;
            
        } else {
            document.body.style.cursor = 'not-allowed';
        }
    }
    //drawFigure();
}

function onMouseUp(e) {
    isMouseDown = false;
    document.body.style.cursor = 'default';
    if (lastClickedFigure != null) {
        if (putDisc(e.layerX, e.layerY, lastClickedFigure)){
            togglePlayer();
            // Animacion caida
        } else {
            // Hint error, no se puede poner la ficha ahi
        }
        
            
    }
    //console.log("Mouseup");
}

function onMouseMove(e) {
    //console.log("Mousemove");
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawGame();
    }


    // Cambiar style cursor para mostrar que puede o no agarrar otra ficha si no es el turno del jugador actual
    let fig = findClickedDisc(e.layerX, e.layerY);
    if (fig != null) {
        if(fig.getJugador() === actualPlayer && !fig.isUsed()) {
            if (!(document.body.style.cursor === 'grabbing')) {     // Para que no saque el "agarrando"
                //alert(fig.getInfo());
                
                document.body.style.cursor = 'grab';
            } else {
                  
                if (canPutDisc(e.layerX, e.layerY)) {
                    // Agregar Hint de se puede dropear 
                }
            }  
             
        } else {
            document.body.style.cursor = 'not-allowed';
        }
            
    } else {
        
        document.body.style.cursor = 'default';
    }

}

// fin mouse function

// Crear juego //

function createBoard(columns, rows, color) {

    const maxBoardSize = 400;

    // Crea la tabla del juego, agujero por agujero

    //let size = sizeDisc; // TAMAÑO DE AGUJERO//

    let sizeX = maxBoardSize / columns; // Tamaño del hole (cuadrado)
    let sizeY = maxBoardSize / rows; 

    let size = Math.min(sizeX, sizeY);

    let _posX = (canvasWidth / 2) - (size * columns / 2);  // POSICION INICIAL //
    let _posY = (canvasHeight / 2) - (size * rows / 2);
    
    let yInicial = _posY;
    

    for (let c = 0 ; c < columns; c++) {
        board[c] = [];
        for(let r = 0; r < rows; r++) {
            let hole = createHole(size, size, color, _posX, _posY)
            holes.push(hole);
            board[c][r] = hole;
            _posY += size;
        }
        _posY = yInicial;
        _posX += size;
    }
    
    // Visual borrar
    for (let c = 0; c < columns; c++) {
        let holeI = createHole(size,size, "gray"/* Reemplazar por "" para que sea invisible */ , board[c][0].getPosX(), board[c][0].getPosY() - size); 
        holesInsert.push(holeI);
    }
    
    drawBoard(); 
}

function createHole(rectHeight, rectWidth, color, posX, posY) {
    return new Hole(posX, posY, rectWidth, rectHeight, color, ctx, radiusDisc); 
}

function drawBoard() {
    for (let i= 0; i < holes.length; i++) {
        holes[i].draw();
    }
    for (let i= 0; i < holesInsert.length; i++) {
        holesInsert[i].draw();
    } 
}

function createDiscs(player, cant, _posX, _posY) {

    // Crea los discos para los jugadores

    let height = sizeDisc;
    let radius = radiusDisc;

    const img = new Image();

    let name = (player === player1) ? "P1" : "P2";
    img.src = '././assets/juego/disc' + name +'.png'; // Cambia esto a la ruta de tu imagen

    // Asegúrate de dibujar el disco después de que la imagen se haya cargado
    img.onload = () => {
        for (let i = 0 ; i < cant; i++) {
            let disc = createDisc(radius, img, _posX, _posY, player, i)
            discs.push(disc);
            _posY += height /3;
        }
        drawDiscs();
    }
}

function createDisc(radius, img, posX, posY, player, num) {
    return new Disc(posX, posY, radius, img, ctx, player, num + 1)
}

function drawDiscs() {
    //clearCanvas();
    for (let i= 0; i < discs.length; i++) {
        discs[i].draw();
    }
}

function drawGame() {
    clearCanvas();
    drawBoard();
    drawDiscs();
    drawUI();
}

function drawUI() {
    // Configura el estilo del texto
    let font = '30px Arial';   // Establece el tamaño y la fuente

    drawText('Turno de ' + actualPlayer, canvas.width / 2, 40, font)
}

// fin crear juego

// Funciones Juego //

function putDisc(posX, posY, disc) {
    let columna = canPutDisc(posX, posY);
    if (columna !== -1) {
        if (insertDisc(posX, posY, columna, 0, disc)) {
            return true;
        } else {
            //alert("No hay mas espacio"); 
            return false;
        }
    } 
    return false;
     
}

function insertDisc(x, y, c, i, disc) {

    if (i === board[c].length ) {
        return false;
    } else {

        let obj = board[c][i];
        if(obj) {

            let isFilled = obj.isFilled();
            if (isFilled) {
                return false;
            } else {

                if (!insertDisc(x, y, c, i + 1, disc)) {

                    obj.markAsFilled(disc);
                    drawGame();
                    return true;
                }

                
                
            }

        }

    }
    
    return true;
}

function canPutDisc(posX, posY) {
    for (let i = 0; i < holesInsert.length ; i++) {
        if (holesInsert[i].isPointInside(posX, posY)) { 
            return i;
        }
    }
    return -1;
}


function togglePlayer() {
    actualPlayer = (actualPlayer === player1) ? player2 : player1;
    drawGame();
}
//

/*
setTimeout(() => {
    ;
}, 333);*/


// #Region Utils

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawImage() {
    const img = new Image(); // Crea una nueva instancia de imagen
    img.src = '././assets/juego/hole.png'; // Cambia esto por la ruta de tu imagen

    img.onload = function() {
        const newWidth = 100;  // Establece el nuevo ancho que deseas
        const newHeight = 100; // Establece la nueva altura que deseas
        const x = 50; // Posición X en el canvas
        const y = 50; // Posición Y en el canvas
        
        ctx.drawImage(img, x, y, newWidth, newHeight);
    };
}

function randomRGBA() {
    const r = Math.floor(Math.random() * 156) + 100; // Valores entre 100 y 255 para evitar blancos
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    
    const a = (Math.random() * 0.5 + 0.5).toFixed(2);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function findClickedDisc(x, y) {
    for (let i = discs.length - 1; i >= 0; i--) {       // Esta al revez para que se agarre el que esta dibujado arriba, osea de los ultimos
        const element = discs[i];

        if (element.isPointInside(x, y)) {
            return element;
        }
    }
    return null;
}

function drawText(text, posX, posY, font, color = 'black') {
    // Configura el estilo del texto
    ctx.font = font;   // Establece el tamaño y la fuente
    ctx.fillStyle = color;   // Color del texto
    ctx.textAlign = 'center';  // Alineación del texto
    ctx.textBaseline = 'middle';  // Alineación vertical

    // Dibuja el texto en el canvas
    ctx.fillText(text, posX, posY);
}



// Fin utils

// BTN JUGAR //

let btnJugar = document.querySelector(".iniciar-juego button");

btnJugar.addEventListener("click", () => {
    clearCanvas();
    let container = document.querySelector(".juego-container");
    let inicioJuego = container.querySelector(".inicio-juego");
    let iniciarJuego = container.querySelector(".iniciar-juego");
    
    inicioJuego.style.background = "transparent";
    iniciarJuego.style.zIndex = 0;
    iniciarJuego.style.display = "none";
    

    let canvas = container.querySelector("canvas");

    canvas.style.zIndex = 10;
    canvas.classList.add("visible");

    play();
    
})

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);