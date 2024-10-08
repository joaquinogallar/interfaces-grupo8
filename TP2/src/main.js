import { cargarJuegos } from "./cargarJuegos.js";
import { initSwiper } from "./initSwiper.js";
import { obtenerJuegosRandom } from "./obtenerJuegos.js";

console.log(obtenerJuegosRandom());


const swiperDestacados = initSwiper("#swiper-destacados", 4.5);
const swiperRecomendados = initSwiper("#swiper-recomendados", 6.5);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  6,
  "carrucel-destacados",
  "tarjeta-destacado-container",
  true,
  swiperDestacados
);
cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  10,
  "carrucel-recomendados",
  "tarjeta-recomendado-container",
  false,
  swiperDestacados
);
