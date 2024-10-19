let canvas = document.querySelector("#canvas-juego");
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


const CANT_FIG = 10;

const sizeDisc = 50;
const radiusDisc = sizeDisc * 0.35;

let discs = [];
let holes = [];     // Board

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;


// Funcion que crea el juego
function play() {
    createBoard(7,6,"blue");

    createDiscs("Arg", 5);
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

    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
        
    }
    //drawFigure();
}

function onMouseUp(e) {
    isMouseDown = false;
    //console.log("Mouseup");
}

function onMouseMove(e) {
    //console.log("Mousemove");
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawGame();
    }
}

// fin mouse function

// Crear juego //

function createBoard(columns, rows, color) {

    let size = sizeDisc; // TAMAÑO DE AGUJERO//

    let percentageOffset = 0.4; // % del tamaño

    let offset = (size * columns) * percentageOffset; // tamaño total(width) - % del tamaño

    let _posX = (canvasWidth / 2) - (size / 2) - offset;  // POSICION INICIAL //
    let _posY = (canvasHeight / 2) - (size / 2);
    
    let yInicial = _posY;
    

    //let holes = [];

    for (let i = 0 ; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            let hole = createHole(size, size, color, _posX, _posY)
            holes.push(hole);
            _posY += size;
        }
        _posY = yInicial;
        _posX += size;
    }
    
    drawBoard(holes); 

   
}

function createHole(rectHeight, rectWidth, color, posX, posY) {
    return new Hole(posX, posY, rectWidth, rectHeight, color, ctx, radiusDisc);
    
}

function drawBoard() {
    for (let i= 0; i < holes.length; i++) {
        holes[i].draw();
    }
   //drawImage();
}

function createDiscs(imgName, cant) {
    let height = sizeDisc;
    let radius = radiusDisc;

    let percentageOffset = 0.4; // % del tamaño

    let offset = radius * percentageOffset; // tamaño total(width) - % del tamaño

    let _posX = (canvasWidth / 3) - (radius / 2) - offset;  // POSICION INICIAL //
    let _posY = (canvasHeight / 3) - (radius / 2);
    

    //let discs = [];

    const img = new Image();
    img.src = '././assets/juego/disc' + imgName +'.png'; // Cambia esto a la ruta de tu imagen

    // Asegúrate de dibujar el disco después de que la imagen se haya cargado
    img.onload = () => {

        for (let i = 0 ; i < cant; i++) {

            let disc = createDisc(radius, img, _posX, _posY)
            discs.push(disc);
            _posY += height;
        }
        

        drawDiscs();
    }
}

function createDisc(radius, img, posX, posY) {
    return new Disc(posX, posY, radius, img, ctx)
}

function drawDiscs(lastClicked) {
    //clearCanvas();
    for (let i= 0; i < discs.length; i++) {
        discs[i].draw();
    }
}

function drawGame() {
    clearCanvas();
    drawBoard();
    drawDiscs();
}

// fin crear juego

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

function findClickedFigure(x, y) {
    for (let i = 0; i < discs.length; i++) {
        const element = discs[i];
    
        if (element.isPointInside(x, y)) {
            //console.log(figures[i]);
            return element;
        }
    }
}

//

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