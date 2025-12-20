
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是你的助手。散养确实挑战很大，今天它让你感到烦躁了吗？告诉我，我们一起解决。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await geminiService.sendMessage(history, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[380px] sm:h-[450px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          在线训犬指导
        </h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl p-3 text-[12px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex space-x-1.5">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问助手..."
            className="flex-1 px-4 py-2 bg-slate-100 border-none rounded-full text-[12px] focus:ring-1 focus:ring-amber-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-amber-600 text-white p-2 rounded-full active:scale-90 transition-transform disabled:opacity-50 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
