import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('');
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [primeraCarga, setPrimeraCarga] = useState(true);
  const [activarColor, setActivarColor] = useState(null);
  const [filtroColor, setFiltroColor] = useState('');

  // Calcular tiempo total sumando las duraciones de todas las tareas
  const tiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // Actualizar título de ventana del navegador con tiempo total
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`;
  }, [tiempoTotal]);

  // Cargar tareas guardadas en localStorage (si existen), o establecer tareas por defecto
  useEffect(() => {
    const almacen = localStorage.getItem("tasks");
    if (almacen) {
      setTimeout(() => {
        setTareas(JSON.parse(almacen));
      }, 2000);
    } else {
      setTimeout(() => {
        const inicial = [
          { nombre: "← Click the number to pick the schedule color!", duracion: 0 },
          { nombre: "Brush Katherine's hair", duracion: 5, color: "#3B82F6" },
          { nombre: "Take Lily for a walk", duracion: 20, color: "#F59E0B" }
        ];
        setTareas(inicial);
        localStorage.setItem("tasks", JSON.stringify(inicial));
      }, 2000);
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambian, excepto en la primera carga
  useEffect(() => {
    if (primeraCarga) {
      setPrimeraCarga(false);
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tareas));
  }, [tareas, primeraCarga]);

  // Agregar nueva tarea a la lista
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        color: "" // sin color personalizado por defecto
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Eliminar tarea por índice
  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  // Colores por horario
  const coloresDisponibles = [
    { nombre: "Mañana", color: "#3B82F6" },
    { nombre: "Tarde", color: "#F59E0B" },
    { nombre: "Noche", color: "#374151" },
  ];

  // Cambiar color de una tarea por índice
  const cambiarColorTarea = (index, nuevoColor) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].color = nuevoColor;
    setTareas(nuevasTareas);
  };

  // Filtrar tareas (nombre, duración y color)
  const tareasFiltradas = useMemo(() => {
    return tareas.filter((t) => {
      const nombreCoincide = t.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
      const duracionCoincide = filtroDuracion === '' || t.duracion.toString().includes(filtroDuracion);
      const colorCoincide = filtroColor === '' || (t.color || '#4F46E5') === filtroColor; // Aquí asigna el color predeterminado si no tiene color

      return nombreCoincide && duracionCoincide && colorCoincide;
    });
  }, [tareas, filtroNombre, filtroDuracion, filtroColor]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-visible">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 overflow-visible relative">
          {/* Contador de tareas */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Task Counter</h2>

          {/* Agregar tarea */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            {/* Tarea */}
            <input
              type="text"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              placeholder="Task name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-indigo-700"
            />
            {/* Tiempo */}
            <input
              type="number"
              min="0"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              placeholder="Duration (minutes)"
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-700"
            />
            {/* Botón */}
            <button
              onClick={agregarTarea}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Add task
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            {/* Color */}
            <select
              value={filtroColor}
              onChange={(e) => setFiltroColor(e.target.value)}
              className="w-36 px-4 py-2 rounded-lg shadow-sm"
              style={{
                backgroundColor: filtroColor || 'white', // fondo dinámico
                color: filtroColor ? 'white' : 'black'    // texto blanco si hay color
              }}
            >
              <option value="">Color</option>
              <option value="#3B82F6">🔵 Mañana (Indigo)</option>
              <option value="#F59E0B">🟡 Tarde (Amber)</option>
              <option value="#374151">⚫ Noche (Gray)</option>
            </select>
            {/* Tarea */}
            <input
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              placeholder="Filter task"
              className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-700"
            />
            {/* Tiempo */}
            <input
              type="number"
              min="0"
              value={filtroDuracion}
              onChange={(e) => setFiltroDuracion(e.target.value)}
              placeholder="Filter duration"
              className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-700"
            />
          </div>

          {/* Lista de tareas mostradas en tarjetas | Con botón de color, tarea, duración y botón para eliminar */}
          <div className="space-y-4">
            {tareasFiltradas.map((tarea, index) => (

              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg relative"> {/* Tarjeta individual de cada tarea */}
                {/* Botón con fondo clarito y número fuerte */}
                {/* Número de tarea, opción de cambiar el color de horario (botón) */}
                <div
                  onClick={() => setActivarColor(activarColor === index ? null : index)}
                  className={`w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-md font-bold text-lg select-none cursor-pointer`}
                  style={tarea.color ? { backgroundColor: tarea.color, color: 'white' } : {}}
                  title="Haz clic para cambiar color"
                >
                  {index + 1}

                  {/* Menú desplegable para seleccionar color de horario (botón) */}
                  {activarColor === index && (
                    <div className="absolute top-full left-0 mt-2 flex gap-2 bg-white p-2 rounded shadow z-50 border min-w-[120px] min-h-[40px]">
                      {/* Opción por defecto (botón) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cambiarColorTarea(index, ""); // Vuelve al predeterminado
                          setActivarColor(null);
                        }}
                        className="w-6 h-6 rounded-full border border-indigo-300 hover:border-indigo-500 cursor-pointer flex items-center justify-center text-xs text-indigo-600 bg-indigo-100"
                        title="Por defecto"
                      >
                        ×
                      </button>

                      {/* Opciones de color (botón) */}
                      {coloresDisponibles.map(({ nombre, color }) => (
                        <button
                          key={nombre}
                          onClick={(e) => {
                            e.stopPropagation();
                            cambiarColorTarea(index, color);
                            setActivarColor(null);
                          }}
                          style={{ backgroundColor: color }}
                          className="w-6 h-6 rounded-full border hover:border-gray-700 cursor-pointer"
                          title={nombre}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Tarea y duración */}
                <div className="flex-1 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{tarea.nombre}</h3>
                  <p className="text-sm text-gray-500">Duration: {tarea.duracion} minutos</p>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => eliminarTarea(index)}
                  className="text-gray-400 hover:text-indigo-500"
                  title="Eliminar tarea"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Tiempo total acumulado */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <p>Total time:</p>
                <p>{tiempoTotal} minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
