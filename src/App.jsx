import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sparkles, RefreshCw, ChevronLeft, Bot } from 'lucide-react';
import { MAJOR_ARCANA } from './data/tarotCards';
import { spreads } from './data/spreads';
import ScatteredDeck from './components/ScatteredDeck';
import Card from './components/Card';
import Placeholder from './components/Placeholder';
import AIResultPanel from './components/AIResultPanel';

// --- 設定您的 API KEY ---
// 請將您的 Google AI Studio API Key 貼在下方引號中
const GOOGLE_API_KEY = "AIzaSyCMxfAtkDvAuj0xv27trP1siAdW1Qe8MjI";

function App() {
    const [currentView, setCurrentView] = useState('welcome');
    const [selectedSpread, setSelectedSpread] = useState(null);
    const [deck, setDeck] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState("");

    useEffect(() => {
        const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
        setDeck(shuffled);
    }, [currentView]);

    const handleStart = () => setCurrentView('select');

    const handleSelectSpread = (key) => {
        setSelectedSpread(spreads[key]);
        setDrawnCards([]);
        setAiResult(null);
        setError(null);
        setCurrentView('reading');
    };

    const handleDrawCard = () => {
        if (drawnCards.length >= selectedSpread.count) return;
        const newCard = { data: deck[drawnCards.length], revealed: false };
        setDrawnCards([...drawnCards, newCard]);
    };

    const toggleReveal = (index) => {
        const newCards = [...drawnCards];
        newCards[index].revealed = !newCards[index].revealed;
        setDrawnCards(newCards);
    };

    const resetGame = () => {
        setCurrentView('welcome');
        setSelectedSpread(null);
        setDrawnCards([]);
        setAiResult(null);
        setError(null);
    };

    const allCardsRevealed = drawnCards.length === selectedSpread?.count && drawnCards.every(c => c.revealed);

    // AI 處理邏輯
    const generatePrompt = () => {
        let prompt = `你是一位專業且富有神祕感的塔羅牌占卜師。使用者選擇了「${selectedSpread.name}」。\n`;
        prompt += `牌陣描述：${selectedSpread.desc}。\n\n請根據以下抽出的牌進行綜合解讀：\n`;

        drawnCards.forEach((card, index) => {
            const position = selectedSpread.positions[index];
            prompt += `${index + 1}. 位置「${position}」抽到了：${card.data.name} (關鍵字：${card.data.keyword})\n`;
        });

        prompt += `\n請給出一個總結性的解釋，語氣要優雅、神祕但具有啟發性。請包含：整體運勢分析、具體的建議行動。請使用繁體中文回答。`;
        return prompt;
    };

    const fetchGeminiReading = async () => {
        if (!GOOGLE_API_KEY || GOOGLE_API_KEY.includes("您的")) {
            setError("請先在程式碼中設定正確的 GOOGLE_API_KEY");
            return;
        }

        setAiLoading(true);
        setError(null);

        const prompt = generatePrompt();

        try {
            setLoadingStatus(`正在嘗試連結 gemini-1.5-flash 模型...`);

            const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" }); // 如果失敗，請嘗試改用 "gemini-pro"
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            if (text) {
                setAiResult(text);
            }
        } catch (err) {
            setError(`連結失敗: ${err.message || "無法找到可用的模型，請檢查 API Key 是否正確。"}`);
        }

        setAiLoading(false);
        setLoadingStatus("");
    };

    // 佈局渲染器
    const renderLayout = () => {
        const slots = Array.from({ length: selectedSpread.count });
        const renderSlot = (index, customClass = "") => {
            const card = drawnCards[index];
            const isNew = index === drawnCards.length - 1;
            const positionName = selectedSpread.positions[index];
            return (
                <div key={index} className={`${customClass} transition-all duration-500`}>
                    {card ? (
                        <Card
                            data={card.data}
                            positionName={positionName}
                            isRevealed={card.revealed}
                            onReveal={() => toggleReveal(index)}
                            index={index}
                            isNew={isNew}
                        />
                    ) : (
                        <Placeholder index={index} positionName={positionName} />
                    )}
                </div>
            );
        };

        if (selectedSpread.layoutType === 'center') return <div className="flex justify-center items-center min-h-[40vh]">{renderSlot(0)}</div>;
        if (selectedSpread.layoutType === 'horizontal') return <div className="flex flex-col md:flex-row justify-center items-center gap-8 min-h-[40vh]">{slots.map((_, i) => renderSlot(i))}</div>;
        if (selectedSpread.layoutType === 'arch') {
            return (
                <div className="flex flex-wrap justify-center items-start gap-4 md:gap-2 min-h-[50vh] pt-10">
                    <div className="grid grid-cols-2 md:flex md:items-end md:gap-4">
                        {slots.map((_, i) => {
                            let translateY = 'md:translate-y-0';
                            if (i === 0 || i === 6) translateY = 'md:-translate-y-12';
                            if (i === 1 || i === 5) translateY = 'md:-translate-y-4';
                            if (i === 3) translateY = 'md:translate-y-4';
                            return renderSlot(i, translateY);
                        })}
                    </div>
                </div>
            );
        }
        if (selectedSpread.layoutType === 'celtic') {
            return (
                <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-5xl mx-auto">
                    <div className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center">
                        <div className="md:hidden grid grid-cols-2 gap-4">{slots.slice(0, 6).map((_, i) => renderSlot(i))}</div>
                        <div className="hidden md:block relative w-full h-full">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">{renderSlot(0)}</div>
                            <div className="absolute top-1/2 left-1/2 translate-x-4 translate-y-4 z-20 rotate-90 scale-95 origin-center pointer-events-none">{renderSlot(1)}</div>
                            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2">{renderSlot(2)}</div>
                            <div className="absolute top-1/2 left-[15%] -translate-y-1/2">{renderSlot(3)}</div>
                            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2">{renderSlot(4)}</div>
                            <div className="absolute top-1/2 right-[15%] -translate-y-1/2">{renderSlot(5)}</div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-4 md:border-l md:border-amber-500/30 md:pl-12">
                        {[6, 7, 8, 9].map(i => renderSlot(i))}
                    </div>
                </div>
            );
        }
        if (selectedSpread.layoutType === 'circle') {
            return (
                <div className="relative min-h-[70vh] flex items-center justify-center w-full">
                    <div className="md:hidden grid grid-cols-2 gap-4 pb-10">{slots.map((_, i) => renderSlot(i))}</div>
                    <div className="hidden md:block relative w-[600px] h-[600px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">{renderSlot(12)}</div>
                        {slots.slice(0, 12).map((_, i) => {
                            const angle = (i * 30) - 90;
                            const radius = 250;
                            const x = Math.cos((angle * Math.PI) / 180) * radius;
                            const y = Math.sin((angle * Math.PI) / 180) * radius;
                            return <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}>{renderSlot(i)}</div>;
                        })}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-amber-50 selection:bg-amber-500/30 overflow-x-hidden font-jhenghei">
            <nav className="p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-400" />
                    <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                        MYSTIC TAROT AI
                    </h1>
                </div>
                {currentView !== 'welcome' && (
                    <button onClick={resetGame} className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
                        <RefreshCw size={14} /> 重置
                    </button>
                )}
            </nav>

            <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
                {currentView === 'welcome' && (
                    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-8 animate-in fade-in duration-1000">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-purple-600/20 blur-xl rounded-full animate-pulse"></div>
                            <Bot size={80} className="text-amber-200 relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light tracking-widest">
                            AI 靈性<span className="text-amber-400 font-bold italic">解讀</span>
                        </h2>
                        <p className="text-slate-400 max-w-md mx-auto">
                            結合古老塔羅智慧與現代人工智慧，為您揭示命運的啟示。
                        </p>
                        <button onClick={handleStart} className="mt-8 px-12 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full text-white font-bold tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                            開始占卜
                        </button>
                    </div>
                )}

                {currentView === 'select' && (
                    <div className="animate-in slide-in-from-bottom-10 duration-700">
                        <h2 className="text-2xl text-center mb-8 font-light text-amber-200">選擇牌陣</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {Object.values(spreads).map((spread) => (
                                <button
                                    key={spread.id}
                                    onClick={() => handleSelectSpread(spread.id)}
                                    className="group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-amber-100">{spread.name}</h3>
                                        <span className="bg-black/30 px-2 py-1 rounded text-xs text-amber-400 border border-amber-400/30">
                                            {spread.count} 張牌
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400">{spread.desc}</p>
                                </button>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <button onClick={() => setCurrentView('welcome')} className="text-slate-500 hover:text-white flex items-center justify-center gap-2 mx-auto">
                                <ChevronLeft size={16} /> 返回
                            </button>
                        </div>
                    </div>
                )}

                {currentView === 'reading' && selectedSpread && (
                    <div className="animate-in fade-in duration-500 pb-20">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-amber-200">{selectedSpread.name}</h2>
                                <p className="text-sm text-slate-400">請翻開所有牌卡以解鎖 AI 解讀功能</p>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center gap-6">
                                {drawnCards.length < selectedSpread.count ? (
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm animate-pulse text-amber-200 hidden md:block">點擊右側牌堆抽牌</p>
                                        <ScatteredDeck onClick={handleDrawCard} remainingCards={selectedSpread.count - drawnCards.length} />
                                    </div>
                                ) : !allCardsRevealed ? (
                                    <div className="text-sm text-amber-400 flex items-center gap-2 bg-amber-900/20 px-4 py-2 rounded-full border border-amber-500/30">
                                        <Sparkles size={14} /> 請點擊所有牌背將其翻開
                                    </div>
                                ) : (
                                    <div className="text-sm text-green-400 flex items-center gap-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30">
                                        <Sparkles size={14} /> 準備就緒
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full min-h-[500px] bg-white/5 rounded-3xl border border-white/5 p-4 md:p-8 overflow-hidden shadow-inner mb-8">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
                            {renderLayout()}
                        </div>

                        {allCardsRevealed && (
                            <AIResultPanel
                                loading={aiLoading}
                                result={aiResult}
                                onAsk={fetchGeminiReading}
                                error={error}
                                status={loadingStatus}
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
