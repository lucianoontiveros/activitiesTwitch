# INTRODUCCIÓN

En el canal de [Cuarto de Chenz](https://www.twitch.tv/cuartodechenz "Cuarto de Chenz") tenemos varios comandos que utilizamos para interactuar entre nosotros. Mi idea era poder hacer un banner que reflejará las distintas actividades de los usuarios y que pudiera a su vez clasificar con colores los distintos tipos de roles y con emoticones particulares. Este es de los componentes más adaptados de mi canal, por lo cual si alguien quisiera emplearlo  deberá hacer muchos ajustes.

## EJECUCIÓN
El componente informa de cada persona que escriben en el chat, mostrando un aviso en pantalla. Lo hace por única vez para que no se repita el aviso en pantalla por cada mensaje.

[![image.png](https://i.postimg.cc/HW5CBSmv/image.png)](https://postimg.cc/LhH7s3nj)

A partir de allí, por cada vez que se envíe un comentario o comando el banner lo informará. De no ocurrir ninguna actividad más el banner se esconderá.
[![image.png](https://i.postimg.cc/rwZb8Wct/image.png)](https://postimg.cc/CRDJ7RRF)

Para ello recurrimos a las variables que nos permite obtener tmi,js:

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

Los cambios de estados se registran en un objeto el archivo Comandos.jsx, el cual se van actualizando según los comandos que se van ingresando. Finalmente se muestran en pantalla. En nuestro canal usamos nightbot para enviar los mensajes que están vinculados a los comandos que estan registrado en este archivo, sin embargo se podría ejecutar esa funcionalidad dentro del mismo codigo y enviar texto directamente al chat. Esta será la parte donde más cambios se deberá hacer para adaptar las funcionalidades a un nuevo canal.

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

## CONFIGURACIÓN
Primero debemos configurar las variables de entorno en el archivo .env:
VITE_APP_USERNAME= el username del canal
VITE_APP_PASSWORD= La clave oauth que te ofrece la página https://twitchapps.com/tmi/
VITE_APP_CHANNELS= el nombre del canal donde se va a ejecutar.

Estas variables estarán en el useEffect preconfigurada para que una vez introduccidas las credenciales en el archivo .env.local.

     const client = new tmi.Client({
          options: { debug: true },
          connection: {
            secure: true,
            reconnect: true
          },
          identity: {
            username: import.meta.env.VITE_APP_USERNAME,
            password: import.meta.env.VITE_APP_PASSWORD,
          },
          channels: [import.meta.env.VITE_APP_CHANNELS]
        });
