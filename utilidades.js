export function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}

//Equipos calificados a la fase de eliminatorias del mundial Rusia 2018
export const equipos = ['Uruguay', 'Portugal', 'Francia', 'Argentina', 'Brasil', 'México', 'Bélgica', 'Japón', 'España', 'Rusia', 'Croacia', 'Dinamarca', 'Suecia', 'Suiza', 'Colombia', 'Inglaterra']