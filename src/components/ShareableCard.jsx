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

    // 動態計算卡片重疊距離
    const calculateOverlap = (cardCount) => {
        const cardWidth = 192; // w-48 = 192px
        const containerWidth = 536; // 600px - padding

        if (cardCount <= 1) return 0;
        if (cardCount <= 4) return -80; // 少量牌維持美觀重疊

        // 多牌時動態計算，確保所有牌都能顯示在容器內
        const totalWidth = cardWidth * cardCount;
        const overflow = totalWidth - containerWidth;
        const overlap = -Math.ceil(overflow / (cardCount - 1));

        return Math.max(overlap, -160); // 限制最大重疊，避免完全遮蓋
    };

    const cardCount = drawnCards?.length || 0;
    const overlapValue = calculateOverlap(cardCount);

    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[600px] h-auto bg-gradient-to-b from-gray-900 via-purple-950 to-black flex flex-col items-center font-jhenghei p-8"
        >
            {/* 牌陣名稱 - 亮紫色 */}
            <p className="text-fuchsia-400 text-xl font-medium tracking-wider mb-6">
                {spreadName || '塔羅占卜'}
            </p>

            {/* 塔羅牌展示區 - 動態重疊效果 */}
            <div className="flex flex-row justify-center items-center mb-6">
                {drawnCards && drawnCards.map((card, index) => (
                    <div
                        key={index}
                        className={`w-48 h-auto rounded-lg overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}
                        style={{
                            zIndex: index,
                            marginLeft: index === 0 ? 0 : overlapValue
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}tarot-cards/card_${card.data?.id}.png`}
                            alt={card.data?.name || '塔羅牌'}
                            className="w-full h-auto object-cover rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                        />
                    </div>
                ))}
            </div>

            {/* 智者建議區 - 精簡樣式 */}
            {advice && (
                <div className="w-full text-center px-6 mb-4">
                    <h2 className="text-purple-300 text-sm font-medium mb-2 flex items-center justify-center gap-2">
                        💡 智者建議
                    </h2>
                    <p className="text-amber-100/90 text-xs leading-tight whitespace-pre-wrap max-w-[500px] mx-auto">
                        {advice}
                    </p>
                </div>
            )}

            {/* 如果沒有 AI 結果，顯示等待提示 */}
            {!aiResult && (
                <div className="text-center py-4">
                    <p className="text-slate-400 text-sm">
                        等待 AI 解讀中...
                    </p>
                </div>
            )}

            {/* 頁尾區 - 簡化文字 */}
            <div className="mt-auto pt-4 text-center">
                <p className="text-slate-400 text-sm tracking-wider">
                    Gemini 解讀命運
                </p>
                <p className="text-slate-500 text-xs mt-1">
                    VIBE QUIRK LABS
                </p>
            </div>
        </div>
    );
};

export default ShareableCard;
