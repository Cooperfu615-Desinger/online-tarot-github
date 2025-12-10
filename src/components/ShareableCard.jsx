import React from 'react';

const ShareableCard = ({ drawnCards, spreadName, aiSummary }) => {
    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[600px] bg-gradient-to-br from-gray-900 via-purple-950 to-black p-8 font-jhenghei"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-light tracking-[0.15em] text-white mb-2">
                    MYSTIC TAROT AI
                </h1>
                <p className="text-amber-400 text-sm tracking-wide">
                    {spreadName || '塔羅占卜'}
                </p>
            </div>

            {/* Cards Display */}
            <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
                {drawnCards && drawnCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-32 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-lg border-2 border-amber-400/50 flex items-center justify-center shadow-lg">
                            <span className="text-white text-center text-xs px-1 font-medium">
                                {card.data?.name || '神秘牌'}
                            </span>
                        </div>
                        <span className="text-amber-300 text-xs mt-2 text-center max-w-[80px]">
                            {card.data?.keyword || ''}
                        </span>
                    </div>
                ))}
            </div>

            {/* AI Summary Quote */}
            {aiSummary && (
                <div className="bg-black/40 border border-amber-500/30 rounded-xl p-5 mb-6">
                    <p className="text-amber-100 text-base leading-relaxed text-center italic">
                        「{aiSummary}」
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="text-center">
                <p className="text-slate-400 text-xs tracking-wider">
                    ✨ 由 AI 智者為您解讀命運 ✨
                </p>
                <p className="text-slate-500 text-xs mt-2">
                    VIBE QUIRK LABS
                </p>
            </div>
        </div>
    );
};

export default ShareableCard;
