import { useState } from "react";

function ListaCompras() {
    // Definir el estado para la lista de compras
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState("");

    // Función para agregar un nuevo producto a la lista
    const agregarProducto = () => {
        if (nuevoProducto.trim() !== "") { // Si no esta vacío
        setProductos([...productos, { nombre: nuevoProducto, comprado: false }]); // Agregar producto
        setNuevoProducto(""); // Limpiar
        }
    };

    // Función para eliminar un producto de la lista
    const eliminarProducto = (index) => {
        setProductos(productos.filter((_, i) => i !== index)); // Crear nuevo arreglo con todos los productos excepto el que tiene ese índice
    };

    // Para alternar comprado o no comprado
    const toggleComprado = (index) => {
        setProductos(
        productos.map((producto, i) =>
            i === index ? { ...producto, comprado: !producto.comprado } : producto
        )
        );
    };

    return (
        <>
            
                <div className="bg-white p-3 max-w-md mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Shopping List</h1>
                        <div className="mt-4 flex">
                            <input
                                className="w-80 border-b-2 border-gray-500 text-black"
                                type="text"
                                placeholder="Write your product"
                                value={nuevoProducto}
                                onChange={(e) => setNuevoProducto(e.target.value)}
                            />
                            <button
                                onClick={agregarProducto}
                                className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
                            >
                                <svg
                                    className="h-6 w-6"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="12" r="9" />
                                    <line x1="9" y1="12" x2="15" y2="12" />
                                    <line x1="12" y1="9" x2="12" y2="15" />
                                </svg>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <ul>
                            {productos.map((producto, index) => (
                                <li key={index} className="p-2 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2">
                                            <input
                                                type="checkbox"
                                                className="h-6 w-6"
                                                checked={producto.comprado}
                                                onChange={() => toggleComprado(index)}
                                            />
                                        </div>
                                        <div className="p-2 flex-1">
                                            <p
                                                className={`text-lg ${
                                                    producto.comprado
                                                        ? "line-through text-gray-400"
                                                        : "text-black"
                                                }`}
                                            >
                                                {producto.nombre}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => eliminarProducto(index)}
                                            className="flex items-center text-red-500 border-2 border-red-500 p-2 rounded-lg"
                                        >
                                            <svg
                                                className="h-6 w-6 text-red-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                <line x1="9" y1="9" x2="15" y2="15" />
                                            </svg>
                                            <span className="ml-1">Remove</span>
                                        </button>
                                    </div>
                                    <hr className="mt-2" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <div className="mt-8">
                        <button className="border-2 border-red-500 p-2 text-red-500">
                            Clear Completed Task
                        </button>
                        <button className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4">
                            Reset Todo List
                        </button>
                    </div> */}
                </div>
            
        </>
    );
}

export default ListaCompras;