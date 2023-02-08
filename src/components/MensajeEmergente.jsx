import React from 'react'
import pomo from '../img/pomo.gif'

const MensajeEmergente = (props) => {
  const { username, estado, badges, isSub, isMod, isVip, isPrime } = props.usuarioActual
  let clase = "mb-2 font-bold text-6xl text-center tracking-tight text-green-500 dark:text-white"
  if (isMod) { clase = "mb-2 font-bold text-6xl text-center tracking-tight text-green-300 dark:text-white" }
  if (isVip) { clase = "mb-2 font-bold text-6xl text-center tracking-tight text-pink-600 dark:text-white" }
  if (isPrime) { clase = "mb-2 font-bold text-6xl text-center tracking-tight text-purple-400 dark:text-white" }
  if (isSub) { clase = "mb-2 font-bold text-6xl text-center tracking-tight text-yellow-400 dark:text-white" }

  return (
    <div>
      {
        props.showMessage && (
          <a
            href="#"
            className="cardImg flex flex-col items-center rounded-lg shadow md:flex-row hover:bg-green-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img className="carimgH object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={pomo} />
            <div id="cuerpoAlerta" className="flex flex-col justify-between p-4 leading-normal">
              <h3 className={clase}>{username} {badges}</h3>
              <h5 className="mb-3 text-center text-4xl text-green-300 dark:text-gray-700">
                {estado}
              </h5>
            </div>
          </a>
        )
      }
    </div>
  )
}

export default MensajeEmergente
