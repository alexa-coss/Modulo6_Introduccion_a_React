import './App.css'
import { AutoFocus } from './components/AutoFocus'
// import { Outlet, Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <main className='p-6'>
        <Outlet /> {/* Rutas hijas o contenido que se va a estar renderizando */} {/* Depende de lo que visito en el momento */}
      </main>
    </>
  )
}

export default App