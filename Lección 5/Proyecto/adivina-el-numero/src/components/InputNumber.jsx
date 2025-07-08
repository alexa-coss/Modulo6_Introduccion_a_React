function InputNumber({ valor, onChange, onSubmit, deshabilitado }) {
  return (
    <>
      {/* Number */}
            <input
              type="number"
              min="1"
              max="100"
              value={valor}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter a number"
              className="w-48 px-4 py-2 border border-blue-200 rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500 mx-auto block"
            />
            <button
                onClick={onSubmit}
                disabled={deshabilitado}
                className={`w-48 px-4 py-2 rounded-lg shadow-sm mt-3 mx-auto block font-semibold transition-colors ${
                    deshabilitado
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700 text-white'
                }`}
            >
                Try
            </button>
    </>
  )
}

export default InputNumber
