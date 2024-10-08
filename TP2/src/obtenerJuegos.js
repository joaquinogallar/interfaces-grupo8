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

export const obtenerJuegosRandom = async (url, cantidad) => {
  try {
    let juegos = await obtenerJuegos(url);
    if (cantidad >= juegos.length) return juegos; // si la cantidad es mayor o igual que el número de juegos, devolver todos

    let juegosSeleccionados = [];
    let idsSeleccionados = new Set(); // set para evitar repetidos

    let juegoId1 = juegos.find(juego => juego.id === 1);
    if (juegoId1) {
      juegosSeleccionados.push(juegoId1);
      idsSeleccionados.add(juegoId1.id); // Añadir el id 1 al Set de seleccionados
    }

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
