import { obtenerJuegoPorId } from "./obtenerJuegos.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const juego = await obtenerJuegoPorId(id);

console.log(juego);


const nombreJuego = document.querySelector(".nombre-juego");
const inicioJuego = document.querySelector(".inicio-juego")
const tituloJuego = document.querySelector(".titulo-juego")

nombreJuego.innerHTML = juego.nombre
inicioJuego.style.background = `url(${juego.imagen})`
inicioJuego.style.backgroundSize = "cover"
inicioJuego.style.backgroundPosition = "center"
tituloJuego.innerHTML = juego.nombre