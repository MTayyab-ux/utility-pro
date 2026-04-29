"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  
  // --- Typewriter Effect Logic ---
  const words = ["BMI Calculator", "Age Calculator", "Loan Estimator", "Color Converter", "AI Math Solver"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        setPlaceholder(fullWord.substring(0, placeholder.length + 1));
        setSpeed(150);
        if (placeholder === fullWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setPlaceholder(fullWord.substring(0, placeholder.length - 1));
        setSpeed(50);
        if (placeholder === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, currentWordIndex]);

  // --- Calculator Logic ---
  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
      let result = 0;
      switch (func) {
        case 'sin': result = Math.sin(val * Math.PI / 180); break;
        case 'cos': result = Math.cos(val * Math.PI / 180); break;
        case 'tan': result = Math.tan(val * Math.PI / 180); break;
        case 'log': result = Math.log10(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'sq': result = Math.pow(val, 2); break;
        case 'pi': result = Math.PI; break;
        default: return;
      }
      setDisplay(result.toFixed(4).replace(/\.?0+$/, ""));
    } catch {
      setDisplay("Error");
    }
  };

  const calculate = () => {
    try {
      const result = eval(expression + display);
      setDisplay(result.toString());
      setExpression("");
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  return (
    <div className="text-[#111c2d] dark:text-[#e1e2ec] bg-white dark:bg-[#020617] min-h-screen flex flex-col font-sans transition-colors duration-300">
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex flex-col gap-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 dark:bg-[#adc6ff]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6 w-full">
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Precision Tools for<br/>
              <span className="text-[#0058be] dark:text-[#adc6ff]">Everyday Efficiency.</span>
            </h1>
            <p className="text-lg text-[#424754] dark:text-[#c2c6d6] max-w-lg">
              Instantly calculate, convert, and format data with our suite of high-performance utilities.
            </p>
            
            <div className="relative w-full max-w-xl mt-4">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727785]">search</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1d2027]/50 border border-[#c2c6d6] dark:border-[#424754]/30 rounded-xl focus:ring-2 focus:ring-[#0058be] shadow-sm backdrop-blur-md outline-none" 
                placeholder={`Search for ${placeholder}|`} 
                type="text"
              />
            </div>
          </div>

          {/* Scientific Calculator Card */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div className="bg-white dark:bg-[#1d2027]/60 border border-[#E2E8F0] dark:border-white/10 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 backdrop-blur-xl border-t-4 border-t-[#0058be]">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0058be]">function</span>
                  Scientific Calculator
                </h2>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-1 rounded-full font-bold uppercase">Pro Mode</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#020617]/80 border border-[#c2c6d6] dark:border-[#424754]/50 rounded-2xl p-5 text-right shadow-inner">
                <div className="text-xs text-slate-400 h-5 font-mono">{expression}</div>
                <div className="text-4xl font-mono tracking-tighter dark:text-[#adc6ff] truncate">{display}</div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['sin', 'cos', 'tan', 'sqrt'].map((func) => (
                  <button key={func} onClick={() => handleScientific(func)} className="text-[11px] font-bold py-2 rounded-lg bg-slate-100 dark:bg-[#32353c] text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white transition-all uppercase">{func}</button>
                ))}
                {['log', 'sq', 'pi', 'AC'].map((func) => (
                   func === 'AC' ? 
                   <button key={func} onClick={clear} className="text-[11px] font-bold py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all">{func}</button> :
                   <button key={func} onClick={() => handleScientific(func)} className="text-[11px] font-bold py-2 rounded-lg bg-slate-100 dark:bg-[#32353c] text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white transition-all uppercase">{func}</button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[7, 8, 9].map(n => <NumBtn key={n} n={n} onClick={() => handleNumber(n.toString())} />)}
                <OpBtn op="÷" onClick={() => handleOperator('/')} />
                {[4, 5, 6].map(n => <NumBtn key={n} n={n} onClick={() => handleNumber(n.toString())} />)}
                <OpBtn op="×" onClick={() => handleOperator('*')} />
                {[1, 2, 3].map(n => <NumBtn key={n} n={n} onClick={() => handleNumber(n.toString())} />)}
                <OpBtn op="-" onClick={() => handleOperator('-')} />
                <NumBtn n={0} onClick={() => handleNumber("0")} colSpan="col-span-2" />
                <button onClick={calculate} className="bg-[#0058be] dark:bg-[#adc6ff] text-white dark:text-[#00285d] rounded-xl col-span-2 font-bold text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/20">=</button>
              </div>
            </div>
          </div>
        </section>

        {/* --- New Category Grid Section --- */}
        <section className="flex flex-col gap-10 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Explore more than 1,000 calculators in different categories.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-6">
            <CategoryItem icon="favorite" title="Health" />
            <CategoryItem icon="calculate" title="Math" />
            <CategoryItem icon="info" title="Everyday Life" />
            <CategoryItem icon="payments" title="Finance" />
            <CategoryItem icon="science" title="Physics" />
            <CategoryItem icon="flask" title="Chemistry" />
            <CategoryItem icon="bar_chart" title="Statistics" />
            <CategoryItem icon="architecture" title="Construction" />
            <CategoryItem icon="pets" title="Pets" />
            <CategoryItem icon="calendar_month" title="Time & Date" />
            <CategoryItem icon="auto_awesome" title="AI Tools" />
            <CategoryItem icon="view_in_ar" title="Conversion" />
          </div>
        </section>

        {/* Tools Section */}
        <section className="flex flex-col gap-8 mt-8">
          <h2 className="text-3xl font-bold border-b border-slate-200 dark:border-slate-800 pb-4">Essential Utilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard icon="monitor_weight" title="BMI Calculator" desc="Determine your BMI quickly." cat="Health" href="/bmi-calculator" />
            <ToolCard icon="real_estate_agent" title="Loan Calculator" desc="Estimate payments and interest." cat="Finance" href="/loan-calculator" />
            <ToolCard icon="cake" title="Age Calculator" desc="Calculate exact age easily." cat="Time" href="/age-calculator" />
            <ToolCard icon="palette" title="Color Converter" desc="Translate color formats instantly." cat="Design" href="/color-converter" />
          </div>
        </section>
      </main>
    </div>
  );
}

// --- New Helper Component for Category Items ---
function CategoryItem({ icon, title }: { icon: string, title: string }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border border-transparent group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
        <span className="material-symbols-outlined text-4xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {icon}
        </span>
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">
        {title}
      </span>
    </div>
  );
}

// Existing Helper Components
function NumBtn({ n, onClick, colSpan = "" }: { n: number, onClick: () => void, colSpan?: string }) {
  return (
    <button onClick={onClick} className={`${colSpan} bg-white dark:bg-[#32353c]/50 border border-slate-200 dark:border-white/5 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 dark:hover:bg-[#32353c] transition-colors`}>
      {n}
    </button>
  );
}

function OpBtn({ op, onClick }: { op: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-blue-50 dark:bg-blue-900/20 text-[#0058be] dark:text-[#adc6ff] py-4 rounded-xl font-bold text-xl hover:bg-[#0058be] hover:text-white transition-all">
      {op}
    </button>
  );
}

function ToolCard({ icon, title, desc, cat, href }: { icon: string, title: string, desc: string, cat: string, href: string }) {
  return (
    <Link href={href} className="group bg-white dark:bg-[#1d2027]/40 border border-[#E2E8F0] dark:border-white/5 p-6 rounded-2xl hover:shadow-xl transition-all backdrop-blur-md">
      <div className="w-12 h-12 bg-blue-50 dark:bg-[#32353c] text-[#0058be] dark:text-[#adc6ff] rounded-xl flex items-center justify-center group-hover:bg-[#0058be] group-hover:text-white transition-colors">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="text-lg font-bold mt-4 group-hover:text-[#0058be] transition-colors">{title}</h3>
      <p className="text-sm text-[#424754] dark:text-[#c2c6d6] mt-1">{desc}</p>
    </Link>
  );
}