import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ data, positionName, isRevealed, isReversed, onReveal, index, isNew }) => {
    return (
        <motion.div
            className="flex flex-col items-center group perspective-1000 flex-shrink-0"
            initial={isNew ? { x: 200, y: -200, opacity: 0, scale: 0.5 } : false}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: isNew ? index * 0.15 : 0
            }}
        >
            {/* 卡牌外層容器 - 處理逆位旋轉 */}
            <motion.div
                className="relative w-[160px] h-[281px] flex-shrink-0"
                initial={isNew ? { rotate: isReversed ? 180 : 0 } : false}
                animate={{ rotate: isReversed ? 180 : 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: isNew ? index * 0.15 : 0
                }}
            >
                {/* 卡牌翻轉容器 - 處理點擊翻牌 */}
                <motion.div
                    onClick={onReveal}
                    className="w-full h-full cursor-pointer"
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: 1000
                    }}
                    animate={{ rotateY: isRevealed ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* 卡牌背面 */}
                    <motion.div
                        className="absolute inset-0 w-full h-full rounded-lg shadow-xl overflow-hidden border-2 border-amber-600/50"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}tarot-cards/card_78.png`}
                            alt="Tarot Card Back"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 卡牌正面 */}
                    <motion.div
                        className="absolute inset-0 w-full h-full rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.4)] overflow-hidden border-2 border-amber-500"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}tarot-cards/card_${data.id}.png`}
                            alt={data.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* 文字標籤 - 不會旋轉，維持正向 */}
            <motion.div
                className="mt-3 text-amber-200/80 text-sm font-medium tracking-wider text-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm w-[160px]"
                initial={isNew ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: isNew ? index * 0.15 + 0.3 : 0 }}
            >
                <span className="text-amber-500 mr-1">{index + 1}.</span>
                {positionName}
                <span className={`ml-1 text-xs ${isReversed ? 'text-red-400' : 'text-green-400'}`}>
                    ({isReversed ? '逆位' : '正位'})
                </span>
            </motion.div>
        </motion.div>
    );
};

export default Card;
