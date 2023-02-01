import React from 'react'
import CardImg from '../img/Cardimg'


  const MensajeEmergente = (props) => {
    const {usuario, estado } = props.usuarioActual

    return (
      <div>
        {
          props.active && (
            <a
            href="#"
            className="cardImg flex flex-col items-center bg-black border border-green-200 rounded-lg shadow md:flex-row hover:bg-green-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <CardImg  className="carimgH object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" />
              <div id="cuerpoAlerta" className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 font-bold text-6xl text-center tracking-tight text-green-500 dark:text-white"> {usuario} </h3> 
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