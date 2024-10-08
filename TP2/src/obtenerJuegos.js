export const obtenerJuegos = async (url) => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("No se pudieron obtener los datos de los juegos");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    return [];
  }
};

export const obtenerJuegosRandom = async (cantidad, url) => {
  try {
    let juegos = await obtenerJuegos(url); // Obtener los juegos desde la URL
    if (cantidad >= juegos.length) return juegos; // Si la cantidad es mayor o igual que el número de juegos, devolver todos

    let juegosSeleccionados = [];
    let idsSeleccionados = new Set(); // Set para almacenar los IDs seleccionados y evitar duplicados

    // Buscar el juego con id 1 y agregarlo a la lista de seleccionados
    let juegoId1 = juegos.find(juego => juego.id === 1);
    if (juegoId1) {
      juegosSeleccionados.push(juegoId1);
      idsSeleccionados.add(juegoId1.id); // Añadir el id 1 al Set de seleccionados
    }

    let cantidadRestante = cantidad - juegosSeleccionados.length;

    while (juegosSeleccionados.length < cantidad) {
      let indiceAleatorio = Math.floor(Math.random() * juegos.length);
      let juegoAleatorio = juegos[indiceAleatorio];

      if (!idsSeleccionados.has(juegoAleatorio.id)) { 
        juegosSeleccionados.push(juegoAleatorio);
        idsSeleccionados.add(juegoAleatorio.id); 
      }
    }

    return juegosSeleccionados;
  } catch (error) {
    console.error("Error al obtener los juegos aleatorios: ", error);
    return [];
  }
};
