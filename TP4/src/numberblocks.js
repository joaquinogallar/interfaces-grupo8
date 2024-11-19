try {
    const data = localStorage.getItem('clave'); // Intento de lectura
    console.log(data);
} catch (error) {
    console.error("Error al acceder al almacenamiento local:", error);
}


let lineTop = document.getElementById('lin1');
let btnHamburguesa = document.getElementById('btn-hamburguesa');


let lineMid = document.getElementById('lin2');
let lineBot = document.getElementById('lin3');
let nav = document.getElementById('nav');
let header = document.getElementById('header');


let arbol3 = document.querySelector('#arbol3');
let arbol2 = document.querySelector('#arbol2');
let piedra3 = document.querySelector('#piedra3');
let piedra1 = document.querySelector('#piedra1');
let piedra4 = document.querySelector('#piedra4');
let personaje3 = document.querySelector('#personaje3');
let personaje2 = document.querySelector('#personaje2');
let personaje1 = document.querySelector('#personaje1');
let arbol1 = document.querySelector('#arbol1');
let piedra2 = document.querySelector('#piedra2');
let arbusto1 = document.querySelector('#arbusto1');
let arbusto2 = document.querySelector('#arbusto2');
let arbusto3 = document.querySelector('#arbusto3');
let arbusto4 = document.querySelector('#arbusto4');
let logo = document.querySelector('#logo1');


let personaje5 = document.getElementById('personaje-5');
let personaje4 = document.getElementById('personaje-4');
let texto = document.getElementById('div-texto');
let contenedorImagenes = document.getElementById('div-contenedor-imagenes');
let seccion1 = document.getElementById('section1');
let seccion4 = document.querySelector('.section4');
let seccion7 = document.getElementById('section7');


btnHamburguesa.addEventListener('click', () => {
    console.log("ENTRE");
    if (lineTop.classList.contains('active')) {
      lineTop.classList.remove('active');
      lineMid.classList.remove('active');
      lineBot.classList.remove('active');
      nav.style.display = "none";
    } else {
      lin1.classList.add('active');
      lin2.classList.add('active');
      lin3.classList.add('active');
      nav.style.display = 'block';
    }
  });