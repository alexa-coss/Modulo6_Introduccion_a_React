import { useState, useEffect, useRef } from 'react';
import PanelIzquierdo from './components/paneles/PanelIzquierdo';
import PanelCentral from './components/paneles/PanelCentral';
import PanelDerecho from './components/paneles/PanelDerecho';
import FondoEspacial from './components/FondoEspacial';

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En tierra");
  const [enVuelo, setEnVuelo] = useState(false);
  const [planetasVisitados, setPlanetasVisitados] = useState(["Tierra"]);
  const [mensajesSimulacion, setMensajesSimulacion] = useState([]);
  const [mensajeAterrizaje, setMensajeAterrizaje] = useState("");
  const [mensajePlaneta, setMensajePlaneta] = useState("");
  const [enTierra, setEnTierra] = useState(false);

  const listaPlanetas = [
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

  // Refs para control ciclo mensajes
  const timeoutRef = useRef(null);
  const planetaVisibleRef = useRef(false);
  const planetaActualRef = useRef("");

  const registrarMensaje = (msg) => {
    setMensajesSimulacion((prev) => [msg, ...prev]);
  };

  const toggleSimulacion = () => {
    setEnTierra(false);

    const nuevoEstado = !enVuelo;
    setEnVuelo(nuevoEstado);

    if (nuevoEstado) setEstadoNave("En órbita");

    registrarMensaje(nuevoEstado ? "🟢 Simulación encendida 🟢" : "🔴 Simulación pausada 🔴");
  };

  const aterrizarDespegar = () => {
    setEnTierra(false);

    if (estadoNave === "En órbita") {
      // Obtener planetas disponibles
      const disponibles = listaPlanetas.filter(
        (p) => !planetasVisitados.includes(p)
      );

      if (disponibles.length === 0) {
        registrarMensaje("✅ ¡Ya visitaste todos los planetas permitidos! ¡Vuelve a la Tierra y comienza una nueva misión!");
        return;
      }

      // Elegir uno aleatorio de los disponibles
      const planetaAleatorio = disponibles[Math.floor(Math.random() * disponibles.length)];

      setEstadoNave("Aterrizando");
      setDistancia((prev) => prev + 50);
      setCombustible((prev) => Math.max(prev - 10, 0));
      registrarMensaje(`☄ Aterrizando en el cuerpo celeste ${planetaAleatorio}...`);

      // Después de 2 segundos cambiar a "Explorando superficie"
    setTimeout(() => {
      setEstadoNave("Explorando superficie");
    }, 2000);

      // Añadir a visitados
      setPlanetasVisitados((prev) => [...prev, planetaAleatorio]);

    } else {
      setEstadoNave("En órbita");
      setDistancia((prev) => prev + 50);
      setCombustible((prev) => Math.max(prev - 10, 0));
      registrarMensaje("🚀 De vuelta en órbita...");
    }
  };

  // Combustible
  useEffect(() => {
    if (combustible === 20) {
      registrarMensaje("⚠️ Combustible al 20%, se recomienda aterrizar y recargar combustible.");
    }
    if (combustible === 10) {
      registrarMensaje("⚠️ Combustible al 10%, aterrizaje inmediato sugerido.");
    }

    if (combustible <= 5 && estadoNave === "En órbita") {
      registrarMensaje("🚨 Combustible crítico, aterrizaje forzoso iniciado...");
      setEstadoNave("Aterrizando");

      // Después de 3–5 segundos simula que aterrizó en Tierra
    setTimeout(() => {
      setEstadoNave("Aterrizando"); // por si se perdió la señal de aterrizaje
      setPlanetasVisitados((prev) =>
        prev.includes("Tierra") ? prev : [...prev, "Tierra"]
      );
      setMensajeAterrizaje("🌍 Aterrizaje forzoso en Tierra.");
      registrarMensaje("🛰️ Nave aterrizó de emergencia en la Tierra.");
      
      setCombustible(0);
      registrarMensaje("❌ Combustible agotado. Nave inmovilizada hasta recarga.");

      setEnTierra(true);
    }, Math.floor(Math.random() * 2000) + 3000);
    }
  }, [combustible, estadoNave]);

  const recargarCombustible = () => {
    if (estadoNave === "Aterrizando") {
      setCombustible(100);
      registrarMensaje("⛽ Combustible recargado al 100%, listo para el despegue.");
    }
  };

  const regresarATierra = () => {
    setPlanetasVisitados((prev) =>
      prev.includes("Tierra") ? prev : [...prev, "Tierra"]
    );
    setMensajeAterrizaje("🌍 Has regresado a la Tierra.");
    registrarMensaje("🛰️ Misión regresada a la Tierra.");
    setEnTierra(true); // Activa botón reset
    setEstadoNave("Aterrizado"); // Botón “Despegar”
  };

  const resetearMision = () => {
    setDistancia(0);
    setCombustible(100);
    setEstadoNave("En órbita");
    setEnVuelo(false);
    setPlanetasVisitados(["Tierra"]);
    setMensajesSimulacion([]);
    setMensajeAterrizaje("");
    registrarMensaje("🔄 Misión reseteada.");
  };

  // useEffect para el ciclo de mensajes del planeta aleatorio
  useEffect(() => {
    if (!enVuelo || estadoNave !== "En órbita") {
      setMensajePlaneta("");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const cicloMensaje = () => {
      if (planetaVisibleRef.current) {
        // Mostrar desaparición del planeta que había aparecido
        setMensajePlaneta(`🚀 El cuerpo celeste ${planetaActualRef.current} ha desaparecido 🚀`);
        planetaVisibleRef.current = false;

        timeoutRef.current = setTimeout(() => {
          cicloMensaje(); // Después muestra uno nuevo
        }, Math.floor(Math.random() * 5000) + 5000); // 5–10 s
      } else {
        // Mostrar aparición de nuevo planeta
        const planetaAleatorio = listaPlanetas[Math.floor(Math.random() * listaPlanetas.length)];
        planetaActualRef.current = planetaAleatorio; // 🔁 Guardar nombre actual
        setMensajePlaneta(`🪐 El cuerpo celeste ${planetaAleatorio} ha aparecido 🪐`);
        planetaVisibleRef.current = true;

        timeoutRef.current = setTimeout(() => {
          cicloMensaje(); // Luego desaparece
        }, Math.floor(Math.random() * 2000) + 3000); // 3–5 s
      }
    };

    cicloMensaje();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enVuelo, estadoNave]);

  useEffect(() => {
    let intervalo;

    if (enVuelo && estadoNave === "En órbita" && combustible > 0) {
      intervalo = setInterval(() => {
        setDistancia((prev) => prev + 1);
        setCombustible((prev) => Math.max(prev - 1, 0));
      }, 1000); // cada 1 segundo
    }

    return () => clearInterval(intervalo);
  }, [enVuelo, estadoNave, combustible]);

  return (
    <>
      <FondoEspacial />
      <div className="min-h-screen bg-transparent text-white flex gap-4 p-4">
        <PanelIzquierdo
          planetasVisitados={planetasVisitados}
          onRegresar={regresarATierra}
          onResetear={resetearMision}
          mensajeAterrizaje={mensajeAterrizaje}
          habilitarRegresar={enVuelo}
          habilitarResetear={enTierra}
        />

        <PanelCentral
          distancia={distancia}
          combustible={combustible}
          estadoNave={estadoNave}
          mensajeEstado={mensajePlaneta}
          enVuelo={enVuelo}
          onToggleSimulacion={toggleSimulacion}
          onAterrizarDespegar={aterrizarDespegar}
          onRecargarCombustible={recargarCombustible}
          planetasVisitados={planetasVisitados}
          registrarMensaje={registrarMensaje}
        />

        <PanelDerecho
          estadoNave={estadoNave}
          onDespegar={aterrizarDespegar}
          onRecargar={recargarCombustible}
          mensajesSimulacion={mensajesSimulacion}
          habilitarAterrizar={enVuelo}
          enTierra={enTierra}
          combustible={combustible}
          enVuelo={enVuelo}
        />
      </div>
    </>
  );
}

export default App;
