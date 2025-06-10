import React, { useState } from "react";

function Tarjeta({ titulo, descripcion }) {
    const [count, setCount] = useState(0) /* Importa el orden */

    return (
        <>
            <div className="max-w-sm p-4 m-2 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-black">{titulo}</h3>
                <p className="mt-1 text-gray-600">{descripcion}</p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    contador: { count }
                </button>
            </div>
        </>
    )
}

export default Tarjeta;