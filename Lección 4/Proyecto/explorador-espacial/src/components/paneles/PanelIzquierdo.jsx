export default function PanelIzquierdo({
  planetasVisitados,
  onRegresar,
  onResetear,
  mensajeAterrizaje,
  habilitarRegresar,
  habilitarResetear,
}) {
  return (
    <aside className="w-1/4 bg-gray-800/70 p-4 rounded flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <button
          className={`bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded ${
            habilitarRegresar ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={habilitarRegresar ? onRegresar : undefined}
          disabled={!habilitarRegresar}
        >
          Regresar a la Tierra
        </button>

        <button
          className={`py-2 px-4 rounded ${
            habilitarResetear
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={habilitarResetear ? onResetear : undefined}
          disabled={!habilitarResetear}
        >
          Resetear misión
        </button>
      </div>

      <section className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Planetas visitados</h3>
        <ul className="bg-gray-900/80 p-3 rounded">
          {planetasVisitados.map((planeta, index) => (
            <li key={index}>
              {planeta === "Tierra" ? "🌍" : "🪐"} {planeta}
            </li>
          ))}
        </ul>
        {mensajeAterrizaje && (
          <p className="mt-4 font-semibold text-yellow-300">{mensajeAterrizaje}</p>
        )}
      </section>
    </aside>
  );
}
