import { cargarJuegos } from "./cargarJuegos.js";
import { initSwiper } from "./initSwiper.js";

const swiperDestacados = initSwiper("#swiper-destacados", 4.5);
const swiperRecomendados = initSwiper("#swiper-recomendados", 6.5);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegosDestacados.json",
  "carrucel-destacados",
  "tarjeta-destacado-container",
  true,
  swiperDestacados
);
cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegosRecomendados.json",
  "carrucel-recomendados",
  "tarjeta-recomendado-container",
  false,
  swiperDestacados
);
