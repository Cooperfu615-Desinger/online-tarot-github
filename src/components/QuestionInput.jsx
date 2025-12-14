import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

function QuestionInput({ value, onChange }) {
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // 檢查瀏覽器是否支援 Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'zh-TW';

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                // 將辨識結果附加到現有文字
                onChange(prev => prev + transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [onChange]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <label className="block text-sm text-amber-200/80 mb-2">
                💭 在占卜前，寫下您心中的問題（選填）
            </label>
            <div className="relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="例如：我的感情會有好的發展嗎？我該不該換工作？"
                    rows={3}
                    className="w-full px-4 py-3 pr-14 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 resize-none transition-all"
                />
                {isSpeechSupported && (
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`absolute right-3 top-3 p-2 rounded-lg transition-all ${isListening
                                ? 'bg-red-500/80 text-white animate-pulse'
                                : 'bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white'
                            }`}
                        title={isListening ? '點擊停止錄音' : '點擊開始語音輸入'}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                )}
            </div>
            {isListening && (
                <p className="mt-2 text-xs text-red-400 animate-pulse flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    正在聆聽...請說出您的問題
                </p>
            )}
        </div>
    );
}

export default QuestionInput;
