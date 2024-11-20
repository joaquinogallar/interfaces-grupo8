

let lineTop = document.getElementById('lin1');
let btnHamburguesa = document.getElementById('btn-hamburguesa');


let lineMid = document.getElementById('lin2');
let lineBot = document.getElementById('lin3');
let nav = document.getElementById('nav');
let header = document.getElementById('header');

let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');


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


let personaje5 = document.getElementById('personaje5');
let personaje4 = document.getElementById('personaje4');
let texto = document.getElementById('div-texto');
let contenedorImagenes = document.getElementById('div-contenedor-imagenes');
let seccion1 = document.getElementById('section1');




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

  document.addEventListener('scroll', function (e) {
    const scrollTop = window.scrollY; 
    
  
    
    if (scrollTop > 15) {
      logo.style.height = "86px";
      logo.style.width = "150px";
      logo.style.top = "20px";
      logo.style.left = "600px";
      logo.style.position = "fixed";
      header.style.backgroundColor = 'white';
    } else {
      logo.style.height = "320px";
      logo.style.width = "560px";
      logo.style.top = "55px";
      logo.style.left = "360px";
      logo.style.position = "absolute";
      header.style.backgroundColor = 'transparent';
    }
    moverSection1(scrollTop);
    moverSection2(scrollTop);
    seccion3(scrollTop);
  }
  ) 
  function moverSection1(scrollTop) {
    
   
  arbusto1.style.transform = `translateX(${scrollTop * -0.2}px)`;
  arbusto2.style.transform = `translateX(${scrollTop * -0.15}px)`;
  arbusto3.style.transform = `translateX(${scrollTop * 0.1}px)`;
  arbusto4.style.transform = `translateX(${scrollTop * 0.2}px)`;

  arbusto1.style.transform = `translateY(${scrollTop * -0.3}px)`;
  
  arbusto4.style.transform = `translateY(${scrollTop * 0.1}px)`;

  arbol1.style.transform = `translateX(${scrollTop * -0.5}px)`;
  arbol2.style.transform = `translateX(${scrollTop * 0.5}px)`;
  arbol3.style.transform = `translateX(${scrollTop * 0.5}px)`;
  arbol3.style.transform = `translateY(${scrollTop * -0.5}px)`;

  piedra1.style.transform = `translateX(${scrollTop * -0.1}px)`;
  piedra2.style.transform = `translateX(${scrollTop * 0.1}px)`;
  piedra3.style.transform = `translateX(${scrollTop * -0.2}px)`;
  piedra4.style.transform = `translateX(${scrollTop * 0.2}px)`;

  personaje1.style.transform = `translateY(${scrollTop * -0.2}px)`;
personaje2.style.transform = `translateY(${scrollTop * -0.15}px)`;
personaje3.style.transform = `translateY(${scrollTop * -0.1}px)`;
  
  }
  
  function moverSection2(scrollTop) {
    
   
    personaje4.style.transform = `translateY(${scrollTop * 0.07}px)`;
    personaje5.style.transform = `translateY(${scrollTop * -0.5}px)`;
    texto.style.transform = `translateY(${scrollTop * -0.05}px)`;
    
  }

  function seccion3(scrollTop){
console.log(scrollTop);
if(scrollTop>1400){
  console.log("entre");
  card1.style.animation = 'appear 1.3s ease-in-out forwards';
  card2.style.animation = 'appear 1.6s ease-in-out forwards';
  card3.style.animation = 'appear 2.1s ease-in-out forwards';
}
}
  