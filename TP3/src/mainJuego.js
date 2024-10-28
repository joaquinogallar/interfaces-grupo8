let canvas = document.querySelector("#canvas-juego");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


const CANT_FIG = 10;

let discs = [];

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

let game = null;

let buttons = [];
const helper = new Helper(ctx);

function createGame(p1 = "Argentina", p2 = "Brasil") {
  game = new Game(ctx, canvasHeight, canvasWidth);

  game.start(p1, p2, undefined, 7, 6);

  discs = game.getDiscs();
  
  buttons = game.getButtons();
}

// Mouse Functions

function onMouseDown(e) {
  isMouseDown = true;
  //console.log("Mousedown");

  if (lastClickedFigure != null) {
    lastClickedFigure.setResaltado(false);
    lastClickedFigure = null;
  }

  let clickDisc = findClickedDisc(e.layerX, e.layerY);
  if (clickDisc != null) {
    if (clickDisc.getPlayer() === game.getActualPlayer()) {
      clickDisc.setResaltado(true);

      document.body.style.cursor = "grabbing";

      lastClickedFigure = clickDisc;
    } else {
      document.body.style.cursor = "not-allowed";
    }
    return; // Corta la funcion
  }

  let clickBtn = findClickedButton(e.layerX, e.layerY);

  if (clickBtn != null) {

    clickBtn.setResaltado(true);

    let action = clickBtn.getAction();
    switch (action) {
      case "Jugar": 
        game.play();
        break;
      case "Cambiar fondo":
        game.changeBg();
        break;
      case "Configuracion":
        alert(action);
        break;
      default: 
        alert(action);
    }

    lastClickedFigure = clickBtn;

    game.drawButtons();
  }
}

function onMouseUp(e) {//////
  isMouseDown = false;
  document.body.style.cursor = "default";
  if (lastClickedFigure != null) {

    if (lastClickedFigure.getType() === "disc" && game.putDisc(e.layerX, e.layerY, lastClickedFigure)) {
      game.togglePlayer();
      if (game.checkWinner(lastClickedFigure)) {

          lastClickedFigure.getPlayer() == game.getPlayer1()
            ? game.addWinPlayer1()
            : game.addWinPlayer2();

          alert("Winner: " + lastClickedFigure.getPlayer());
          
          game.resetGame();

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
    if (lastClickedFigure.getType() === "disc"){
      lastClickedFigure.setPosition(e.layerX, e.layerY);
      game.drawGame();
    }
  }

  // Cambiar style cursor para mostrar que puede o no agarrar otra ficha si no es el turno del jugador actual
  let fig = findClickedDisc(e.layerX, e.layerY);
  if (fig != null) {

      if (fig.getPlayer() === game.getActualPlayer() && !fig.isUsed()) {
        if (!(document.body.style.cursor === "grabbing")) {
          // Para que no saque el "agarrando"
          //alert(fig.getInfo());
  
          document.body.style.cursor = "grab";
        } else {
          if (game.canPutDisc(e.layerX, e.layerY)) {///////
            // Agregar Hint de se puede dropear
          }
        }
      } else {
        document.body.style.cursor = "not-allowed";
      }
    return;
  } else {
    document.body.style.cursor = "default";
  }

  let btn = findClickedButton(e.layerX, e.layerY);

  if (btn != null) {
    //Hover
    btn.setResaltado(true);
    game.drawStart();
    lastClickedFigure = btn;

  } else {
    if (game.getButtons().length > 0){
      // Sacar hover
      if (lastClickedFigure != null && lastClickedFigure.getType() === "button") {
        lastClickedFigure.setResaltado(false);
        game.drawStart();
        lastClickedFigure = null;
      }
    }
    
  }
}

// fin mouse function

/*
setTimeout(() => {
    ;
}, 333);*/


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
  let discs = game.getDiscs();
  if (!discs) return null;
  for (let i = discs.length - 1; i >= 0; i--) {
    // Esta al revez para que se agarre el que esta dibujado arriba, osea de los ultimos
    const element = discs[i];

    if (element.isPointInside(x, y)) {
      return element;
    }
  }
  return null;
}

function findClickedButton(x, y) {
  let btns = game.getButtons();
  if (!btns) return null;
  for (let i = btns.length - 1; i >= 0; i--) {
    // Esto da igual xq los btns no estan uno arriba de los otros
    // Esta al revez para que se agarre el que esta dibujado arriba, osea de los ultimos
    const element = btns[i];

    if (element.isPointInside(x, y)) {
      return element;
    }
  }
  return null;
}

// Fin utils

// BTN JUGAR //

let btnJugar = document.querySelector(".iniciar-juego button");

btnJugar.addEventListener("click", () => {
  //clearCanvas();
  let container = document.querySelector(".juego-container");
  let inicioJuego = container.querySelector(".inicio-juego");
  let iniciarJuego = container.querySelector(".iniciar-juego");

  inicioJuego.style.background = "transparent";
  iniciarJuego.style.zIndex = 0;
  iniciarJuego.style.display = "none";

  let canvas = container.querySelector("canvas");

  canvas.style.zIndex = 10;
  canvas.classList.add("visible");

  createGame();
});

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);
