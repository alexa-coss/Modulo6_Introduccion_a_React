import React, { useState, useCallback } from "react"

const LikeButton = React.memo(({ onLike }) => ( // se lo pasamos a un hijo memorizado (optiomizar manejo de memoria)
    <button onClick={onLike} className="text-blue-500">💙 Like</button>
));

export function ProductCard() {
    const [likes, setLikes] = useState(0); // estado de la tarjeta

    // sin useCallback
    let algo = "algo";
    const handler = () => { } // se redeclara cada que se redibuja el componente

    const handleLike = useCallback(() => setLikes(l => l + 1), []) // estable // manejador | useCallback evitar re-render innecesario

    return (
        <>
            <div className="p-4 border rounded">
                <p>🍕 Pizza Margarita</p>
                <LikeButton onLike={handleLike} />   {/* hijo memorizado */}
                <p>Likes: {likes}</p>
            </div>
        </>
    )
}