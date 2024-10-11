import { obtenerJuegoPorId } from "./obtenerJuegos.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const juego = await obtenerJuegoPorId(id);

const inicioJuego = document.querySelector(".inicio-juego");
const tituloJuego = document.querySelectorAll(".titulo-juego");
const descJuego = document.querySelector(".descripcion-juego");

inicioJuego.style.background = `url(${juego.imagen})`;
inicioJuego.style.backgroundSize = "cover";
inicioJuego.style.backgroundPosition = "center";

tituloJuego.forEach((titulo) => {
  titulo.innerHTML = juego.nombre;
});

descJuego.innerHTML = juego.descripcion;
