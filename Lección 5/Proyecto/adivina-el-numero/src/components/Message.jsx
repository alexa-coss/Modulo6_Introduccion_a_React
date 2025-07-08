function Message({ texto, tipo }) {
  let color = '';
  
  if (tipo === 'correcto') color = 'text-green-600';
  else if (tipo === 'error') color = 'text-red-600';
  else if (tipo === 'pista') color = 'text-blue-500';
  return (
    <>
      <p className={`mt-4 font-medium ${color}`}>
        {texto}
      </p>
    </>
  )
}

export default Message
