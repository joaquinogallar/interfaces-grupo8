const loadingDiv = document.querySelector("#loading-div");
const content = document.querySelector("#content");
const loadingPercentage = document.querySelector("#loading-percentage");

// Mostrar el loading y ocultar el contenido
loadingDiv.style.display = "flex";
content.style.display = "none";

// Variable para manejar el porcentaje
let percentage = 0;
loadingPercentage.textContent = `${percentage}%`;

const interval = setInterval(() => {
  percentage += 1;
  loadingPercentage.textContent = `${percentage}%`;

  if (percentage >= 100) {
    clearInterval(interval); // Detiene el contador cuando llega a 100%
  }
}, 45);

setTimeout(() => {
  loadingDiv.style.display = "none";
  content.style.display = "block";
}, 5000);
