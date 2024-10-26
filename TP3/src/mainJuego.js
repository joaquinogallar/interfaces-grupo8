let canvas = document.querySelector("#canvas-juego");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let bgImg = new Image();
bgImg.src = "./../assets/juego/canchaArg.jpg";

const CANT_FIG = 10;

const sizeDisc = 50; // Tamaño del cuadrado del tablero
const radiusDisc = sizeDisc * 0.35; // Radio de la ficha

let discs = [];
let holes = []; // Board
const board = [];
let holesInsert = [];

const player1 = "Argentina";
const player2 = "Brasil";
let playerScore1 = 0;
let playerScore2 = 0;
let actualPlayer = player1;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

function resetGame() {
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
function play() {
  let columns = 7;
  let rows = 6;

  let total = columns * rows;
  let discsForPlayer = total / 2;

  createBoard(columns, rows, "blue"); // Crea y dibuja el tablero con columnas y filas variables y color //

  createDiscs(player1, discsForPlayer, 300, 250);
  createDiscs(player2, discsForPlayer, 750, 250);

  drawGame();
}

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
    if (clickFig.getPlayer() === actualPlayer) {
      clickFig.setResaltado(true);

      document.body.style.cursor = "grabbing";

      lastClickedFigure = clickFig;
    } else {
      document.body.style.cursor = "not-allowed";
    }
  }
  //drawFigure();
}

function onMouseUp(e) {
  isMouseDown = false;
  document.body.style.cursor = "default";
  if (lastClickedFigure != null) {
    if (putDisc(e.layerX, e.layerY, lastClickedFigure)) {
      togglePlayer();
      if (checkWinner(lastClickedFigure)) {
        lastClickedFigure.getPlayer() == player1
          ? playerScore1++
          : playerScore2++;
        alert("Winner: " + lastClickedFigure.getPlayer());
        resetGame();
      } else {
      }
      // Animacion caida
    } else {
      // Hint error, no se puede poner la ficha ahi
    }
  }
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
    if (fig.getPlayer() === actualPlayer && !fig.isUsed()) {
      if (!(document.body.style.cursor === "grabbing")) {
        // Para que no saque el "agarrando"
        //alert(fig.getInfo());

        document.body.style.cursor = "grab";
      } else {
        if (canPutDisc(e.layerX, e.layerY)) {
          // Agregar Hint de se puede dropear
        }
      }
    } else {
      document.body.style.cursor = "not-allowed";
    }
  } else {
    document.body.style.cursor = "default";
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

  let _posX = canvasWidth / 2 - (size * columns) / 2; // POSICION INICIAL //
  let _posY = canvasHeight / 2 - (size * rows) / 2;

  let yInicial = _posY;

  for (let c = 0; c < columns; c++) {
    board[c] = [];
    for (let r = 0; r < rows; r++) {
      let hole = createHole(size, size, color, _posX, _posY);
      holes.push(hole);
      board[c][r] = hole;
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
      board[c][0].getPosX(),
      board[c][0].getPosY() - size
    );
    holesInsert.push(holeI);
  }

  drawBoard();
}

function createHole(rectHeight, rectWidth, color, posX, posY) {
  return new Hole(posX, posY, rectWidth, rectHeight, color, ctx, radiusDisc);
}

function drawBoard() {
  for (let i = 0; i < holes.length; i++) {
    holes[i].draw();
  }
  // pinta los agujeros donde se sueltan las fichas
  // for (let i = 0; i < holesInsert.length; i++) {
  //   holesInsert[i].draw();
  // }
}

function createDiscs(player, cant, _posX, _posY) {
  // Crea los discos para los jugadores

  let height = sizeDisc;
  let radius = radiusDisc;

  const img = new Image();

  let name = player === player1 ? "P1" : "P2";
  img.src = "././assets/juego/disc" + name + ".png";

  img.onload = () => {
    for (let i = 0; i < cant; i++) {
      let disc = createDisc(radius, img, _posX, _posY, player, i);
      discs.push(disc);
      _posY += height / 3;
    }
    drawDiscs();
  };
}

function createDisc(radius, img, posX, posY, player, num) {
  return new Disc(posX, posY, radius, img, ctx, player, num + 1);
}

function drawDiscs() {
  //clearCanvas();
  for (let i = 0; i < discs.length; i++) {
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
  let font = "200 30px 'Baloo 2'";
  drawText(player1 + ": " + playerScore1, 80, 40, undefined, "white");
  drawText(
    player2 + ": " + playerScore2,
    canvasWidth - 70,
    40,
    undefined,
    "white"
  );
  drawText("Turno de " + actualPlayer, canvas.width / 2, 40, font, "white");
}

// fin crear juego

// Funciones Juego //

function putDisc(posX, posY, disc) {
  let columna = canPutDisc(posX, posY);
  if (columna !== -1) {
    if (insertDisc(posX, posY, columna, 0, disc)) {
      drawGame();
      return true;
    }
  }
  disc.returnToInitialPosition();
  drawGame();
  return false;
}

function insertDisc(x, y, c, i, disc) {
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

function animateDiscDrop(disc, targetY, onComplete) {
  let speed = 10;
  

  function drop() {
    if (disc.getPosition().y < targetY) {      
      disc.setPosition(disc.getPosition().x, Math.min(disc.getPosition().y + speed, targetY));
      drawGame();
      requestAnimationFrame(drop); 
    } else {
      if (onComplete) onComplete(); 
       //obj.markAsFilled(disc, disc.getPosition().x, targetY);

    }
  }

  requestAnimationFrame(drop); 
}


function canPutDisc(posX, posY) {
  for (let i = 0; i < holesInsert.length; i++) {
    if (holesInsert[i].isPointInside(posX, posY)) {
      return i;
    }
  }
  return -1;
}


function checkWinner(disc) {
  let boardPosition = disc.getBoardPosition();
  let col = boardPosition.c;
  let row = boardPosition.r;
  let player = disc.getPlayer();

  console.log("CHECK WINNER LOGS");
  console.log("Checking winner for player:", player);
  console.log("Disc position: col =", col, "row =", row);

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
    if (count >= 4) {
      return true; // Victoria
    }
  }

  return false; // No hay victoria

  alert(c + " " + r);
}

function togglePlayer() {
  actualPlayer = actualPlayer === player1 ? player2 : player1;
  drawGame();
}
//

/*
setTimeout(() => {
    ;
}, 333);*/

// #Region Utils

function clearCanvas() {
  bgImg.onload = function() { 
    ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawImage() {
  const img = new Image();
  img.src = "././assets/juego/hole.png";
  img.onload = function () {
    const newWidth = 100;
    const newHeight = 100;
    const x = 50;
    const y = 50;

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
  for (let i = discs.length - 1; i >= 0; i--) {
    // Esta al revez para que se agarre el que esta dibujado arriba, osea de los ultimos
    const element = discs[i];

    if (element.isPointInside(x, y)) {
      return element;
    }
  }
  return null;
}

function drawText(
  text,
  posX,
  posY,
  font = "bold 20px 'Baloo 2'",
  color = "black"
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

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
});

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);
