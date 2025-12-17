import React from 'react';

const Card = ({ data, positionName, isRevealed, onReveal, index, isNew }) => {
    return (
        <div className={`flex flex-col items-center group perspective-1000 flex-shrink-0 ${isNew ? 'animate-fly-in-from-right' : ''}`}>
            <div
                onClick={onReveal}
                className={`
                    relative w-[160px] h-[256px] cursor-pointer transition-all duration-700 transform preserve-3d flex-shrink-0
                    ${isRevealed ? 'rotate-y-180' : 'hover:-translate-y-2'}
                `}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 卡牌背面 - 使用本地牌背圖片 */}
                <div className="absolute inset-0 w-full h-full rounded-lg backface-hidden shadow-xl overflow-hidden border-2 border-amber-600/50">
                    <img
                        src={`${import.meta.env.BASE_URL}tarot-cards/card_78.png`}
                        alt="Tarot Card Back"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 卡牌正面 - 使用本地塔羅牌圖片 */}
                <div className="absolute inset-0 w-full h-full rounded-lg backface-hidden rotate-y-180 shadow-[0_0_15px_rgba(251,191,36,0.4)] overflow-hidden border-2 border-amber-500">
                    <img
                        src={`${import.meta.env.BASE_URL}tarot-cards/card_${data.id}.png`}
                        alt={data.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="mt-3 text-amber-200/80 text-sm font-medium tracking-wider text-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm w-[160px]">
                <span className="text-amber-500 mr-1">{index + 1}.</span>
                {positionName}
            </div>
        </div>
    );
};

export default Card;
