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
        const cardWidth = 176; // w-44 = 176px
        const containerWidth = 616; // 預留 padding 的容器可用寬度 (680px - 64px padding)
        const maxOverlap = -150; // 最大重疊量，確保至少露出部分

        if (cardCount <= 1) return 0;
        if (cardCount <= 3) return -70; // 少量牌維持較舒適的重疊

        // 多牌時動態計算：(容器寬度 - 單張牌寬度) / (牌數 - 1) - 牌寬度
        const calculatedMargin = (containerWidth - cardWidth) / (cardCount - 1) - cardWidth;

        // 取計算值與最大重疊量中較大（較寬鬆）的值
        return Math.max(calculatedMargin, maxOverlap);
    };

    const cardCount = drawnCards?.length || 0;
    const overlapValue = calculateOverlap(cardCount);

    return (
        <div
            id="shareable-card"
            className="fixed top-[-9999px] left-[-9999px] w-[680px] h-auto bg-gradient-to-b from-gray-900 via-purple-950 to-black flex flex-col items-center font-jhenghei p-8"
        >
            {/* 牌陣名稱 - 亮紫色 */}
            <p className="text-fuchsia-400 text-xl font-medium tracking-wider mb-6">
                {spreadName || '塔羅占卜'}
            </p>

            {/* 塔羅牌展示區 - 動態重疊效果 */}
            <div
                className="flex justify-center items-center mb-6"
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
            >
                {drawnCards && drawnCards.map((card, index) => (
                    <div
                        key={index}
                        className={`w-44 shrink-0 h-auto rounded-lg overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}
                        style={{
                            position: 'relative',
                            zIndex: index + 1,
                            marginLeft: index === 0 ? 0 : overlapValue
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}tarot-cards/card_${card.data?.id}.png`}
                            alt={card.data?.name || '塔羅牌'}
                            className="w-full h-auto object-cover rounded-lg"
                            style={{
                                filter: 'drop-shadow(-8px 0 8px rgba(0,0,0,0.8))'
                            }}
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
