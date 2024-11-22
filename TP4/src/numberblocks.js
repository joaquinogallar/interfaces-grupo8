
const imagenes = ["./tp4/section2/img0.svg", "./tp4/section2/img1.svg", "./tp4/section2/img2.svg", "./tp4/section2/img3.svg"];
let lineTop = document.getElementById('lin1');
let btnHamburguesa = document.getElementById('btn-hamburguesa');
let currentIndex = 0;
const imagenRota = document.querySelector("#section2 #div-imagen");
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
let figura = document.getElementById('figura');
let logoHeader = document.getElementById('logo');
let personaje5 = document.getElementById('personaje5');
let personaje4 = document.getElementById('personaje4');
let texto = document.getElementById('div-texto');
let contenedorImagenes = document.getElementById('div-contenedor-imagenes');
let seccion1 = document.getElementById('section1');
let seccion33 = document.getElementById('section3')

let video = document.getElementById('div-video');

//Este metodo hace que cuando se cliquea el menu hamburguesa 
//se le cambia la clase para que 2 de las lineas cambien su angulo y una desaparezca a su vez despliega el nav.
btnHamburguesa.addEventListener('click', () => {
    //console.log("ENTRE");
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
//Esta funcion se activa cada que vez que se scrollea y lo que hace es primero ver cuanto se scrolleo, 
//a partir de los 15 pixeles se saca el logo de la primer seccion para colocarlo en el header.
// tambien usamos un else para que cuando vuelva hacia arriba cambie a su estado original.
  document.addEventListener('scroll', function (e) {
    const scrollTop = window.scrollY; 
    
  
    
    if (scrollTop > 15) {
     
      logo.style.opacity = 0 ;
      header.style.display = "flex";
      logoHeader.style.opacity = 1 ;
      header.style.backgroundImage = "url('./tp4/section1/header.png')";
    } else {
      logo.style.opacity = 1 ;
      logo.style.height = "320px";
      logo.style.width = "560px";
      logo.style.top = "55px";
      logo.style.left = "360px";
      logo.style.position = "absolute";
      header.style.backgroundColor = 'transparent';
      header.style.backgroundImage = "linear-gradient(to bottom, #00D1D5 0%, #00D1D5 88%)";
      logoHeader.style.opacity = 0;
    }
    moverSection1(scrollTop);
    moverSection2(scrollTop);
    seccion3(scrollTop);
    moverSeccion5(scrollTop);
  }
  ) 
  //La funcion utiliza la variable scrollTop que indica cuanto se scrolleo, lo que hace es utilizar este valor 
  //para trasladar los objetos en x e y generando movimientos a partir del scroll.
  function moverSection1(scrollTop) {
    
   
  arbusto1.style.transform = `translateX(${scrollTop * -0.2}px)`;
  arbusto2.style.transform = `translateX(${scrollTop * -0.15}px)`;
  arbusto3.style.transform = `translateX(${scrollTop * 0.1}px)`;
  arbusto4.style.transform = `translateX(${scrollTop * 0.2}px)`;

  arbusto1.style.transform = `translateY(${scrollTop * -0.3}px)`;
  
  arbusto4.style.transform = `translateY(${scrollTop * 0.1}px)`;

  arbol1.style.transform = `translateX(${scrollTop * -0.5}px)`;
  arbol2.style.transform = `translateX(${scrollTop * 0.3}px)`;
  arbol3.style.transform = `translateX(${scrollTop * 0.2}px)`;
  arbol3.style.transform = `translateY(${scrollTop * -0.15}px)`;

  piedra1.style.transform = `translateX(${scrollTop * -0.10}px)`;
  piedra2.style.transform = `translateX(${scrollTop * 0.1}px)`;
  piedra3.style.transform = `translateX(${scrollTop * 0.2}px)`;
  piedra4.style.transform = `translateX(${scrollTop * 0.2}px)`;

  personaje1.style.transform = `translateY(${scrollTop * -0.4}px)`;
personaje2.style.transform = `translateY(${scrollTop * -0.2}px)`;
personaje3.style.transform = `translateY(${scrollTop * -0.6}px)`;
  
  }
  
  //Realiza lo mismo que la funcion moverSection1 .
  function moverSection2(scrollTop) {
    
   
    personaje4.style.transform = `translateY(${scrollTop * -0.076}px)`;
    personaje5.style.transform = `translateY(${scrollTop * -0.18}px)`;
    texto.style.transform = `translateY(${scrollTop * -0.08}px)`;
    
  }
//Esta funcion se fija que haya llegado a una parte de la pagina donde sean visibles
// las cards y activa una animacion ya declarada en el css. 
//Lo unico que hace esta funcion es indicar la diferencia de tiempo en las que aparecen las cards en segundos.
  function seccion3(scrollTop){
  //console.log(scrollTop);
  if(scrollTop>1400){
    
    card1.style.animation = 'appear 1.3s ease-in-out forwards';
    card2.style.animation = 'appear 1.6s ease-in-out forwards';
    card3.style.animation = 'appear 2.1s ease-in-out forwards';
  }
}
  //esta funcion utiliza un arreglo de imagenes, al principio define el style opacity en 0   
 // luego utiliza un setTimeout para que la imagen desaparezca y a los 900 ms aparezca la otra
 //, esto se combina con el transition en css, a su vez utiliza un setInterval para que la funcion se ejecute cada 3 segundos.
 //El current index se itera hasta que este en el limite del arreglo y vuelve a la primer imagen

function rotarImagen() {

  //console.log("ENTRESSESES");
  imagenRota.style.opacity = 0;
  setTimeout(() => {
    
    if(currentIndex == imagenes.length -1 ){
      currentIndex = 0;
    } else{
      currentIndex++;
    }
  // console.log(currentIndex); 
    
    imagenRota.style.backgroundImage = `url(${imagenes[currentIndex]})`;
    
    imagenRota.style.opacity = 1;
  }, 900);

}
setInterval(rotarImagen, 3000);

/* Sección 3 */
const figuras = document.getElementById("figuras");

figuras.addEventListener("mousemove", (e) => {
  const rect = figuras.getBoundingClientRect();
  const x = e.clientX - rect.left; // Coordenada x dentro del contenedor
  const y = e.clientY - rect.top; // Coordenada y dentro del contenedor  

  const moveX = (x / rect.width - 0.8) * -10;
  const moveY = (y / rect.height - 0.8) * -10;
  figuras.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
})

// figuras.addEventListener('mouseleave', () => {
//    figuras.style.backgroundPosition = 'center';
// });


/* Codigo para la seccion4, observa todos los divs y cuando uno esta en el campo de vision(medio) se cambia la
 imagen por su respectiva */

 const images = [
  "./tp4/section4/figure0.svg",
  "./tp4/section4/figure1.svg",
  "./tp4/section4/figure2.svg",
  "./tp4/section4/figure3.svg",
  "./tp4/section4/figure4.svg",
  "./tp4/section4/figure5.svg",
  "./tp4/section4/figure6.svg",
  "./tp4/section4/figure7.svg",
  "./tp4/section4/figure8.svg",
  "./tp4/section4/figure9.svg",
  "./tp4/section4/figure10.svg",
];

// Precargar las imagenes
const preloadedImages = [];
images.forEach(src => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});

let ultimaImagen = 0;

const imagen = document.querySelector("#section4 #imagen-section4");


  const alert = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let index = entry.target.dataset.columnaid - 1;
          
          if(index != ultimaImagen){
            // console.log(imagen);
            imagen.classList.add('hidden'); // Ocultar con animacion
            setTimeout(() => {  // Espera a que la animacion de la otra imagen termine
              imagen.src = preloadedImages[index].src; 
              imagen.classList.remove('hidden'); // Mostrar con animación
            }, 200); 
            ultimaImagen = index;
          }
        }
      });
  };

  const options = {
    root: null, 
    rootMargin: '-200px 0px', 
    threshold: 1
  };

  const observer = new IntersectionObserver(alert, options);

  document.querySelectorAll('#section4 .div-texto').forEach(div => {
    observer.observe(div);
  })

//Primero necesitamos saber cuanto es necesario scrollear para alcanzar esa seccion, 
//luego definimos un rango visible, si se scrolleo lo suficiente para llegar a la seccion 5
//se hace un calculo utilizando lo scrolleado - el inicio de la seccion sobre el rango visible para con eso modificar el traslado de las figuras 
function moverSeccion5(scrollTop) {
  const inicioSeccion5 = 10900; 
  const rangoVisible = 2000;   

  if (scrollTop > inicioSeccion5) {
      
      const desplazamiento = (scrollTop - inicioSeccion5) / rangoVisible;

          figura.style.transform = `translateY(${desplazamiento * 350}px)`;
          video.style.transform = `translateY(${desplazamiento * 240}px)`;
      
  }
}

// Sección 9
const spriteImage = document.getElementById('sprite-image');
imagesS9 = ['ss01.png', 'ss02.png', 'ss03.png', 'ss04.png', 'ss05.png'];
let currentIndexS9 = 0; setInterval(() => { currentIndexS9 = (currentIndexS9 + 1) % imagesS9.length;
  spriteImage.src = "./tp4/section9/" + imagesS9[currentIndexS9]; 
}, 100);