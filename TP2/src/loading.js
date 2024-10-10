const loadingDiv = document.querySelector('#loading-div');

const content = document.querySelector('#content');

// Mostrar el loading y ocultar el contenido
loadingDiv.style.display = 'flex';
content.style.display = 'none'; 

// Después de 5 segundos
setTimeout(() => {
  loadingDiv.style.display = 'none'; 
  content.style.display = 'block'; 
    console.log("asd");
  }, 8000);