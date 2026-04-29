"use client";
import React, { useState } from 'react';

export default function MathSolver() {
  const [question, setQuestion] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const mathSymbols = ['π', '√', 'x²', 'xⁿ', 'sin', 'cos', 'tan', 'log', '∫', 'Δ'];

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSolving(true);
    // Simulation for AI thinking
    setTimeout(() => {
      setIsSolving(false);
      alert("Bhai, solution logic backend integration ke baad active hogi!");
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-[#020617] transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        
        {/* Header Section */}
        <section className="text-center flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-[#adc6ff] text-xs font-bold self-center border border-blue-100 dark:border-blue-800">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI POWERED SOLVER
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Solve Math in Seconds</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload a photo or type your complex equation for step-by-step solutions.</p>
        </section>

        {/* Solver Card */}
        <div className="bg-white dark:bg-[#1d2027]/40 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleSolve} className="flex flex-col gap-6">
            
            {/* Symbols Toolbar */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
              {mathSymbols.map(sym => (
                <button 
                  key={sym}
                  type="button"
                  onClick={() => setQuestion(prev => prev + sym)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#32353c] text-slate-700 dark:text-slate-300 hover:bg-blue-500 hover:text-white text-sm font-serif transition-all"
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="relative">
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your math problem here (e.g., Integrate x^2 from 0 to 5)..."
                className="w-full min-h-[150px] p-5 bg-slate-50 dark:bg-[#020617]/50 border border-transparent focus:border-blue-500 rounded-2xl text-lg text-slate-900 dark:text-white resize-none outline-none transition-all placeholder:text-slate-400"
              />
              
              {/* Image Upload Trigger */}
              <button 
                type="button" 
                className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors bg-white dark:bg-[#1d2027] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                <span className="text-xs font-medium">Upload Image</span>
              </button>
            </div>

            {/* Action Button */}
            <button 
              disabled={isSolving}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                isSolving 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-[#0058be] hover:bg-[#004ca5] text-white shadow-blue-500/20 active:scale-[0.98]"
              }`}
            >
              {isSolving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Solving with AI...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">calculate</span>
                  Generate Solution
                </>
              )}
            </button>
          </form>
        </div>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1d2027]/40 border border-slate-100 dark:border-white/5">
            <span className="material-symbols-outlined text-blue-500 mb-2">history_edu</span>
            <h3 className="font-bold text-slate-900 dark:text-white">Step-by-Step</h3>
            <p className="text-xs text-slate-500 mt-1">Humein sirf answer nahi, balkay poora process samjhatay hain.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1d2027]/40 border border-slate-100 dark:border-white/5">
            <span className="material-symbols-outlined text-emerald-500 mb-2">query_stats</span>
            <h3 className="font-bold text-slate-900 dark:text-white">Graphing</h3>
            <p className="text-xs text-slate-500 mt-1">Equations ka visual graph automatically ban jata hai.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1d2027]/40 border border-slate-100 dark:border-white/5">
            <span className="material-symbols-outlined text-purple-500 mb-2">menu_book</span>
            <h3 className="font-bold text-slate-900 dark:text-white">Geometry</h3>
            <p className="text-xs text-slate-500 mt-1">Shapes aur area ke sawalaat chutkiyon mein hal karein.</p>
          </div>
        </section>
      </main>
    </div>
  );
}