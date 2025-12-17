import React from 'react';

const ShareableCard = ({ drawnCards, spreadName, aiResult }) => {
    // 解析 AI 結果，提取特定段落
    const parseAiResult = (text) => {
        if (!text) return { interpretation: '', advice: '' };

        let interpretation = '';
        let advice = '';

        // 提取解讀段落
        const interpretationMatch = text.match(/解讀[：:]\s*([\s\S]*?)(?=說明[：:]|智者建議[：:]|$)/);
        if (interpretationMatch) {
            interpretation = interpretationMatch[1].trim();
        }

        // 提取智者建議段落
        const adviceMatch = text.match(/智者建議[：:]\s*([\s\S]*?)(?=語氣與限制[：:]|$)/);
        if (adviceMatch) {
            advice = adviceMatch[1].trim();
        }

        return { interpretation, advice };
    };

    const { interpretation, advice } = parseAiResult(aiResult);

    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[800px] h-[500px] bg-gradient-to-br from-gray-900 via-purple-950 to-black flex flex-row font-jhenghei overflow-hidden"
        >
            {/* 左側區域 - 真實塔羅牌圖片 (40%) */}
            <div className="w-[40%] flex flex-col items-center justify-center p-4 bg-black/20">
                {/* 牌陣名稱 */}
                <p className="text-amber-400 text-sm tracking-wide mb-3">
                    {spreadName || '塔羅占卜'}
                </p>

                {/* 牌卡顯示 - 使用真實圖片 */}
                <div className="flex flex-wrap justify-center items-start gap-2 max-h-[380px] overflow-hidden">
                    {drawnCards && drawnCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            {/* 真實牌面圖片 */}
                            <div
                                className={`w-14 h-[98px] rounded-md overflow-hidden border border-amber-500/50 shadow-lg ${card.isReversed ? 'rotate-180' : ''}`}
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}tarot-cards/card_${card.data?.id}.png`}
                                    alt={card.data?.name || '塔羅牌'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* 牌名與狀態 */}
                            <p className="text-amber-200 text-[9px] mt-1 text-center leading-tight max-w-[56px]">
                                {card.data?.name}
                            </p>
                            <span className={`text-[8px] ${card.isReversed ? 'text-red-400' : 'text-green-400'}`}>
                                ({card.isReversed ? '逆位' : '正位'})
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右側區域 - 解讀與建議 (60%) */}
            <div className="w-[60%] flex flex-col p-6 overflow-hidden">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-xl font-light tracking-[0.15em] text-white mb-1">
                        MYSTIC TAROT AI
                    </h1>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
                </div>

                {/* 解讀區塊 */}
                {interpretation && (
                    <div className="mb-4">
                        <h2 className="text-amber-400 text-sm font-medium mb-2 flex items-center gap-1">
                            ✨ 命運解讀
                        </h2>
                        <p className="text-amber-100/90 text-sm leading-relaxed whitespace-pre-wrap line-clamp-3">
                            {interpretation}
                        </p>
                    </div>
                )}

                {/* 智者建議區塊 */}
                {advice && (
                    <div className="mb-4 flex-1 overflow-hidden">
                        <h2 className="text-amber-400 text-sm font-medium mb-2 flex items-center gap-1">
                            💡 智者建議
                        </h2>
                        <p className="text-amber-100/90 text-sm leading-relaxed whitespace-pre-wrap line-clamp-6">
                            {advice}
                        </p>
                    </div>
                )}

                {/* 如果沒有 AI 結果，顯示等待提示 */}
                {!aiResult && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-slate-400 text-sm">
                            等待 AI 解讀中...
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-2">
                    <p className="text-slate-400 text-xs tracking-wider">
                        ✨ 由 Gemini 為您解讀命運
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5">
                        VIBE QUIRK LABS
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShareableCard;
