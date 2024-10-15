/*  funcion para botones */
const likeButtons = document.querySelectorAll(".likeBtn");

likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active"); // Cambia la clase 'active' al hacer clic
  });
});

/*funcion para botones */
document.querySelectorAll(".btn-comprar").forEach(function (button) {
  button.addEventListener("click", function () {
    this.classList.toggle("clicked");

    if (this.classList.contains("clicked")) {
      this.innerHTML =
        '<img class"imagencs" src="/interfaces-grupo8/TP2/assets/facebookicon.png" alt="" >';
    } else {
      this.innerHTML = "Agregar al carrito";
    }
  });
});

async function newSwiper(idCarrusel, tarjeta, titulo) {
  const carrusel = document.querySelector(idCarrusel);

  let juegos = await get(
    "https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json"
  );

  if (idCarrusel !== ".carrusel-destacados-div") {
    juegos = juegos.sort(() => Math.random() - 0.5);
  }

  let i = 0;

  if (juegos) {
    for (const juego of juegos) {
      i++;
      let tipoBoton = [];
      let textoBoton = "Jugar";
      if (juego.precio <= 0) {
        juego.precio = null;
      } else {
        textoBoton = "Agregar al Carrito";
        tipoBoton.push("color-boton-pago");
        if (juego.enCarrito) {
          tipoBoton.push("enCarrito");
          textoBoton =
            "<img class='imagencs' src='https://github.com/joaquinogallar/interfaces-grupo8/blob/main/TP2/assets/il--cart.png?raw=true' alt='' >";
        } else {
          tipoBoton.push("noCarrito");
        }
      }

      // swiper
      let swiper = document.createElement("div");
      swiper.classList.add("swiper-slide");
      swiper.id = juego.id; 

      // containerTarjeta
      let tarjetaJuego = document.createElement("div");
      tarjetaJuego.classList.add("tarjeta-juego", tarjeta);
      
      tarjetaJuego.style.backgroundImage = `url(${juego.imagen})`;

      // precio
      let juegoPrecio = document.createElement("div");
      juegoPrecio.classList.add("juego-precio-container", `precio-${titulo}`);
      let spanPrecio = document.createElement("span");
      spanPrecio.classList.add("body0");
      spanPrecio.innerHTML = juego.precio != null ? `$${juego.precio}` : "";

      let juegoNombre = document.createElement("div");
      juegoNombre.classList.add("juego-nombre-container");
      let tituloJuego = document.createElement("h1");
      tituloJuego.classList.add("h1alt", `titulo-${titulo}`);
      tituloJuego.innerHTML = juego.nombre;
      let botonJuego = document.createElement("button");
      botonJuego.classList.add("boton-juego", `boton-${titulo}`, "body1");
      tipoBoton.forEach((tb) => botonJuego.classList.add(tb));
      botonJuego.setAttribute("data-id", juego.id);
      botonJuego.innerHTML = textoBoton;

      botonJuego.addEventListener("click", () => {
        if (juego.precio <= 0)
          window.location.href = `./juego.html?id=${juego.id}`;
        else{
          if (botonJuego.classList.contains("noCarrito")) {
          botonJuego.classList.add("enCarrito");
          botonJuego.classList.remove("noCarrito");
          botonJuego.classList.add("btn-comprar");
          console.log("a");
          
          botonJuego.innerHTML =
            "<img class='imagencs' src='https://github.com/joaquinogallar/interfaces-grupo8/blob/main/TP2/assets/il--cart.png?raw=true' alt='' >";
        } else {
          
          botonJuego.classList.remove("enCarrito");
          botonJuego.classList.add("noCarrito");
          
          botonJuego.innerHTML = "Agregar al Carrito";
        }}
      });

      juegoNombre.appendChild(tituloJuego);
      juegoNombre.appendChild(botonJuego);

      juegoPrecio.appendChild(spanPrecio);
      tarjetaJuego.appendChild(juegoPrecio);
      tarjetaJuego.appendChild(juegoNombre);
      swiper.appendChild(tarjetaJuego);

      carrusel.appendChild(swiper);
    }

    /* 
          carrusel.addEventListener("click", function (event) {
            if (juego.precio == null) {
              carrusel.addEventListener("click", function (event) {
                if (
                  event.target.classList.contains("boton-juego") &&
                  event.target.getAttribute("data-id") == juego.id
                ) {
                  const id = event.target.getAttribute("data-id");
                  window.location.href = `./juego.html?id=${id}`;
                } else if (event.target.classList.contains("noCarrito")) {
                  event.target.classList.add("enCarrito");
                  event.target.classList.remove("noCarrito");
                  event.target.innerHTML = "En Carrito";
                }
              });
            }
          }); */

    let slides = document.querySelectorAll(idCarrusel + " .swiper-slide");

    let padre = carrusel.parentElement.parentElement;

    let btnNext = padre.querySelector(".swiper-button-next");
    let btnPrev = padre.querySelector(".swiper-button-prev");

    let currentSlide = 0;
    let totalSlides = slides.length;

    btnNext.addEventListener("click", function () {
      let slide = carrusel.querySelector(".swiper-slide");
      let slideWidth = slide.offsetWidth;

      const maxSlidesVisible = Math.floor(carrusel.offsetWidth / slideWidth);

      if (currentSlide < totalSlides - maxSlidesVisible) {
        currentSlide++;
        carrusel.style.transform = `translateX(-${
          currentSlide * slideWidth
        }px)`; // Tamaño de slide
      }

      // Ocultar btnNext si llegamos al final
      if (currentSlide >= totalSlides - maxSlidesVisible) {
        btnNext.style.display = "none";
      } else {
        btnNext.style.display = "flex";
      }

      // Mostrar btnPrev si ya no estamos en el primer slide
      if (currentSlide > 0) {
        btnPrev.style.display = "flex";
      }
    });

    btnPrev.addEventListener("click", function () {
      let slide = carrusel.querySelector(".swiper-slide");
      let slideWidth = slide.offsetWidth;

      if (currentSlide > 0) {
        currentSlide--;
        carrusel.style.transform = `translateX(-${
          currentSlide * slideWidth
        }px)`; // Tamaño de slide
      }

      // Ocultar btnPrev si llegamos al primer slide
      if (currentSlide <= 0) {
        btnPrev.style.display = "none";
      } else {
        btnPrev.style.display = "flex";
      }

      // Mostrar btnNext si no estamos en el último slide
      if (currentSlide < totalSlides - maxSlidesVisible) {
        btnNext.style.display = "flex";
      }
    });

    // Configuración inicial: ocultar btnPrev si estamos en el primer slide
    if (currentSlide === 0) {
      btnPrev.style.display = "none";
    }
  }
}

async function get(url) {
  try {
    response = await fetch(url);
    if (!response.ok) {
      throw "Error en el fetch";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
