"use client";

import React, { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState<number>(250000);
  const [rate, setRate] = useState<number>(5.5);
  const [term, setTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(1419.47);
  const [totalInterest, setTotalInterest] = useState<number>(261010.15);
  const [totalPayback, setTotalPayback] = useState<number>(511010.15);

  const calculateLoan = () => {
    const principal = amount;
    const calculatedInterest = rate / 100 / 12;
    const calculatedPayments = term * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      setMonthlyPayment(Number(monthly.toFixed(2)));
      setTotalPayback(Number((monthly * calculatedPayments).toFixed(2)));
      setTotalInterest(Number((monthly * calculatedPayments - principal).toFixed(2)));
    }
  };

  return (
    <div className="text-[#111c2d] dark:text-[#e1e2ec] bg-white dark:bg-[#020617] min-h-screen flex flex-col font-sans selection:bg-[#adc6ff]/30 transition-colors duration-300">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-12 pb-12 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-500/5 dark:bg-[#adc6ff]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <header className="mb-12 relative z-10 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-[#111c2d] dark:text-white mb-4 tracking-tight leading-tight">Loan Calculator</h1>
          <p className="text-lg text-[#424754] dark:text-[#c2c6d6] max-w-2xl">Estimate your monthly loan payments and see the total cost of your borrowing.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl p-8 rounded-2xl border border-[#E2E8F0] dark:border-white/10 shadow-lg transition-all">
            <h2 className="text-xl font-bold mb-6 text-[#111c2d] dark:text-white flex items-center gap-2">
               <span className="material-symbols-outlined text-[#0058be] dark:text-[#adc6ff]">account_balance</span>
               Loan Details
            </h2>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#424754] dark:text-[#c2c6d6]">Loan Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785] dark:text-[#8c909f] material-symbols-outlined">attach_money</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg py-3 pl-10 pr-4 text-[#111c2d] dark:text-white focus:border-[#0058be] dark:focus:border-[#adc6ff] outline-none font-mono transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#424754] dark:text-[#c2c6d6]">Annual Interest Rate (%)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785] dark:text-[#8c909f] material-symbols-outlined">percent</span>
                  <input 
                    type="number" step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg py-3 pl-10 pr-4 text-[#111c2d] dark:text-white focus:border-[#0058be] dark:focus:border-[#adc6ff] outline-none font-mono transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#424754] dark:text-[#c2c6d6]">Loan Term (Years)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785] dark:text-[#8c909f] material-symbols-outlined">calendar_month</span>
                  <input 
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-[#c2c6d6] dark:border-[#424754] rounded-lg py-3 pl-10 pr-4 text-[#111c2d] dark:text-white focus:border-[#0058be] dark:focus:border-[#adc6ff] outline-none font-mono transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={calculateLoan}
                className="w-full bg-[#0058be] dark:bg-[#adc6ff] text-white dark:text-[#00285d] font-bold py-4 rounded-xl hover:shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">calculate</span>
                Calculate Loan
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl p-8 rounded-2xl border border-[#E2E8F0] dark:border-white/10 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden flex-grow transition-all">
              <p className="text-xs text-[#0058be] dark:text-[#adc6ff] font-bold uppercase tracking-widest mb-2">Estimated Monthly Payment</p>
              <div className="text-7xl font-black text-[#111c2d] dark:text-white mb-4 tracking-tighter transition-all">
                ${monthlyPayment.toLocaleString()}
              </div>
              <p className="text-sm text-[#424754] dark:text-[#c2c6d6]">Principal and interest included.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl p-6 rounded-2xl border border-[#E2E8F0] dark:border-white/10 shadow-sm transition-all">
                <div className="flex items-center gap-2 text-[#424754] dark:text-[#c2c6d6] mb-4">
                  <span className="material-symbols-outlined text-orange-500 dark:text-orange-400">payments</span>
                  <span className="text-xs uppercase font-bold tracking-wider">Total Interest</span>
                </div>
                <div className="text-3xl font-bold text-[#111c2d] dark:text-white transition-all">${totalInterest.toLocaleString()}</div>
              </div>
              <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl p-6 rounded-2xl border border-[#E2E8F0] dark:border-white/10 shadow-sm transition-all">
                <div className="flex items-center gap-2 text-[#424754] dark:text-[#c2c6d6] mb-4">
                  <span className="material-symbols-outlined text-emerald-500 dark:text-[#4edea3]">account_balance_wallet</span>
                  <span className="text-xs uppercase font-bold tracking-wider">Total Payback</span>
                </div>
                <div className="text-3xl font-bold text-[#111c2d] dark:text-white transition-all">${totalPayback.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Preview */}
        <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl p-8 rounded-2xl border border-[#E2E8F0] dark:border-white/10 mt-12 overflow-x-auto shadow-sm">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#111c2d] dark:text-white mb-1">Amortization Schedule</h2>
              <p className="text-sm text-[#424754] dark:text-[#c2c6d6]">Annual breakdown of your balance.</p>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs text-[#727785] dark:text-[#8c909f] uppercase font-bold">
                <th className="pb-4 px-2">Year</th>
                <th className="pb-4 px-2">Balance</th>
                <th className="pb-4 px-2">Interest</th>
                <th className="pb-4 px-2">Principal</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono">
              <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[#111c2d] dark:text-[#e1e2ec]">
                <td className="py-4 px-2">1</td>
                <td className="py-4 px-2">$250,000.00</td>
                <td className="py-4 px-2 text-orange-600 dark:text-orange-400">$13,674.32</td>
                <td className="py-4 px-2 text-emerald-600 dark:text-[#4edea3]">$3,359.36</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[#111c2d] dark:text-[#e1e2ec]">
                <td className="py-4 px-2">2</td>
                <td className="py-4 px-2">$246,640.64</td>
                <td className="py-4 px-2 text-orange-600 dark:text-orange-400">$13,484.85</td>
                <td className="py-4 px-2 text-emerald-600 dark:text-[#4edea3]">$3,548.83</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}