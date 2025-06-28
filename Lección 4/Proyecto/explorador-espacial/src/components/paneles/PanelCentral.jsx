import React from 'react';
import Planeta from '../Planeta';
import Bitacora from '../bitacora/Bitacora';

export default function PanelCentral({
  distancia,
  combustible,
  estadoNave,
  mensajeEstado,
  enVuelo,
  onToggleSimulacion,
  onAterrizarDespegar,
  onRecargarCombustible,
  planetasVisitados,
  registrarMensaje,
  mensajePlaneta,
}) {
  return (
    <main className="flex-1 bg-gray-700/70 p-6 rounded flex flex-col gap-6">
      {/* Botón para encender/apagar simulación */}
      <button
        className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded w-full max-w-xs mx-auto"
        onClick={onToggleSimulacion}
      >
        {enVuelo ? "Apagar simulación" : "Encender simulación"}
      </button>

      {/* Panel de Control */}
      <section className="bg-gray-800/70 p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Panel de Control</h3>
        <p><strong>Distancia:</strong> {distancia} km</p>
        <p><strong>Combustible:</strong> {combustible} %</p>
        <p><strong>Estado:</strong> {estadoNave}</p>
      </section>

      {/* Cuerpos cercanos */}
      <section className="bg-gray-800/70 p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Cuerpos encontrados</h3>
        <section className="bg-gray-900/80 p-3 rounded text-center font-semibold text-lg text-yellow-300">
          {mensajeEstado}
        </section>
      </section>

      {/* Bitácora de Exploración */}
      <section className="bg-gray-800/70 p-4 rounded flex-1 overflow-auto">
        <h3 className="text-xl font-semibold mb-2">Bitácora de Exploración</h3>
        <Bitacora />
      </section>
    </main>
  );
}
