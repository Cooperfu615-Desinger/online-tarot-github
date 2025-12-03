import React, { useRef } from 'react';
import { Moon } from 'lucide-react';

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
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 to-purple-950 border border-amber-600/30 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{
                        transform: `rotate(${style.rotation}deg) translate(${style.x}px, ${style.y}px)`,
                        zIndex: i,
                        filter: i === 4 ? 'brightness(1.1)' : 'brightness(1.0)'
                    }}
                >
                    <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    {i === 4 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Moon className="text-amber-200/50 w-8 h-8" />
                        </div>
                    )}
                </div>
            ))}

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-amber-200/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                點擊抽牌 (剩 {remainingCards} 張)
            </div>
        </div>
    );
};

export default ScatteredDeck;
