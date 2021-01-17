import { shuffle } from './utilidades.js'

export default class Mundial {
  constructor(equipos=[]) {
    this.partidoPorFase = []
    this.partido = []
    this.resumenes = []
    this.establecerEquipos(equipos)
    this.planificarFases()
  }

  establecerEquipos(nombresDeEquipos) {
    this.equipos = []
    for (const nombreDeEquipo of nombresDeEquipos) {
      const equipo = this.personalizarEquipos(nombreDeEquipo)
      this.equipos.push(equipo)
    }
    shuffle(this.equipos)
  }
  personalizarEquipos(nombreDeEquipo) {
    return {
      nombre: nombreDeEquipo,
      goles: 0,
      partidoGanado: undefined
    }
  }
  planificarFases() {
    const fase = [];
    const numeroDeEquipos = this.equipos.length;
    
    for (let i=0; i<numeroDeEquipos; i+=2) {
      const partido = [this.equipos[i], this.equipos[i+1]];
      fase.push(partido) 
    }
    
    this.partidoPorFase.push(fase)
  }
  obtenerEquipos() {
    return this.equipos.map(equipo => equipo.nombre)
  }
  formarEquiposLocales(fase) {
    const nombresDeEquipos = this.obtenerEquipos()
    const maxEquiposLocales = nombresDeEquipos - 1
    let contadorEquipo = 0
    this.partidoPorFase.forEach(fase => {
      this.partido[0] = nombresDeEquipos[contadorEquipo]
        contadorEquipo++
        if (contadorEquipo > maxEquiposLocales) {
          contadorEquipo = 0
        }
      fase.push(partido);
    })
  }
  formarEquiposVisitantes(fase) {
    const nombresDeEquipos = this.obtenerEquipos()
    const maxEquiposVisitantes = nombresDeEquipos - 1
    let contadorEquipo = maxEquiposVisitantes
    this.partidoPorFase.forEach(fase => {
      this.partido[1] = nombresDeEquipos[contadorEquipo]
        contadorEquipo--
        if (contadorEquipo < 0) {
          contadorEquipo = maxEquiposVisitantes
        }
      fase.push(partido);
    })
  }
  planificarFasesPartidos() {
    for (let i=0; i<this.fases; i++) {
      const nuevaFase = this.crearFase()
      this.partidoPorFase = this.partidoPorFase.concat(nuevaFase)
    }
  }
  crearFase() {
    const nuevaFase = []
    this.planificarFases(nuevaFase)
    this.formarEquiposLocales(nuevaFase)
    this.formarEquiposVisitantes(nuevaFase)
    return nuevaFase
  }
  comenzar() {
    for (const fase of this.partidoPorFase) {
      const faseResumen = []

      for (let i = 0; i < fase.length; i++) {
        const resultado = this.jugar(fase[i])
        let clasificacion = this.actualizarEquipos(resultado)
        faseResumen.push(clasificacion)
      }
      
      this.resumenes.push(faseResumen)
      
      if (!this.nuevaFase()) {
        break;
      }
    } 
  }
  generarGoles() {
    return Math.round((Math.random() * 10))
  }
  jugar(partido) {
    const golesLocal = this.generarGoles()
    const golesVisitante = this.generarGoles()
    return {
      equipoLocal: partido[0].nombre,
      golesLocal,
      equipoVisitante: partido[1].nombre,
      golesVisitante,
    }
  }
  obtenerEquipoPorNombre(nombre) {
    return this.equipos.find(equipo => equipo.nombre == nombre)
  }
  actualizarEquipos(resultado) {
    let ganador;
    const equipoLocal = this.obtenerEquipoPorNombre(resultado.equipoLocal)
    const equipoVisitante = this.obtenerEquipoPorNombre(resultado.equipoVisitante)

    if(resultado.equipoLocal > resultado.equipoVisitante) {
      equipoLocal.partidoGanado = true
      ganador = resultado.equipoLocal

    } else if (resultado.equipoLocal < resultado.equipoVisitante) {
      equipoVisitante.partidoGanado = true
      ganador = resultado.equipoVisitante

    } else if (equipoLocal.partidoGanado = equipoVisitante.partidoGanado) {
      this.actualizarEquipos()

    } else { 
      [equipoLocal, equipoVisitante].sort()[0]
    }
    resultado = {...resultado, ganador}
    return resultado
  }
  nuevaFase () {
    let indice = this.resumenes.length - 1
    let equipos = this.resumenes[indice].map((partido) => partido.ganador)
    let nuevosPartidos = []

    if (equipos.length < 2) {
      return false
    }

    for (let i = 0; i < equipos.length; i += 2) {
      let partido = [
        {
          nombre: equipos[i],
          goles: 0,
          partidoGanado: undefined
        }, 
        {
          nombre: equipos[i + 1],
          goles: 0,
          partidoGanado: undefined
        }
      ]
      nuevosPartidos.push(partido);
    }

    this.partidoPorFase.push(nuevosPartidos);
    return true;
  }
}