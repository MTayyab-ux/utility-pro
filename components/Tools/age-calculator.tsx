"use client";

import React, { useState, useEffect } from 'react';

export default function AgeCalculator() {
  // States for Date of Birth
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("7"); 
  const [year, setYear] = useState("1990");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  // Results State
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [stats, setStats] = useState({ totalMonths: 0, totalWeeks: 0, totalDays: 0, totalHours: 0 });
  const [nextBirthday, setNextBirthday] = useState({ daysAway: 0, percent: 0 });

  const calculateAge = () => {
    const birth = new Date(parseInt(year), parseInt(month), parseInt(day));
    const target = new Date(targetDate);

    if (isNaN(birth.getTime())) return;

    let y = target.getFullYear() - birth.getFullYear();
    let m = target.getMonth() - birth.getMonth();
    let d = target.getDate() - birth.getDate();

    if (d < 0) {
      m -= 1;
      d += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    setAge({ years: y, months: m, days: d });

    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setStats({
      totalMonths: y * 12 + m,
      totalWeeks: Math.floor(totalDays / 7),
      totalDays: totalDays,
      totalHours: totalDays * 24
    });

    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (target > nextBday) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysAway = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    setNextBirthday({
      daysAway,
      percent: Math.floor(((365 - daysAway) / 365) * 100)
    });
  };

  useEffect(() => {
    calculateAge();
  }, [day, month, year, targetDate]);

  return (
    <div className="text-[#111c2d] dark:text-[#e1e2ec] bg-white dark:bg-[#020617] min-h-screen flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/5 dark:bg-[#adc6ff]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#8c909f 1px, transparent 1px), linear-gradient(90(#8c909f 1px, transparent 1px)`, backgroundSize: '32px 32px' }}>
      </div>

      <main className="z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-24">
        <header className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-[#111c2d] dark:text-white mb-4 flex flex-col lg:flex-row items-center gap-3 tracking-tight">
            <span className="material-symbols-outlined text-[#0058be] dark:text-[#adc6ff] text-5xl">calendar_clock</span>
            Age Calculator
          </h1>
          <p className="text-lg text-[#424754] dark:text-[#c2c6d6] max-w-2xl">Precision chronological tracking. Generate detailed time breakdowns instantly.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0058be] to-transparent"></div>
              <h3 className="text-xl font-bold mb-6 text-[#111c2d] dark:text-white">Parameters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-[#424754] dark:text-[#c2c6d6] flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-sm">cake</span> Date of Birth
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select value={day} onChange={(e)=>setDay(e.target.value)} className="bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg p-2.5 outline-none focus:border-[#0058be] dark:focus:border-[#adc6ff] text-[#111c2d] dark:text-white transition-all">
                      {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                    <select value={month} onChange={(e)=>setMonth(e.target.value)} className="bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg p-2.5 outline-none focus:border-[#0058be] dark:focus:border-[#adc6ff] text-[#111c2d] dark:text-white transition-all">
                      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                    <input type="number" value={year} onChange={(e)=>setYear(e.target.value)} className="bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg p-2.5 outline-none focus:border-[#0058be] dark:focus:border-[#adc6ff] text-[#111c2d] dark:text-white w-full transition-all" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <label className="text-sm font-semibold text-[#424754] dark:text-[#c2c6d6] flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-sm">event</span> Calculate Age At
                  </label>
                  <input type="date" value={targetDate} onChange={(e)=>setTargetDate(e.target.value)} className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg p-2.5 outline-none text-[#111c2d] dark:text-white dark:[color-scheme:dark] transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bento Grid Results */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-white dark:bg-[#1d2027] border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-xl transition-all">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#727785] dark:text-[#8c909f] mb-6">Chronological Age</p>
              <div className="flex items-baseline gap-4 flex-wrap justify-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black text-[#0058be] dark:text-[#adc6ff] tracking-tighter">{age.years}</span>
                  <span className="text-xl font-bold text-[#424754] dark:text-[#c2c6d6]">Years</span>
                </div>
                <span className="text-4xl text-slate-200 dark:text-white/10 font-thin">/</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black text-[#111c2d] dark:text-white tracking-tighter">{age.months}</span>
                  <span className="text-xl font-bold text-[#424754] dark:text-[#c2c6d6]">Months</span>
                </div>
                <span className="text-4xl text-slate-200 dark:text-white/10 font-thin">/</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black text-[#111c2d] dark:text-white tracking-tighter">{age.days}</span>
                  <span className="text-xl font-bold text-[#424754] dark:text-[#c2c6d6]">Days</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-8 group hover:shadow-lg transition-all backdrop-blur-md">
              <div className="flex justify-between items-start mb-6">
                <div className="text-sm font-bold flex items-center gap-2 text-emerald-600 dark:text-[#4edea3] uppercase tracking-wider">
                  <span className="material-symbols-outlined">celebration</span> Next Birthday
                </div>
              </div>
              <div className="text-5xl font-black text-[#111c2d] dark:text-white mb-3 tracking-tighter">
                {nextBirthday.daysAway} <span className="text-lg font-bold text-[#727785] dark:text-[#c2c6d6] tracking-normal">Days away</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-[#32353c] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${nextBirthday.percent}%` }}></div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <div className="text-sm font-bold flex items-center gap-2 text-[#727785] dark:text-[#8c909f] mb-6 uppercase tracking-wider">
                <span className="material-symbols-outlined">data_usage</span> Total Time Elapsed
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111c2d] dark:text-white tracking-tight">{stats.totalMonths.toLocaleString()}</div>
                  <div className="text-xs font-bold text-[#727785] dark:text-[#8c909f] uppercase tracking-tighter">Months</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111c2d] dark:text-white tracking-tight">{stats.totalWeeks.toLocaleString()}</div>
                  <div className="text-xs font-bold text-[#727785] dark:text-[#8c909f] uppercase tracking-tighter">Weeks</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111c2d] dark:text-white tracking-tight">{stats.totalDays.toLocaleString()}</div>
                  <div className="text-xs font-bold text-[#727785] dark:text-[#8c909f] uppercase tracking-tighter">Days</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111c2d] dark:text-white tracking-tight">{stats.totalHours.toLocaleString()}</div>
                  <div className="text-xs font-bold text-[#727785] dark:text-[#8c909f] uppercase tracking-tighter">Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}