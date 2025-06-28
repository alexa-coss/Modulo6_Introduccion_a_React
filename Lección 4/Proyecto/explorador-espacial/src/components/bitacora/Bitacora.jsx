import { useState, useEffect } from 'react';
import BitacoraForm from './BitacoraForm';
import { planetasBase } from './planetasData';

function Bitacora() {
  const [planetasRegistrados, setPlanetasRegistrados] = useState(() => {
    const guardados = localStorage.getItem('bitacora'); // Buscar datos guardados en el almacenamiento local del navegador
    return guardados ? JSON.parse(guardados) : []; // Si hay datos, conviertir de texto JSON a objeto; si no, iniciar con arreglo vacío
  });

  const [mostrarListaPlanetas, setMostrarListaPlanetas] = useState(false);
  const [planetaEnEdicion, setPlanetaEnEdicion] = useState(null);

  useEffect(() => { // Guardar información actualizada en localStorage, convirte el arreglo u objeto en texto JSON.
    localStorage.setItem('bitacora', JSON.stringify(planetasRegistrados)); // Mantener lista de planetas aunque se recargue la página, cierre y abra el navegador.
  }, [planetasRegistrados]);

  // Combinar planetas base + registrados para mostrar
  const listaCompleta = [...planetasBase, ...planetasRegistrados];

  // Agregar y editar
  const agregarPlaneta = (nuevoPlaneta) => {
    if (planetaEnEdicion) {
      const actualizados = planetasRegistrados.map(p =>
        p.nombre === planetaEnEdicion.nombre ? nuevoPlaneta : p
      );
      setPlanetasRegistrados(actualizados);
      setPlanetaEnEdicion(null); // 🆕 Cancelar edición después de guardar
    } else {
      const existe = listaCompleta.some(
        (p) => p.nombre.toLowerCase() === nuevoPlaneta.nombre.toLowerCase()
      );
      if (existe) {
        alert('Este planeta ya está en la bitácora.');
        return;
      }
      setPlanetasRegistrados(prev => [...prev, nuevoPlaneta]);
    }
  };

  const eliminarPlaneta = (nombre) => {
    const actualizados = planetasRegistrados.filter(p => p.nombre !== nombre);
    setPlanetasRegistrados(actualizados);
    // Si el planeta en edición se elimina, cancelar edición
    if (planetaEnEdicion && planetaEnEdicion.nombre === nombre) {
      setPlanetaEnEdicion(null);
    }
  };

  return (
    <div className="p-4 text-gray-900 font-sans text-white">

      <div className="flex flex-col items-center">
        <BitacoraForm
          onAgregar={agregarPlaneta}
          planetaEnEdicion={planetaEnEdicion}
        />

        <button
          onClick={() => setMostrarListaPlanetas(!mostrarListaPlanetas)}
          className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded w-full max-w-[180px] mx-auto mt-4"
        >
          {mostrarListaPlanetas ? 'Ocultar planetas' : 'Mostrar planetas'}
        </button>

        {mostrarListaPlanetas && (
          <ul className="mt-4 space-y-6 w-full max-w-3xl">
            {listaCompleta.map((planeta, idx) => (
              <li
                key={idx}
                className="border border-indigo-300 rounded p-4 bg-gray-900/80 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-indigo-800 mb-1 text-left">{planeta.nombre}</h3>
                <p className="mb-2">{planeta.descripcion}</p>
                <p><strong>Compuesto principal:</strong> {planeta.compuestoPrincipal}</p>
                <p><strong>Tipo:</strong> {planeta.tipo}</p>
                <p><strong>Clasificación:</strong> {planeta.clasificacion}</p>
                <p><strong>Descubierto en:</strong> {planeta.descubiertoEn}</p>
                <p><strong>Coordenadas:</strong> {planeta.coordenadas}</p>
                {planeta.imagen && (
                  <img
                    src={planeta.imagen}
                    alt={planeta.nombre}
                    className="w-48 h-auto rounded mt-2"
                  />
                )}

                {planetasRegistrados.some(p => p.nombre === planeta.nombre) && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setPlanetaEnEdicion(planeta)}
                      className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded w-full max-w-[8rem] mx-auto"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarPlaneta(planeta.nombre)}
                      className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded w-full max-w-[8rem] mx-auto"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Bitacora;
