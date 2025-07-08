import { useState, useEffect } from 'react'
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(null)
  const [numeroIngresado, setNumeroIngresado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [numeroTemporal, setNumeroTemporal] = useState('');
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState('');

  useEffect(() => {
    generarNumero();
  }, []);

  const generarNumero = () => {
    const aleatorio = Math.floor(Math.random() * 100) + 1;
    setNumeroAleatorio(aleatorio);
    setMensaje('');
    setNumeroIngresado('');
    setIntentos(0);
    setJuegoTerminado(false); // Activar botón
  };

  const handleChange = () => { // Verificar numero
    if (numeroTemporal === '') return;

    const num = parseInt(numeroTemporal);

    if (isNaN(num) || num < 1 || num > 100) {
        setMensaje('Number out of range. Please enter a number between 1 and 100.');
        setTipoMensaje('error');
        return;
    }

    setNumeroIngresado(numeroTemporal);
    setIntentos(intentos + 1);

    if (num === numeroAleatorio) {
        setMensaje('Correct!');
        setTipoMensaje('correcto');
        setJuegoTerminado(true); // Desactivar button probar
    } else if (num < numeroAleatorio) {
        setMensaje('The number is higher.');
        setTipoMensaje('pista');
    } else {
        setMensaje('The number is lower.');
        setTipoMensaje('pista');
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">

        <h1 className="font-poppins text-4xl font-bold text-blue-400 mb-2 text-center">
            Guess the Number
        </h1>
        <p className="text-center text-black text-blue-900 mb-6 max-w-md mx-auto">
            Try to guess the secret number between 1 and 100. You'll get a hint after each attempt!
        </p>
        <InputNumber
            valor={numeroTemporal}
            onChange={setNumeroTemporal}
            onSubmit={handleChange}
            deshabilitado={juegoTerminado}
        />
        <Message
            texto={mensaje}
            tipo={tipoMensaje}
        />
        <p className="text-center text-blue-900 mt-4 font-semibold">
            Attempts: {intentos}        
        </p>
        <RestartButton
            onRestart={generarNumero}
            deshabilitado={!juegoTerminado}
        />

      </div>
    </>
  )
}

export default Game
