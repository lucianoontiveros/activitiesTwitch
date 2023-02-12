import { useEffect, useRef, useState } from "react";
import tmi, { client } from 'tmi.js'
import dotenv from 'dotenv';
import MensajeEmergente from "./components/MensajeEmergente.jsx";
import Comandos from "./components/Comandos.jsx";
import SalitaEspecial from "./components/SalitaEspecial.jsx";

export const usuariosActividades = []

class Actividad {
  constructor(username, estado) {
    this.username = username;
    this.estado = estado;
  }
}
const App = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSalita, setShowSalita] = useState(false);
  const [timer, setTimer] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState({})
  const [usuarioSalita, setUsuarioSalita] = useState({})



  useEffect(() => {

    const client = new tmi.Client({
      options: { debug: false },
      identity: {
        username: import.meta.env.VITE_APPUSERNAME,
        password: import.meta.env.VITE_APPPASSWORD,
      },
      channels: [import.meta.env.VITE_APPCHANNELS]
    });

    client.connect();

    client.on("message", (channel, userstate, message, self) => {
      if (timer) clearTimeout(timer);
      if (self) return;
      const username = userstate.username;
      const displayName = userstate['display-name'];
      const subs = userstate?.subscriber;
      const mod = userstate?.mod;
      const type = userstate['message-type'];
      const isSub = userstate.badges?.subscriber
      const monSubs = userstate['badge-info']?.subscriber;
      const isPrime = userstate.badges?.premium
      const isVip = userstate.badges?.vip
      const isMod = userstate.badges?.moderator
      const badges =
        (isPrime ? "👑" : "") +
        (isVip ? "💎" : "") +
        (isSub ? "🏆" : "") +
        (isMod ? "🗡️" : "");
      console.log(usuariosActividades)



      const mensajeGeneral = `Que gusto verte por aquí ${username}. `
      const mensajeSubs = isSub ? ` 👑 Muchas gracias por apoyar este canal. Ya tenemos croquetas aseguradas para mi y los michis` : 'Espero que tengas una buena jornada de estudio'
      const mensajeMod = isMod ? ' y más encatada está la comunidad por darle una mano a Chenz ⚔️ en tu rol de mod' : '.'
      const mensajeVid = isVip ? ' Nos hace feliz contar con tu participación en estos dias 💎.' : ''


      const buscandoActividad = () => usuariosActividades.find((items) => items.username === username)
      if (!buscandoActividad()) {
        let estado = 'Acaba de ingresar al chat 📱';
        let actividad = new Actividad(username, estado)
        usuariosActividades.push(actividad)
        setUsuarioActual({ username, estado: buscandoActividad().estado, badges, isSub, isMod, isVip, isPrime })
        setShowMessage(true);
        setTimer(
          setTimeout(() => {
            setShowMessage(false);
            setTimer(null);
          }, 20000)
        );
        if (username != 'streamlabs' && username != 'botomizador' && username != 'streamelements' && username != 'brunisPet' && username != 'nightbot' && username != 'mohcitrus') {
          client.say(channel, mensajeGeneral + mensajeSubs + mensajeMod + mensajeVid)
        }
        return console.log("El username fue registrado")
      }

      if (self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const command = args.shift().toLowerCase();
      Comandos(client, channel, command, username)
      setUsuarioActual({ username, estado: buscandoActividad().estado, badges, isSub, isMod, isVip, isPrime })

      setShowMessage(true);
      setTimer(
        setTimeout(() => {
          setShowMessage(false);
          setTimer(null);
        }, 20000)
      );

      if (command === 'salitaespecial') {
        const num = message.slice(15)
        setUsuarioSalita({ username, estado: buscandoActividad().estado, badges, isSub, isMod, isVip, isPrime, num })
        setShowSalita(true)
        setTimer(
          setTimeout(() => {
            setShowSalita(false);
            setTimer(null);
          }, 600000)
        );
      }
    });

    return () => {
      client.disconnect();
    };
  }, [timer]);

  return (
    <div>
      {
        showSalita ? (<SalitaEspecial usuarioSalita={usuarioSalita} />)
          :
          (<MensajeEmergente showMessage={showMessage} usuarioActual={usuarioActual} />)
      }
    </div>
  );
};

export default App
