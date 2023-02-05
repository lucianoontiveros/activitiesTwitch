import { useEffect, useRef, useState } from "react";
import tmi from 'tmi.js'
import chalk from "chalk";
import dotenv from 'dotenv';
import MensajeEmergente from "./components/MensajeEmergente.jsx";
import Comandos from "./components/Comandos.jsx";

export const usuariosActividades = []

class Actividad {
  constructor(username, estado) {
    this.username = username;
    this.estado = estado;
  }
}
const App = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState({})

  useEffect(() => {
    const client = new tmi.Client({
      options: { debug: true },
      connection: {
        secure: true,
        reconnect: true
      },
      identity: {
        username: import.meta.env.VITE_APP_USERNAME,
        password: import.meta.env.VITE_APP_PASSWORD
      },
      channels: [import.meta.env.VITE_APP_CHANNELS]
    });

    client.connect();

    client.on("message", (channel, userstate, message, self) => {
      if (timer) clearTimeout(timer);
      if (self) return;
      const username = userstate.username;
      const displayName = userstate['display-name'];
      const color = userstate?.color ?? "#ffffff"
      const nick = chalk.hex(color).underline(username)
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
        return client.say(channel, "El username fue registrado")
      }

      if (self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const command = args.shift().toLowerCase();
      Comandos(client, command, username)
      setUsuarioActual({ username, estado: buscandoActividad().estado, badges, isSub, isMod, isVip, isPrime })

      setShowMessage(true);
      setTimer(
        setTimeout(() => {
          setShowMessage(false);
          setTimer(null);
        }, 20000)
      );
    });

    return () => {
      client.disconnect();
    };
  }, [timer]);

  return (
    <div>
      <MensajeEmergente showMessage={showMessage} usuarioActual={usuarioActual} />
    </div>
  );
};

export default App
