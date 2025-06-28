import { useState, useRef, useEffect } from 'react';

function BitacoraForm({ onAgregar, planetaEnEdicion }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [compuestoPrincipal, setCompuestoPrincipal] = useState('');
  const [tipo, setTipo] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [descubiertoEn, setDescubiertoEn] = useState('');
  const [coordenadas, setCoordenadas] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  // Prellenar datos si hay planeta en edicion
  useEffect(() => {
    if (planetaEnEdicion) {
        setNombre(planetaEnEdicion.nombre);
        setDescripcion(planetaEnEdicion.descripcion);
        setCompuestoPrincipal(planetaEnEdicion.compuestoPrincipal);
        setTipo(planetaEnEdicion.tipo);
        setClasificacion(planetaEnEdicion.clasificacion);
        setDescubiertoEn(planetaEnEdicion.descubiertoEn);
        setCoordenadas(planetaEnEdicion.coordenadas);
        setImagen(null); // Obligar a cargar de nuevo si se desea
        if (inputImagenRef.current) inputImagenRef.current.value = '';
        }
    }, [planetaEnEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      compuestoPrincipal,
      tipo,
      clasificacion,
      descubiertoEn,
      coordenadas,
      imagen: imagen ? URL.createObjectURL(imagen) : planetaEnEdicion?.imagen || null, // Conservar imagen anterior si no se cambia
    };

    onAgregar(nuevoPlaneta);

    // Limpiar formulario
    setNombre('');
    setDescripcion('');
    setCompuestoPrincipal('');
    setTipo('');
    setClasificacion('');
    setDescubiertoEn('');
    setCoordenadas('');
    setImagen(null);
    if (inputImagenRef.current) inputImagenRef.current.value = '';
  };

  return (
    <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 p-6 rounded-lg max-w-md mx-auto flex flex-col gap-4"
    >
        <h3 className="text-xl font-semibold mb-4 text-left">Form para añadir cuerpo celeste</h3>
        
        {/* Nombre */}
        <div className="relative">
            <input
                type="text"
                id="nombre"
                placeholder=" "
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={!!planetaEnEdicion}
                className="peer w-full bg-gray-900 text-white p-2 rounded disabled:opacity-60 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="nombre"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Nombre del cuerpo celeste
            </label>
        </div>

        {/* Descripción */}
        <div className="relative">
            <textarea
                id="descripcion"
                placeholder=" "
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="descripcion"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Descripción
            </label>
        </div>

        {/* Compuesto principal */}
        <div className="relative">
            <input
                type="text"
                id="compuesto"
                placeholder=" "
                value={compuestoPrincipal}
                onChange={(e) => setCompuestoPrincipal(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="compuesto"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Compuesto principal
            </label>
        </div>

        {/* Tipo */}
        <div className="relative">
            <input
                type="text"
                id="tipo"
                placeholder=" "
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="tipo"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Tipo (ej. rocoso, gaseoso...)
            </label>
        </div>

        {/* Clasificación */}
        <div className="relative">
            <input
                type="text"
                id="clasificacion"
                placeholder=" "
                value={clasificacion}
                onChange={(e) => setClasificacion(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="clasificacion"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Clasificación (ej. planeta, satélite...)
            </label>
        </div>

        {/* Descubierto en */}
        <div className="relative">
            <input
                type="text"
                id="descubierto"
                placeholder=" "
                value={descubiertoEn}
                onChange={(e) => setDescubiertoEn(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="descubierto"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Descubierto en (ej. antigüedad, 1610...)
            </label>
        </div>

        {/* Coordenadas */}
        <div className="relative">
            <input
                type="text"
                id="coordenadas"
                placeholder=" "
                value={coordenadas}
                onChange={(e) => setCoordenadas(e.target.value)}
                required
                className="peer w-full bg-gray-900 text-white p-2 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <label
                htmlFor="coordenadas"
                className="absolute left-2 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange-400
                peer-valid:top-0 peer-valid:text-sm peer-valid:text-orange-400"
            >
                Coordenadas (ej. RA: 7h 34m, Dec: +22°)
            </label>
        </div>

        {/* Imagen */}
        <div>
            <input
                type="file"
                ref={inputImagenRef}
                onChange={(e) => setImagen(e.target.files[0])}
                className="bg-gray-900 text-white p-2 rounded w-full file:mr-2 file:bg-orange-600 file:hover:bg-orange-700 file:border-none file:px-4 file:py-2 file:rounded"
            />
        </div>

        <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded w-full max-w-xs mx-auto"
        >
        {planetaEnEdicion ? 'Guardar cambios' : 'Guardar'}
        </button>
    </form>
  );
}

export default BitacoraForm;
