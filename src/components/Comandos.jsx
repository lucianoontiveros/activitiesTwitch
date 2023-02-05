import React from 'react'
import { usuariosActividades } from '../App.jsx';

const Comandos = (client, command, username) => {
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
      client.say(channel, `En estos momentos ${username} indicó que está trabajando 🦺`)
      break;
    case 'estudiar':
      buscandoActividad().estado = "estoy estudiando 📒📚"
      client.say(channel, `En estos momentos ${username} indicó que está estudiando 💻`)
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
    default:
      buscandoActividad().estado = "!comandos !tutoriales !info !chenz"
      return
  }


}

export default Comandos
