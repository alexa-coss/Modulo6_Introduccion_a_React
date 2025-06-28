import React, { useEffect } from 'react';

export default function Planeta({ nombre, esInicio, registrarMensaje }) {
  useEffect(() => {
    if (esInicio) {
      registrarMensaje(`🪐 El planeta ${nombre} ha aparecido 🪐`);
      return;
    }

    registrarMensaje(`🪐 El planeta ${nombre} ha aparecido 🪐`);

    return () => {
      registrarMensaje(`🚀 El planeta ${nombre} ha desaparecido 🚀`);
    };
  }, [nombre, esInicio, registrarMensaje]);

  return (
    <div className="p-2 border border-gray-500 rounded mb-2">
      {nombre} {esInicio ? '(Planeta de inicio)' : ''}
    </div>
  );
}
