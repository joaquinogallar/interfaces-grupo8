import { cargarJuegos } from './cargarJuegos.js';
import { initSwiper } from './initSwiper.js';

const swiperDestacados = initSwiper("#swiper-destacados", 4.5);
const swiperRecomendados = initSwiper("#swiper-recomendados", 6.5);

cargarJuegos("/data/juegosDestacados.json", "carrucel-destacados", "tarjeta-destacado-container", true, swiperDestacados);
cargarJuegos("/data/juegosRecomendados.json", "carrucel-recomendados", "tarjeta-recomendado-container", false, swiperDestacados);
