const obtenerJuegos = async (url) => {
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    console.error("No se pudieron obtener los datos de los juegos");
    return [];
  }
};

const cargarDestacados = async () => {
  let data = await obtenerJuegos("/data/juegos.json");
  console.log(data);

  const carrucelDestacados = document.getElementById("carrucel-destacados");

  for (let juego of data) {
    let swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    let container = document.createElement("div");
    container.classList.add("tarjeta-destacado-container");

    let precioContainer = document.createElement("div");
    precioContainer.classList.add("destacado-precio-container");
    let precio = document.createElement("span");
    precio.classList.add("body0");
    if (juego.precio == 0) {
      precio.innerText = "";
    } else {
      precio.innerText = juego.precio;
    }

    precioContainer.appendChild(precio);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("juego-destacado-container");
    let titulo = document.createElement("h1");
    titulo.classList.add("h1alt");
    titulo.innerText = juego.nombre;
    let boton = document.createElement("button");
    if(juego.precio == 0) {
      boton.innerText = "Jugar"
    } else if(juego.enCarrito) {
      boton.innerText = "En Carrito"
    } else {
      boton.innerText = "Agregar al Carrito"
    }

    infoContainer.appendChild(titulo);
    infoContainer.appendChild(boton);

    container.appendChild(precioContainer);
    container.appendChild(infoContainer);

    swiperSlide.appendChild(container);

    carrucelDestacados.appendChild(swiperSlide);
  }

  swiperDestacados.update();
};

cargarDestacados();

const swiperDestacados = new Swiper("#swiper-destacados", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 4.2,
});
