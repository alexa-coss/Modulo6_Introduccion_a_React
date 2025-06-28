import { useEffect, useState } from 'react';

export default function FondoEspacial() {
  const [estrellas, setEstrellas] = useState([]);

  useEffect(() => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    const nuevasEstrellas = [];

    for (let i = 0; i < 100; i++) {
      nuevasEstrellas.push({
        id: i,
        x: Math.random() * ancho,
        y: Math.random() * alto,
        size: Math.random() < 0.5 ? 1 : 2,
        duracion: 1.5 + Math.random() * 2, // duración animación parpadeo
      });
    }

    setEstrellas(nuevasEstrellas);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#000017] via-[#004d99] to-[#000017] overflow-hidden z-[-1]">
      {estrellas.map(({ id, x, y, size, duracion }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: 0.8,
            animation: `parpadeo ${duracion}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes parpadeo {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
