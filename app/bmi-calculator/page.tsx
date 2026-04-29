"use client";

import React, { useState } from 'react';

export default function BMICalculator() {
  // State for inputs
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Enter details');

  // Calculation Logic
  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // cm to meters
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const score = parseFloat((w / (h * h)).toFixed(1));
      setBmi(score);

      if (score < 18.5) setCategory('Underweight');
      else if (score >= 18.5 && score <= 24.9) setCategory('Normal Weight');
      else if (score >= 25 && score <= 29.9) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <div className="text-[#111c2d] dark:text-[#e1e2ec] bg-white dark:bg-[#020617] min-h-screen flex flex-col font-sans transition-colors duration-300">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      
      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start pt-12 pb-24 px-4 relative">
        {/* Consistent Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 dark:bg-[#adc6ff]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          <div className="col-span-1 lg:col-span-12 mb-8 text-center">
            <h1 className="text-5xl font-bold text-[#111c2d] dark:text-white mb-2 leading-tight tracking-tight">BMI Calculator</h1>
            <p className="text-lg text-[#424754] dark:text-[#c2c6d6] max-w-2xl mx-auto">Calculate your Body Mass Index with precision.</p>
          </div>

          {/* Left: Inputs */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all">
              <h2 className="text-2xl font-semibold text-[#111c2d] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0058be] dark:text-[#adc6ff]">straighten</span> Measurements
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[#424754] dark:text-[#c2c6d6] mb-2 font-medium">Height (cm)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-white dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg py-3 px-4 text-[#111c2d] dark:text-white focus:border-[#0058be] dark:focus:border-[#adc6ff] outline-none transition-colors" 
                      placeholder="e.g., 175" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727785] dark:text-[#8c909f]">cm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#424754] dark:text-[#c2c6d6] mb-2 font-medium">Weight (kg)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-white dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg py-3 px-4 text-[#111c2d] dark:text-white focus:border-[#0058be] dark:focus:border-[#adc6ff] outline-none transition-colors" 
                      placeholder="e.g., 70" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727785] dark:text-[#8c909f]">kg</span>
                  </div>
                </div>

                <button 
                  onClick={calculateBMI}
                  className="w-full py-4 rounded-lg bg-[#0058be] dark:bg-[#adc6ff] text-white dark:text-[#00285d] font-bold shadow-lg hover:opacity-90 transition-all active:scale-95"
                >
                  Calculate BMI
                </button>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[300px] relative backdrop-blur-xl">
              <h3 className="text-sm text-[#727785] dark:text-[#c2c6d6] uppercase tracking-wider mb-2 font-bold">Your BMI Score</h3>
              <div className="text-[80px] font-black text-[#111c2d] dark:text-white leading-none mb-4 tracking-tighter">
                {bmi || '--.-'}
              </div>
              
              {/* Dynamic Category Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                bmi ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-[#4edea3]' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}>
                <span className="material-symbols-outlined text-[18px]">{bmi ? 'check_circle' : 'pending'}</span>
                <span className="text-sm font-semibold">{category}</span>
              </div>

              {/* Consistent Progress Bar */}
              <div className="w-full max-w-md mt-10 h-2 bg-slate-100 dark:bg-[#32353c] rounded-full flex overflow-hidden">
                <div className="h-full bg-orange-400 opacity-80" style={{ width: '18.5%' }}></div>
                <div className="h-full bg-emerald-500 opacity-80" style={{ width: '31.5%' }}></div>
                <div className="h-full bg-yellow-500 opacity-80" style={{ width: '20%' }}></div>
                <div className="h-full bg-red-500 opacity-80" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-[#111c2d] dark:text-white font-bold mb-2">Health Tip</h4>
                <p className="text-sm text-[#424754] dark:text-[#c2c6d6]">A healthy BMI for adults is between 18.5 and 24.9. Maintain a balanced diet and regular exercise.</p>
              </div>
              <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-[#111c2d] dark:text-white font-bold mb-2">Note</h4>
                <p className="text-sm text-[#424754] dark:text-[#c2c6d6]">BMI is a general guide. It doesn't account for muscle mass, bone density, or body composition.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}