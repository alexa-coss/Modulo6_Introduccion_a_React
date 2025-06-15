import { useState } from 'react'
import ListaCompras from './components/ListaCompras'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ListaCompras />
    </>
  )
}

export default App
