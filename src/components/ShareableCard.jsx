import React from 'react';

const ShareableCard = ({ drawnCards, spreadName, aiSummary }) => {
    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[800px] h-[450px] bg-gradient-to-br from-gray-900 via-purple-950 to-black flex flex-row font-jhenghei overflow-hidden"
        >
            {/* 左側區域 - 塔羅牌 (40%) */}
            <div className="w-[40%] flex flex-col items-center justify-center p-6 bg-black/20">
                {/* 牌陣名稱 */}
                <p className="text-amber-400 text-sm tracking-wide mb-4">
                    {spreadName || '塔羅占卜'}
                </p>

                {/* 牌卡顯示 */}
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {drawnCards && drawnCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            <div
                                className={`w-16 h-[112px] bg-gradient-to-br from-amber-600 to-yellow-700 rounded-lg border-2 border-amber-400/50 flex items-center justify-center shadow-lg ${card.isReversed ? 'rotate-180' : ''}`}
                            >
                                <span className={`text-white text-center text-[10px] px-1 font-medium leading-tight ${card.isReversed ? 'rotate-180' : ''}`}>
                                    {card.data?.name || '神秘牌'}
                                </span>
                            </div>
                            <span className="text-amber-300 text-[10px] mt-1 text-center max-w-[64px]">
                                {card.isReversed ? '逆位' : '正位'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右側區域 - 說明文字 (60%) */}
            <div className="w-[60%] flex flex-col justify-center p-10">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-light tracking-[0.15em] text-white mb-1">
                        MYSTIC TAROT AI
                    </h1>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
                </div>

                {/* AI Summary - 完整顯示 */}
                {aiSummary && (
                    <div className="mb-6 overflow-hidden">
                        <p className="text-amber-100 text-base leading-relaxed text-left whitespace-pre-wrap">
                            {aiSummary}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto">
                    <p className="text-slate-400 text-xs tracking-wider">
                        ✨ 由 Gemini 為您解讀命運
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                        VIBE QUIRK LABS
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShareableCard;
