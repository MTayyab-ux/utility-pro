"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Salam! Main aapka AI assistant hoon. Main aapki math, coding ya kisi bhi task mein help kar sakta hoon. Poochiye kya poochna hai?' }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI Response (Bhai, yahan baad mein API integrate kar lein ge)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Aapne poocha: "${input}". Ye feature abhi development mein hai, par UI tayyar hai!` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white dark:bg-[#020617] transition-colors duration-300">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-none">UtilityPro AI</h1>
            <span className="text-[10px] text-emerald-500 font-medium">Online & Active</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
                ? "bg-[#0058be] text-white rounded-tr-none" 
                : "bg-slate-100 dark:bg-[#1d2027] text-slate-900 dark:text-[#e1e2ec] rounded-tl-none border border-slate-200 dark:border-white/5"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617]">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto relative flex items-center gap-2"
        >
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-slate-100 dark:bg-[#1d2027] border border-transparent focus:border-blue-500 dark:focus:border-[#adc6ff] rounded-xl py-4 pl-4 pr-12 text-sm text-slate-900 dark:text-white focus:outline-none transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 bg-[#0058be] text-white rounded-lg hover:bg-blue-700 transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}