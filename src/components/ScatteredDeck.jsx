import React, { useRef } from 'react';

const ScatteredDeck = ({ onClick, remainingCards }) => {
    const randomStyles = useRef(
        Array.from({ length: 5 }).map(() => ({
            rotation: Math.random() * 30 - 15,
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
        }))
    ).current;

    return (
        <div
            className="relative w-24 h-32 md:w-32 md:h-44 cursor-pointer group select-none"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {randomStyles.map((style, i) => (
                <div
                    key={i}
                    className="absolute inset-0 w-full h-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 overflow-hidden border border-amber-600/30"
                    style={{
                        transform: `rotate(${style.rotation}deg) translate(${style.x}px, ${style.y}px)`,
                        zIndex: i,
                        filter: i === 4 ? 'brightness(1.1)' : 'brightness(1.0)'
                    }}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}tarot-cards/card_78.png`}
                        alt="Tarot Card Back"
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-amber-200/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                點擊抽牌 (剩 {remainingCards} 張)
            </div>
        </div>
    );
};

export default ScatteredDeck;
