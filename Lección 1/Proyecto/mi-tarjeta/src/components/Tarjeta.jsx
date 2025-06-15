function Tarjeta() {
  // Definimos la información estática de la tarjeta
  const nombre = "Alexa Coss";
  const profesion = "Mechanical Engineer";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";
  const bio = "I am an engineer in the process of obtaining a degree. I have a passion for design and a little bit of programming.";

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      <h2 className="text-center text-2xl font-semibold mt-3">{nombre}</h2>
      <p className="text-center text-gray-600 mt-1">{profesion}</p>
      <div className="flex justify-center mt-5">
        <a href="https://x.com/alexacoss1?s=21" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
        <a href="https://www.linkedin.com/in/alejandra-coss" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
        <a href="https://github.com/alexa-coss" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Bio</h3>
        <p className="text-gray-600 mt-2">{bio}</p>
      </div>
    </div>
  );
}

export default Tarjeta;
