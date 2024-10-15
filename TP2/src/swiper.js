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
      let add = "<div class='swiper-slide' id='" + i + "'>";
      let tipoBoton = "";
      let textoBoton = "Jugar";
      if (juego.precio <= 0) {
        juego.precio = null;
      } else {
        textoBoton = "Agregar al Carrito";
        tipoBoton = "color-boton-pago";
        if (juego.enCarrito) {
          tipoBoton += " enCarrito";
          textoBoton = "En Carrito";
        } else {
          tipoBoton += " noCarrito";
        }
      }

      add +=
        "<div class='tarjeta-juego " +
        tarjeta +
        " " +
        tipoBoton +
        "' style='background-image:url(\"" +
        juego.imagen +
        "\")';>";

      add +=
        "<div class='juego-precio-container precio-" +
        titulo +
        "'><span class='body0'>" +
        (juego.precio != null ? `$${juego.precio}` : "") +
        "</span> </div>";

      add += `
        <div class="juego-nombre-container">
          <h1 class="titulo-${titulo} h1alt">${juego.nombre}</h1>
          <button class="boton-juego boton-${titulo} ${tipoBoton} body1 boton-juego" data-id="${juego.id}">${textoBoton}</button>
        </div>`;

      carrusel.innerHTML += add;

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
      });
    }

    let slides = document.querySelectorAll(idCarrusel + " .swiper-slide");

    let btnNext = carrusel.nextElementSibling;
    let btnPrev = btnNext.nextElementSibling;

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

  console.log(juegos);
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
