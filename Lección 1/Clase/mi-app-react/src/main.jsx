import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Ejemplo from './Ejemplo.jsx'

createRoot(document.getElementById('root')).render( // Crear un elemento raíz o renderizado | Va a tener todo el árbol de dibujo
  <StrictMode> { /* Etiqueta que ayuda con cierto contexto de dibujo */ }
    <App /> { /* Etiqueta autoclosed */ }
    <Ejemplo list={[1, 2, 3, 4, 5, 6]} dummy={"cadena"} miParametro={true} /> {/* Mandamos atributos como si fuera HTML */}
  </StrictMode>,
)
