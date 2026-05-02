"use client";
import { useEffect, useState } from 'react';
import { LucideInfo } from 'lucide-react';
import { calculateBySlug, PENDING_RESULT } from "../src/lib/calculations";
import type { ToolConfig } from "../src/lib/tools-data";
import type { LoanVisualData } from "../src/lib/calculations";
import BMIScale from "./BMIScale";
import LoanChart from "./LoanChart";

export default function UniversalTool({ config, slug }: { config: ToolConfig; slug: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [numericResult, setNumericResult] = useState<number | undefined>(undefined);
  const [loanVisualData, setLoanVisualData] = useState<LoanVisualData | undefined>(undefined);
  const [showPulse, setShowPulse] = useState(false);

  const handleCalculate = () => {
    const calcResult = calculateBySlug(slug, formData);
    setResult(calcResult.display);
    setNumericResult(calcResult.numericValue);
    setLoanVisualData(calcResult.loanData);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
    setShowPulse(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      handleCalculate();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [formData, slug]);

  useEffect(() => {
    if (!showPulse) return;
    const pulseTimer = window.setTimeout(() => setShowPulse(false), 500);
    return () => window.clearTimeout(pulseTimer);
  }, [showPulse]);

  const getFormula = () => {
    if (slug === "bmi-calculator") return "BMI = weight (kg) / [height (m)]²";
    if (slug === "age-calculator") return "Age = current year - birth year (adjusted by date)";
    if (slug === "loan-calculator") return "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)";
    return "Result = function(inputs)";
  };

  const getExplanation = () => {
    if (!result || result === PENDING_RESULT) return "Provide valid values to generate an accurate result and interpretation.";
    if (slug === "bmi-calculator") {
      const bmiValue = Number(result);
      if (!Number.isFinite(bmiValue)) return "BMI is calculated from your weight and height.";
      if (bmiValue < 18.5) return `Your BMI is ${bmiValue.toFixed(2)}, which falls in the Underweight range. A balanced nutrition plan and strength-focused routine may help improve your health profile.`;
      if (bmiValue < 25) return `Your BMI is ${bmiValue.toFixed(2)}, which is considered Healthy. Maintain this with consistent movement, quality sleep, and sustainable food habits.`;
      if (bmiValue < 30) return `Your BMI is ${bmiValue.toFixed(2)}, which is in the Overweight range. Small, consistent changes in diet and activity can improve this trend over time.`;
      return `Your BMI is ${bmiValue.toFixed(2)}, which is in the Obese range. Consider discussing a personalized health plan with a qualified professional.`;
    }
    if (slug === "age-calculator") {
      return `Based on your date of birth, your current age is ${result}. This value updates automatically and can be used for forms, eligibility checks, and planning.`;
    }
    if (slug === "loan-calculator") {
      return `Your estimated loan output is ${result}. Monthly payment and total interest update instantly as amount, rate, or duration changes.`;
    }
    return `Your latest result is ${result}. Update any parameter to instantly see revised outputs and insights.`;
  };

  const renderVisuals = () => {
    if (slug === "bmi-calculator") {
      return <BMIScale value={numericResult} />;
    }

    if (slug === "loan-calculator") {
      return <LoanChart data={loanVisualData} />;
    }

    return (
      <div className="text-sm text-slate-600 dark:text-slate-300">
        Visual insights for this tool will appear here when chart data is available.
      </div>
    );
  };

  const renderField = (field: any) => {
    const value = formData[field.id] ?? "";

    if (field.type === "range") {
      return (
        <div className="space-y-2.5">
          <input
            type="range"
            min={field.min ?? 0}
            max={field.max ?? 100}
            step={field.step ?? 1}
            value={value || field.min || 0}
            className="w-full h-1.5 rounded-full appearance-none bg-slate-200/80 dark:bg-white/15 accent-blue-500 cursor-pointer"
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
          <div className="text-xs text-slate-500 dark:text-slate-400">{value || field.min || 0}</div>
        </div>
      );
    }

    return (
      <input
        type={field.type}
        placeholder={field.placeholder}
        className="w-full bg-white/85 dark:bg-slate-900/55 border border-black/5 dark:border-white/10 px-3.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/30 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
        onChange={(e) => handleInputChange(field.id, e.target.value)}
      />
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-10">
      {/* 1. Tool Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-2.5 leading-tight">
          {config.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300/90 text-sm lg:text-base max-w-3xl leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* 2. Main Content Grid (Two Columns like your old UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
        
        {/* LEFT: Input Card */}
        <div className="lg:col-span-1 relative overflow-hidden bg-white/70 dark:bg-slate-900/45 backdrop-blur-md rounded-2xl p-5 lg:p-6 border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_16px_40px_rgba(2,6,23,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="pointer-events-none absolute -top-16 right-[-30%] h-44 w-44 rounded-full bg-blue-500/10 dark:bg-blue-400/15 blur-3xl" />
          <div className="relative z-10 flex items-center gap-2 mb-5 text-blue-600 dark:text-blue-300 opacity-90 uppercase tracking-[0.16em] text-[11px] font-semibold">
            <LucideInfo size={16} />
            Parameters
          </div>
          
          <div className="relative z-10 space-y-4">
            {config.fields.map((field: any) => (
              <div key={field.id} className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</label>
                {renderField(field)}
              </div>
            ))}
            <button
              onClick={handleCalculate}
              className={`w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_10px_22px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.99] ${showPulse ? "animate-pulse" : ""}`}
            >
              Calculate
            </button>
          </div>
        </div>

      {/* Right Column: Result Display */}
        <div className="lg:col-span-2 w-full flex flex-col">
  <div className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col items-center justify-center shadow-[0_12px_36px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[0_16px_45px_rgba(2,6,23,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
    
    {/* Grid Overlay inside the card for that premium look */}
    <div className="absolute inset-0 opacity-[0.18] dark:opacity-[0.05] pointer-events-none" 
         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(15,23,42,0.22) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
    </div>
    <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-blue-500/10 dark:bg-blue-400/20 blur-3xl" />

    {result && result !== PENDING_RESULT ? (
      <div className="relative z-10 w-full text-center animate-in fade-in zoom-in duration-500">
        <p className="text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-[0.2em] text-[10px] mb-5 opacity-80">
          Result
        </p>
        
        <div className="w-full max-w-full overflow-x-auto">
          <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-white leading-tight tracking-[-0.03em] break-words">
            {result}
          </div>
        </div>
        
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_18px_rgba(37,99,235,0.5)]"></div>
      </div>
    ) : (
      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium opacity-80">
        {PENDING_RESULT}
      </div>
    )}
  </div>
      </div>

      </div>

      {/* Middle: Graphs & Visuals + Formula */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-5 lg:mt-6">
        <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-5 lg:p-6">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Visual Insights</p>
          {renderVisuals()}
        </div>

        <div className="lg:col-span-1 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-5 lg:p-6">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Formula</p>
          <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-950/40 p-4">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
              {getFormula()}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Explanation and FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-5 lg:mt-6">
        <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-5 lg:p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Understanding the Results</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{getExplanation()}</p>
        </div>

        <div className="lg:col-span-1 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-5 lg:p-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">FAQs</h3>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p><span className="font-medium">How often does this update?</span> Results auto-refresh as you type.</p>
            <p><span className="font-medium">Can I still calculate manually?</span> Yes, use the Calculate button anytime.</p>
            <p><span className="font-medium">Why no result yet?</span> Please fill all required fields with valid values.</p>
          </div>
        </div>
      </div>
    </div>
  );
}