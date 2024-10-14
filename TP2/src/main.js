/* SE CREA UN SWIPER DE swiper.js CON LOS NOMBRES DE LAS CLASES  */
await newSwiper(
  ".carrusel-destacados-div",
  "tarjeta-destacado-container",
  "destacado"
);

await newSwiper(
  ".carrusel-recomendados-div",
  "tarjeta-recomendado-container",
  "recomendado"
);

await newSwiper(
  ".carrusel-categoria1-div",
  "tarjeta-categorias-container",
  "categoria"
);

// lógica sidebar
const sidebar = document.getElementById("sidebar");
const btnHamburguesa = document.getElementById("btn-hamburguesa");

btnHamburguesa.addEventListener("click", () => {
  sidebar.classList.toggle("desplegado");
});

