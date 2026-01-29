
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Transaction } from '../types';

interface AiAssistantProps {
  onClose: () => void;
  transactions: Transaction[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onClose, transactions }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am Zerah AI. How can I help you manage your global finances today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { 
            text: `You are Zerah AI, a financial assistant for a fintech app called Zerah Finance. 
            User's transactions: ${JSON.stringify(transactions)}. 
            User query: ${userMsg}. 
            Keep answers short, professional, and helpful. Focus on global banking, FX, and savings.` 
          }
        ],
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that. Try asking about your spending or FX rates." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection issues. Please check your network." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#052826]/95 flex flex-col p-6 animate-slideUp">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-8 h-8 bg-[#B7CC16] rounded-lg flex items-center justify-center text-[#052826] font-bold">Z</span>
          Zerah AI Assistant
        </h2>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#B7CC16] text-[#052826] font-medium' : 'bg-[#01203F] border border-white/10'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#01203F] p-4 rounded-2xl flex gap-1">
              <div className="w-2 h-2 bg-[#B7CC16] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#B7CC16] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-[#B7CC16] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 bg-[#01203F] p-2 rounded-2xl border border-[#B7CC16]/20">
        <input 
          type="text" 
          placeholder="Ask Zerah AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent border-none outline-none px-4 text-sm"
        />
        <button 
          onClick={handleSend}
          className="bg-[#B7CC16] text-[#052826] p-2 rounded-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
