import { cargarJuegos } from "./cargarJuegos.js";
import { initSwiper } from "./initSwiper.js";

const swiperDestacados = initSwiper("#swiper-destacados", 4.5);
const swiperRecomendados1 = initSwiper("#swiper-recomendados1", 6.5);
const swiperRecomendados2 = initSwiper("#swiper-recomendados2", 6.5);
const swiperCategoria1 = initSwiper("#swiper-categoria1", 6.5);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  6,
  "carrusel-destacados",
  "tarjeta-destacado-container",
  true,
  swiperDestacados
);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  10,
  "carrusel-recomendados1",
  "tarjeta-recomendado-container",
  false,
  swiperRecomendados1
);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  10,
  "carrusel-recomendados2",
  "tarjeta-recomendado-container",
  false,
  swiperRecomendados2
);

cargarJuegos(
  "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json",
  10,
  "carrusel-categoria1",
  "tarjeta-recomendado-container",
  false,
  swiperCategoria1
);

// lógica sidebar
const sidebar = document.getElementById("sidebar");
const btnHamburguesa = document.getElementById("btn-hamburguesa");

btnHamburguesa.addEventListener("click", () => {
  sidebar.classList.toggle("desplegado");
});
