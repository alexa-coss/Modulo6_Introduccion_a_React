import { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';

function PanelControl() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [enVuelo, setEnVuelo] = useState(true);
  const [planetasVisitados, setPlanetasVisitados] = useState(["Tierra"]);
  const [mensajes, setMensajes] = useState([]);

  const listaPlanetas = [ /* Planetas permitidos para realizar aterrizaje */
    "Mercurio",
    "Venus",
    "Marte",
    "Júpiter",
    "Saturno",
    "Urano",
    "Neptuno",
    "Plutón, planeta enano del sistema solar",
    "Ceres, planeta enano en el cinturón de asteroides",
    "Eris, planeta enano más allá de Plutón",
    "Haumea, planeta enano del cinturón de Kuiper",
    "Makemake, planeta enano del cinturón de Kuiper",
    "Luna, satélite de planeta Tierra",
    "Europa, segundo satélite de planeta Júpiter",
    "Ganímedes, satélite más grande de Júpiter",
    "Titán, satélite de planeta Saturno",
    "Calisto, satélite de planeta Júpiter",
    "Io, satélite volcánico de planeta Júpiter",
    "Tritón, satélite de planeta Neptuno"
  ];

  // Registrar mensajes (desde Planeta.jsx)
  function registrarMensaje(mensaje) {
    setMensajes(prev => [...prev, mensaje]);
  }

  // Simular vuelo (solo si está en vuelo)
  useEffect(() => {
    if (!enVuelo) return;

    console.log("¡El panel está listo!"); // Montaje
    registrarMensaje("🟢 ¡El panel está listo! 🟢");

    const intervalo = setInterval(() => { // Montaje
      // ... (simulación de vuelo)
      setDistancia(prev => prev + 1);
      setCombustible(prev => Math.max(prev - 1, 0)); // No baja de cero
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
      registrarMensaje("🔴 El panel se ha apagado. 🔴");
    };
  }, [enVuelo]);

  // Mostrar cuando cambia combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Aterrizar automáticamente si combustible llega a cero
  useEffect(() => {
    if (combustible === 0 && estadoNave === "En órbita") {
      const planetaEmergencia = elegirPlanetaAleatorio(planetasVisitados);
      if (planetaEmergencia) {
        alert("🚨 ¡Combustible agotado! 🛑 Aterrizando de emergencia. 🛑");
        setEstadoNave("Aterrizando");
        setEnVuelo(false);
        setPlanetasVisitados(prev => [...prev, planetaEmergencia]);
      }
    }
  }, [combustible]);

  // Mostrar alerta cuando el combustible esté al 20%
  useEffect(() => {
    if (combustible === 20) {
      const mensajeAlerta = "⚠️ Combustible al 20%, se recomienda aterrizar y recargar combustible.";
      registrarMensaje(mensajeAlerta);
    }
  }, [combustible]);

  // Mensaje memorizado
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  /* Elegir planeta aleatorio no visitado */
  function elegirPlanetaAleatorio(visitados) {
    const noVisitados = listaPlanetas.filter(p => !visitados.includes(p)); // Planeta aun no visitados
    if (noVisitados.length === 0) return null; // Ya visitó todos
    const index = Math.floor(Math.random() * noVisitados.length); // Elegir uno al azar
    return noVisitados[index];
  }

  return (
    <>
      <div>
        {/* Encendido / Apagado */}
        <button
          onClick={() => {
            setEnVuelo(prev => !prev);
          }}
        >
          {enVuelo ? "Apagar simulación" : "Encender simulación"}
        </button>

        <h2>Panel de Control</h2>
        {/* ... (información del panel) */}
        <p>Distancia: {distancia} km</p>
        <p>Combustible: {combustible} %</p>
        <p>{mensajeEstado}</p>

        {/* Aterrizar / Despegar */}
        <button
          onClick={() => {
            if (estadoNave === "Aterrizando") {
              setEstadoNave("En órbita");
              setEnVuelo(true);
            } else {
              const planetaNuevo = elegirPlanetaAleatorio(planetasVisitados);
              if (planetaNuevo) {
                setEstadoNave("Aterrizando");
                setEnVuelo(false);
                setPlanetasVisitados(prev => [...prev, planetaNuevo]);
              } else {
                alert("¡Ya visitaste todos los planetas permitidos!");
              }
            }
          }}
          disabled={estadoNave === "Aterrizando" && combustible === 0}
        >
          {estadoNave === "Aterrizando" ? "Despegar" : "Aterrizar"}
        </button>

        {/* Recargar combustible */}
        <button
          onClick={() => {
            setCombustible(100);
            const mensajeRecarga = "✅ Combustible al 100%, listo para el despegue.";
            registrarMensaje(mensajeRecarga);
          }}
          disabled={estadoNave === "En órbita"}
        >
          Recargar combustible
        </button>


        {/* Planetas visitados */}
        {planetasVisitados.map((planeta, index) => ( /* Recorrer todos y pasarlos a Planeta en Planeta.jsx */
          <Planeta
            key={index} /* index no pasa como prop (no lo definí) */
            nombre={planeta}
            esInicio={planeta === "Tierra"} /* Pasar el planeta inicial */
            registrarMensaje={registrarMensaje} /* Pasar función */
          />
        ))}

        {/* Mostrar mensajes */}
        <h3>Eventos de la misión:</h3>
        <ul>
          {mensajes.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>

        {/* Regresar a la Tierra */}
        <button
          onClick={() => {
            setEstadoNave("Regresando a la Tierra");
            setEnVuelo(false);
            registrarMensaje("🛰️ Nave regresando a la Tierra.");
          }}
          disabled={planetasVisitados.includes("Tierra") && estadoNave === "Regresando a la Tierra"}
        >
          Regresar a la Tierra
        </button>

        {/* Resetear misión */}
        <button
          onClick={() => {
            setDistancia(0);
            setCombustible(100);
            setEstadoNave("En órbita");
            setEnVuelo(true);
            setPlanetasVisitados(["Tierra"]);
            setMensajes([]);
          }}
          disabled={!(planetasVisitados.includes("Tierra") && estadoNave === "Regresando a la Tierra")}
        >
          Resetear misión
        </button>
      </div>
    </>
  )
}

export default PanelControl
