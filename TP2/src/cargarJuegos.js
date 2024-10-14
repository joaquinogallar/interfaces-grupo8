import { obtenerJuegosRandom } from "./obtenerJuegos.js";

export const cargarJuegos = async (
  url,
  cantidadJuegos,
  carruselId,
  claseContainer,
  esDestacado,
  swiperInstance
) => {
  const data = await obtenerJuegosRandom(url, cantidadJuegos);

  const carrusel = document.getElementById(carruselId);

  for (let juego of data) {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    const container = document.createElement("div");
    container.classList.add("tarjeta-juego", claseContainer);
    container.style.backgroundImage = `url(${juego.imagen})`;

    const precioContainer = document.createElement("div");
    precioContainer.classList.add("juego-precio-container");

    const precio = document.createElement("span");
    precio.classList.add("body0");
    precio.innerText = juego.precio === 0 ? "" : `$${juego.precio}`;
    precioContainer.appendChild(precio);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("juego-nombre-container");

    const titulo = document.createElement("h1");
    titulo.classList.add();
    if (esDestacado) titulo.classList.add("titulo-destacado", "h1alt");
    else titulo.classList.add("body1");
    titulo.innerText = juego.nombre;

    const boton = document.createElement("button");
    boton.classList.add("boton-juego");
    boton.id = juego.id;

    if (esDestacado) boton.classList.add("boton-destacado", "body1");
    else boton.classList.add("body3");

    if (juego.precio == 0) {
      boton.innerText = "Jugar";
      boton.addEventListener("click", () => redireccion(juego.id));
    } else {
      boton.classList.add("color-boton-pago");
      boton.innerText = juego.enCarrito ? "En Carrito" : "Agregar al Carrito";
      if (juego.enCarrito) {
        precioContainer.classList.add("enCarrito");
        infoContainer.classList.add("enCarrito");
      }
    }

    infoContainer.appendChild(titulo);
    infoContainer.appendChild(boton);

    container.appendChild(precioContainer);
    container.appendChild(infoContainer);

    swiperSlide.appendChild(container);
    carrusel.appendChild(swiperSlide);
  }

  if (swiperInstance) swiperInstance.update();
};

const redireccion = (id) => {
  window.location.href = `./juego.html?id=${id}`;
};
