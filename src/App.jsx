import { set } from "mongoose";
import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import tmi from 'tmi.js'
import MensajeEmergente from "./components/mensajeEmergente"


const usuariosActividades  = []
class Actividad {
  constructor(usuario, estado){
    this.usuario = usuario;
    this.estado = estado;
  }
}

function App() {
  const tmiClient  = useRef(
    new tmi.Client({
      options: { debug: true },
      identity: {
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
      },
      channels: [ import.meta.env.VITE_CHANNELS ]
    })
  );
  
  const [ active, setActive] = useState(false)
  const [usuarioActual, setUsuarioActual] = useState({usuario:'', estado:''})
  const mostrarUsuario = (usuario, estado) => {
    console.log('comenzo a ejecutarse')
    setUsuarioActual({usuario,estado})
    if (active) return 
    setActive(true)
    setTimeout(()=> {
      setActive(false)
    },60000)
  }
 
  useEffect(() => {
    tmiClient.current.connect();
    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;
      var usuario = tags.username;
      const actividadesPerfil = () => usuariosActividades.findIndex((items) => items.usuario === usuario)
      const buscandoActividad = () => usuariosActividades.find((items) => items.usuario === usuario)
      
      if(actividadesPerfil() === -1) {
        let estado = 'Acaba de ingresar al chat 📱';
        let actividad = new Actividad(usuario, estado)
        usuariosActividades.push(actividad) 
        mostrarUsuario(usuario,estado)
        return  tmiClient.current.say(channel,"El usuario fue registrado")
      } 

      

      /* Se establece la indicaciones para los comandos */
      if(self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const command = args.shift().toLowerCase();



      switch (command) {
        case 'echo':
          tmiClient.current.say(channel, `@${usuario}, you said: "${args.join(' ')}"`);
          break;
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
          tmiClient.current.say(channel,`En estos momentos ${usuario} indicó que está trabajando 🦺` )
          break;
        case 'estudiar':
          buscandoActividad().estado = "estoy estudiando 📒📚"
          tmiClient.current.say(channel,`En estos momentos ${usuario} indicó que está estudiando 💻` )
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
          return
      }
      mostrarUsuario(buscandoActividad().usuario, buscandoActividad().estado)
    });
    return () => {
      console.log("me termine de ejecutar")
      console.log('limpiando')
      tmiClient.current.disconnect();
    }; 
  },[]);



  return(
    <>
      <MensajeEmergente active={active} usuarioActual={usuarioActual}/>    
    </>      
  )
};



export default App;