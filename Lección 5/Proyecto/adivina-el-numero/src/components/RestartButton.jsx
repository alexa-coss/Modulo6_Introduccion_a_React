function RestartButton({ onRestart, deshabilitado }) {
  return (
    <>
      {/* Button */}
            <button
              onClick={onRestart}
              className={`w-48 px-6 py-2 rounded-lg mt-6 mx-auto block font-semibold transition-colors ${
                deshabilitado
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-800 hover:bg-blue-900 text-white'
            }`}
            >
              Restart
            </button>
    </>
  )
}

export default RestartButton
