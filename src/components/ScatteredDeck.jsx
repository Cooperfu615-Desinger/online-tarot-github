import React from 'react';
import { motion } from 'framer-motion';

const ScatteredDeck = ({ onClick, remainingCards }) => {
    return (
        <motion.div
            className="relative w-[180px] h-auto cursor-pointer group select-none"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{
                x: [0, -4, 4, -4, 4, 0],
                transition: { duration: 0.4 }
            }}
        >
            {/* 懸停光暈效果 */}
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* 專屬牌堆圖片 */}
            <img
                src={`${import.meta.env.BASE_URL}tarot-cards/card_79.png`}
                alt="Tarot Deck"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
            />

            {/* 提示文字 */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-amber-200/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                點擊抽牌 (剩 {remainingCards} 張)
            </div>
        </motion.div>
    );
};

export default ScatteredDeck;

