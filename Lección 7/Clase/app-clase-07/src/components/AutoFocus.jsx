import { useEffect, useRef, useState } from "react"

export function AutoFocus() {
    const inputRef = useRef(null);
    const id = useRef("Valor que no afecta renderizado")// Alguna referencia a una API
    const [id_alt, setId_alt] = useState("Valor que no afecta renderizado")

    useEffect(() => {
        inputRef.current.focus(); // Estado de un input donde puedo escribir
        inputRef.current.select(); // Seleccionar texto por defecto
    }, [])


    useEffect(() => { }, [id])
    return (
        <>
            <input
                ref={inputRef} // Utiliza esta referencia
                defaultValue="Edita tu nombre"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
        </>
    )
}