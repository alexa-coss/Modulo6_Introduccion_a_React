import React from 'react';

export default function PanelDerecho({
  estadoNave,
  onDespegar,
  onRecargar,
  mensajesSimulacion,
  habilitarAterrizar,
  enTierra,
  combustible,
  enVuelo,
}) {
  return (
    <aside className="w-1/4 bg-gray-800/70 p-4 rounded flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <button
          className={`bg-green-600 hover:bg-green-700 py-2 px-4 rounded ${
            habilitarAterrizar && combustible > 0 ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={habilitarAterrizar && combustible > 0 ? onDespegar : undefined}
          disabled={!habilitarAterrizar || combustible === 0}
        >
          {estadoNave === "En órbita" ? "Aterrizar" : "Despegar"}
        </button>

        
        <button
          onClick={onRecargar}
          disabled={estadoNave === "En órbita" || !enVuelo}
          className={`py-2 px-4 rounded ${
            estadoNave === "En órbita" || !enVuelo
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-yellow-700"
          }`}
        >
          Recargar combustible
        </button>
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-2">Eventos de la misión</h3>
        <ul className="bg-gray-900/80 p-3 rounded">
          {mensajesSimulacion.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
