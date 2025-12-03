export const spreads = {
    oneCard: {
        id: 'oneCard',
        name: '單牌占卜',
        desc: '針對特定問題的快速指引',
        count: 1,
        positions: ['核心指引'],
        layoutType: 'center'
    },
    threeCard: {
        id: 'threeCard',
        name: '三牌陣 (時間之流)',
        desc: '過去、現在與未來的流動',
        count: 3,
        positions: ['過去', '現在', '未來'],
        layoutType: 'horizontal'
    },
    horseshoe: {
        id: 'horseshoe',
        name: '馬蹄鐵牌陣',
        desc: '分析問題的發展趨勢',
        count: 7,
        positions: ['過去背景', '目前現狀', '隱藏影響', '障礙/挑戰', '外在環境', '建議行動', '最終結果'],
        layoutType: 'arch'
    },
    celticCross: {
        id: 'celticCross',
        name: '凱爾特十字',
        desc: '深入分析所有層面的經典牌陣',
        count: 10,
        positions: ['現況', '阻礙/助力', '潛意識/基礎', '過去', '顯意識/目標', '未來', '自我態度', '環境影響', '希望/恐懼', '結果'],
        layoutType: 'celtic'
    },
    zodiac: {
        id: 'zodiac',
        name: '黃道十二宮',
        desc: '全方位的年度運勢或性格分析',
        count: 13,
        positions: ['牡羊(自我)', '金牛(財運)', '雙子(溝通)', '巨蟹(家庭)', '獅子(戀愛)', '處女(工作)', '天秤(合作)', '天蠍(深層)', '射手(信念)', '摩羯(事業)', '水瓶(社群)', '雙魚(靈性)', '總結核心'],
        layoutType: 'circle'
    }
};
