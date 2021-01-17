import { equipos } from './utilidades.js'
import Mundial from './ClaseMundial.js'

//1. Inicializar la clase
const mundial = new Mundial(equipos)

//2. Mostrar los nombres de los equipos clasificados a la fase de eliminatorias
console.log('==========Inicia el mundial==========')
const nombresDeEquipos = mundial.equipos.map(equipo => equipo.nombre)

//3. Mostrar la planificación de las fases
mundial.planificarFasesPartidos()

//4. Mostrar las fases y sus partidos
let f = 1
mundial.partidoPorFase.forEach((fase) => {
  console.log(`Fase ${f}`)
  for (let i = 0; i < fase.length; i++) { 
    const equipoLocal = fase[i][0]
    const equipoVisitante = fase[i][1]
    console.log(` ${equipoLocal.nombre} VS ${equipoVisitante.nombre}`)
  }
  f++
})

//5. Comenzar el mundial
mundial.comenzar()

//6. Mostrar la tabla de resultados del mundial
mundial.resumenes.forEach((resumen, index) => {
  console.log(`----------Resumen de fase ${index + 1}----------`)
  console.table(resumen.map(partido => {
    return {
      "Equipo local": partido.equipoLocal,
      "Goles": `${partido.golesLocal} - ${partido.golesVisitante}`,
      "Equipo visitante": partido.equipoVisitante,
      Ganador: partido.ganador
    }
  }))
})