import React, { useRef, useEffect } from 'react';
import { Bot, Sparkles, Loader2, AlertCircle } from 'lucide-react';

const AIResultPanel = ({ loading, result, onAsk, error, status, isReady }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (result && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [result]);

    return (
        <div className="mt-12 w-full max-w-4xl mx-auto" ref={scrollRef}>
            <div className="bg-black/40 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-amber-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-full">
                            <Bot className="text-amber-300" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-amber-100">AI 靈視解讀 (Gemini)</h3>
                    </div>
                </div>

                <div className="p-6 md:p-8 min-h-[150px]">
                    {!result && !loading && (
                        <div className="text-center py-4">
                            <p className="text-slate-300 mb-6 text-lg">
                                {isReady ? "所有的牌都已翻開，命運的路徑已顯現。" : "命運的路徑正在顯現..."}
                            </p>

                            {error && (
                                <div className="max-w-md mx-auto mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2 text-red-200 text-sm">
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                onClick={onAsk}
                                disabled={!isReady}
                                className={`group relative px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 mx-auto ${isReady
                                        ? 'bg-amber-600 hover:bg-amber-500 text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                <Sparkles size={18} className={isReady ? "group-hover:animate-spin" : ""} />
                                {isReady ? "請求大師解牌" : "請先翻開所有牌卡"}
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="relative">
                                <Loader2 size={48} className="text-amber-400 animate-spin" />
                                <div className="absolute inset-0 blur-lg bg-amber-400/30 animate-pulse"></div>
                            </div>
                            <p className="text-amber-200 animate-pulse tracking-widest font-bold">
                                {status || "正在連結阿卡西紀錄..."}
                            </p>
                        </div>
                    )}

                    {result && (
                        <div className="prose prose-invert prose-amber max-w-none">
                            <div className="whitespace-pre-wrap leading-relaxed text-slate-200 font-light text-lg">
                                {result}
                            </div>
                            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-500 text-center italic">
                                * 此解讀由 Google Gemini AI 生成，僅供娛樂與參考，請依隨您的直覺。
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIResultPanel;
