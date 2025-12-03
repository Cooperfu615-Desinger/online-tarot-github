import React from 'react';
import { Moon, Star } from 'lucide-react';

const Card = ({ data, positionName, isRevealed, onReveal, index, isNew }) => {
    return (
        <div className={`flex flex-col items-center group perspective-1000 ${isNew ? 'animate-fly-in-from-right' : ''}`}>
            <div
                onClick={onReveal}
                className={`
                    relative w-32 h-48 md:w-56 md:h-84 cursor-pointer transition-all duration-700 transform preserve-3d
                    ${isRevealed ? 'rotate-y-180' : 'hover:-translate-y-2'}
                `}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 卡牌背面 */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 to-purple-950 border-2 border-amber-600/50 rounded-lg flex items-center justify-center backface-hidden shadow-xl">
                    <div className="w-full h-full border border-amber-500/30 m-1 rounded flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                        <Moon className="text-amber-200 w-8 h-8 animate-pulse" />
                    </div>
                </div>

                {/* 卡牌正面 */}
                <div className="absolute inset-0 w-full h-full bg-slate-100 border-4 border-amber-500 rounded-lg flex flex-col items-center justify-between p-2 backface-hidden rotate-y-180 shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                    <div className="text-xs font-bold text-slate-800">{data.id}</div>
                    <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 text-purple-800 border border-purple-200 rounded-full flex items-center justify-center">
                            <Star size={20} />
                        </div>
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">{data.name}</h3>
                    </div>
                    <p className="text-[10px] text-slate-600 text-center">{data.keyword}</p>
                </div>
            </div>
            <div className="mt-3 text-amber-200/80 text-xs md:text-sm font-medium tracking-wider text-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm max-w-[120px]">
                <span className="text-amber-500 mr-1">{index + 1}.</span>
                {positionName}
            </div>
        </div>
    );
};

export default Card;
