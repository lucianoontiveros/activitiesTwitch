import React from 'react'
import { usuariosActividades } from '../App.jsx';

const Comandos = (client, channel, command, username) => {
  const buscandoActividad = () => usuariosActividades.find((items) => items.username === username)
  switch (command) {
    case 'lachancla':
      buscandoActividad().estado = "Esta sometiendo al streamer a chanclasos 💥🩰"
      break;
    case 'cenar':
      buscandoActividad().estado = "Estoy cenando 🍴🥘🍷"
      break;
    case 'almorzar':
      buscandoActividad().estado = "Estoy almorzando 🥡🍱🥤"
      break;
    case 'desayunar':
      buscandoActividad().estado = "Estoy desayunando ☕🍪🍩"
      break;
    case 'merendar':
      buscandoActividad().estado = "Estoy a pura merienda 🥛🍰"
      break;
    case 'mate':
      buscandoActividad().estado = "Un rico matienzo 🧉"
      break;
    case 'té':
      buscandoActividad().estado = "Disfrutando de un buen té 🍵"
      break;
    case 'café':
      buscandoActividad().estado = "A tope de cafeína ☕"
      break;
    case 'agua':
      buscandoActividad().estado = "Hidrantando este cuerpazo 💧"
      break;
    case 'trabajar':
      buscandoActividad().estado = "Estoy trabajando 👔"
      break;
    case 'estudiar':
      buscandoActividad().estado = "estoy estudiando 📒📚"
      break;
    case 'tereré':
      buscandoActividad().estado = "Vamos con el tereré 🧉🍶"
      break;
    case 'organizar':
      buscandoActividad().estado = "Me encuentro organizando mis asuntos 📑"
      break;
    case 'meditar':
      buscandoActividad().estado = "Voy a meditar para alinerme 🧘‍♀️"
      break;
    case 'tarea':
      buscandoActividad().estado = "Acaba de agregar una tarea 📥"
      break;
    case 'lista':
      buscandoActividad().estado = "Esta revisando su lista de tareas 📃"
      break;
    case 'pickup':
      buscandoActividad().estado = "Acaba de marcar todas sus tareas como realizadas ✅"
      break;
    case 'delete':
      buscandoActividad().estado = "Acaba de eliminar todas sus tareas 🧺"
      break;
    case 'marcar':
      buscandoActividad().estado = "Acaba de marcar su tarea como realizada ✅"
      break;
    case 'eliminar':
      buscandoActividad().estado = "Acaba de eliminar su tarea ❌"
      break;
    case 'baño':
      buscandoActividad().estado = "Se fue a hacer la cacona o la pichona, no preguntar"
      break;
    case 'dientes':
      buscandoActividad().estado = "Se fue a cepillar sus dientitos 😁"
      break;
    case 'entrenar':
      buscandoActividad().estado = "🖖 Se fue a entrenar fuerte !!! ⏱"
      break;
    case 'focus':
      buscandoActividad().estado = "Ingresó un temporizador en pantalla ⏱"
      break;
    case 'estado':
      buscandoActividad().estado = "Está revisando sus datos registrados 📃"
      break;
    case 'actividad':
      buscandoActividad().estado = "Ingresó información a su estado 💽"
      break;
    case 'signo':
      buscandoActividad().estado = "Registró su signo zodiacal 🧘‍♂️"
      break;
    case 'instagram':
      buscandoActividad().estado = "Registró su perfil de Instragram 📷"
      break;
    case 'horario':
      buscandoActividad().estado = "Este es nuestro horario tentativo ⏰"
      break;
    case 'discord':
      buscandoActividad().estado = "Este es nuestro discord 📷🔊"
      break;
    case 'redes':
      buscandoActividad().estado = "Esta son las redes del cuarto 📱"
      break;
    case 'yaesta':
      buscandoActividad().estado = "🍃CHENZ YA ESTA LA SALA 🌳"
      break;
    case 'lee':
      buscandoActividad().estado = "LEE MI MENSAJE CARAJO 👓"
      break;
    case 'salitaespecial':
      buscandoActividad().estado = `Creando una salita especial 🌳`
      break;
    default:
      buscandoActividad().estado = "!comandos !tutoriales !info !chenz"
      return
  }


}

export default Comandos
