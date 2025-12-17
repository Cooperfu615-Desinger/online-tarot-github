import React from 'react';

const ShareableCard = ({ drawnCards, spreadName, aiResult }) => {
    // 解析 AI 結果，僅提取智者建議
    const parseAdvice = (text) => {
        if (!text) return '';

        const adviceMatch = text.match(/智者建議[：:]\s*([\s\S]*?)(?=語氣與限制[：:]|$)/);
        if (adviceMatch) {
            return adviceMatch[1].trim();
        }
        return '';
    };

    const advice = parseAdvice(aiResult);

    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[600px] h-auto bg-gradient-to-b from-gray-900 via-purple-950 to-black flex flex-col items-center font-jhenghei p-8"
        >
            {/* 牌陣名稱 */}
            <p className="text-amber-400 text-lg tracking-wider mb-6">
                {spreadName || '塔羅占卜'}
            </p>

            {/* 塔羅牌展示區 - 重疊效果 */}
            <div className="flex flex-row justify-center items-center mb-8">
                {drawnCards && drawnCards.map((card, index) => (
                    <div
                        key={index}
                        className={`w-36 h-auto rounded-lg overflow-hidden border-2 border-white/30 shadow-xl ${index === 0 ? '' : 'ml-[-60px]'} ${card.isReversed ? 'rotate-180' : ''}`}
                        style={{ zIndex: index }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}tarot-cards/card_${card.data?.id}.png`}
                            alt={card.data?.name || '塔羅牌'}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* 智者建議區 */}
            {advice && (
                <div className="w-full text-center px-4 mb-8">
                    <h2 className="text-amber-400 text-lg font-medium mb-4 flex items-center justify-center gap-2">
                        💡 智者建議
                    </h2>
                    <p className="text-amber-100/90 text-lg leading-loose whitespace-pre-wrap">
                        {advice}
                    </p>
                </div>
            )}

            {/* 如果沒有 AI 結果，顯示等待提示 */}
            {!aiResult && (
                <div className="text-center py-8">
                    <p className="text-slate-400 text-lg">
                        等待 AI 解讀中...
                    </p>
                </div>
            )}

            {/* 頁尾區 */}
            <div className="mt-auto pt-6 text-center">
                <p className="text-slate-400 text-sm tracking-wider">
                    ✨ 由 Gemini 為您解讀命運
                </p>
                <p className="text-slate-500 text-xs mt-1">
                    VIBE QUIRK LABS
                </p>
            </div>
        </div>
    );
};

export default ShareableCard;
