import { cargarJuegos } from "./cargarJuegos.js";
import { initSwiper } from "./initSwiper.js";
/*
const swiperDestacados = initSwiper(
  "#swiper-destacados",
  4.5,
  3.7,
  3.2,
  2.9,
  2.5,
  1.8,
  1
);
const swiperRecomendados1 = initSwiper(
  "#swiper-recomendados1",
  6.5,
  5.5,
  4.5,
  3.5,
  3.2,
  2.5,
  1.2
);
const swiperRecomendados2 = initSwiper(
  "#swiper-recomendados2",
  6.5,
  5.5,
  4.5,
  3.5,
  3.2,
  2.5,
  1.2
);
const swiperCategoria1 = initSwiper(
  "#swiper-categoria1",
  6.5,
  5.5,
  4.5,
  3.5,
  3.2,
  2.5,
  1.2
);*/
/*
const swiperDestacados = initSwiper("#swiper-destacados", 4.5);
const swiperRecomendados1 = initSwiper("#swiper-recomendados1", 6.5);
const swiperRecomendados2 = initSwiper("#swiper-recomendados2", 6.5);
const swiperCategoria1 = initSwiper("#swiper-categoria1", 6.5);*/


/* SE CREA UN SWIPER DE swiper.js CON LOS NOMBRES DE LAS CLASES  */
await newSwiper(".carrusel-destacados-div","tarjeta-destacado-container","destacado");

await newSwiper(".carrusel-recomendados-div","tarjeta-recomendado-container","recomendado");

await newSwiper(".carrusel-categoria1-div","tarjeta-categorias-container","categoria");

/*
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
);*/

// lógica sidebar
const sidebar = document.getElementById("sidebar");
const btnHamburguesa = document.getElementById("btn-hamburguesa");

btnHamburguesa.addEventListener("click", () => {
  sidebar.classList.toggle("desplegado");
});
