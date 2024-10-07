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
      console.error("Error al obtener los datos:", error);
      return [];
    }
  };
  