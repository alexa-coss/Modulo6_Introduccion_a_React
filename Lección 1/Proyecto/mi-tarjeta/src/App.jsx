import Tarjeta from './components/Tarjeta.jsx';

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 to-blue-300">
        <h1 className="text-4xl font-bold mb-6">Tarjeta de Presentación</h1>
        <Tarjeta />
        <svg className="waves mt-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#90caf9" fillOpacity="1" d="M0,160L1440,320L1440,0L0,0Z" />
        </svg>
    </div>
    </>
  );
}

export default App;