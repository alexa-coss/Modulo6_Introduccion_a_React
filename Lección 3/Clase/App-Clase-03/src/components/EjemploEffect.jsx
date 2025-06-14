import { useEffect, useState } from "react";

export function EjemploEffect() {
    const [count, setCount] = useState(0);

    /* useEffect(() => { // Actualizar el estado de una varibale.
        setStateX(respAPI.data);
    }, [respAPI]) */ // Recibir respuesta de API

    // SOLO al montar componente
    useEffect(() => {
        console.log("Solo al montar componente");
    }, []) // No depende de nada.

    // Se ejecuta después de cada render de count
    useEffect(() => {
        console.log("Renderizado o actualización", count);
    }, [count]) // Cuando cambia el state de count, se aplica el efecto secundario.

    // Se ejecuta en cada render
    useEffect(() => {
        console.log("Cada renderizado", count)
    }) // Sin cambios, solo renderiza.

    useEffect(() => {
        const handleScroll = () => console.log(window.scrollY)
        window.addEventListener("scroll", handleScroll);
        return () => {
            // cleanup al desmontar o antes de re-ejectura
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    /* // Cunado se monte el componente quiero crear lo siguiente
    useEffect(() => {

    }, []) */

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <p className="text-xl">Count: {count}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setCount(c => c + 1)}
                >
                    +1
                </button>
            </div>
        </>
    )
}