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

/* SE CREA UN SWIPER DE swiper.js CON LOS NOMBRES DE LAS CLASES  */
await newSwiper(
  ".carrusel-destacados-div",
  "tarjeta-destacado-container",
  "destacado"
);


// lógica sidebar
const sidebar = document.getElementById("sidebar");
const btnHamburguesa = document.getElementById("btn-hamburguesa");

btnHamburguesa.addEventListener("click", () => {
  sidebar.classList.toggle("desplegado");
});

