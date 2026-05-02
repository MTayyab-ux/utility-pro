"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const popularSearches = ["BMI Calculator", "Loan Calculator", "Age Calculator", "Color Converter"];

const popularCalculators = [
  { icon: "monitor_weight", title: "BMI Calculator", desc: "Check your body mass index instantly.", href: "/tool/bmi-calculator" },
  { icon: "payments", title: "Loan Calculator", desc: "Estimate monthly payment and interest.", href: "/tool/loan-calculator" },
  { icon: "cake", title: "Age Calculator", desc: "Find accurate age in seconds.", href: "/tool/age-calculator" },
  { icon: "palette", title: "Color Converter", desc: "Convert HEX, RGB and more formats.", href: "/tool/color-converter" },
  { icon: "auto_awesome", title: "AI Math Solver", desc: "Solve complex equations quickly.", href: "/ai-math-solver" },
  { icon: "chat", title: "AI Chat", desc: "Get quick smart assistance.", href: "/ai-chat" },
  { icon: "calculate", title: "Scientific Tools", desc: "Everyday advanced formulas.", href: "/tools-page-nav" },
  { icon: "query_stats", title: "Statistics Tools", desc: "Analyze and calculate data points.", href: "/tools-page-nav" },
];

const categories = [
  { title: "Finance", desc: "Loans, ROI, tax and planning", icon: "payments" },
  { title: "Health", desc: "BMI, BMR and wellness tools", icon: "monitor_heart" },
  { title: "Math", desc: "Algebra, percentage and equations", icon: "calculate" },
  { title: "Date & Time", desc: "Age, duration and date utilities", icon: "calendar_month" },
  { title: "Others", desc: "Conversion and productivity tools", icon: "widgets" },
];

const features = [
  { icon: "bolt", title: "Fast", desc: "Instant results. No waiting." },
  { icon: "verified", title: "Accurate", desc: "Trusted formulas, every time." },
  { icon: "lock", title: "Privacy", desc: "No signup. No personal data." },
  { icon: "phone_iphone", title: "Mobile Friendly", desc: "Built for every screen." },
];

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

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
  }, [placeholder, isDeleting, currentWordIndex, speed, words]);

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
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
        case "sin":
          result = Math.sin((val * Math.PI) / 180);
          break;
        case "cos":
          result = Math.cos((val * Math.PI) / 180);
          break;
        case "tan":
          result = Math.tan((val * Math.PI) / 180);
          break;
        case "log":
          result = Math.log10(val);
          break;
        case "sqrt":
          result = Math.sqrt(val);
          break;
        case "sq":
          result = Math.pow(val, 2);
          break;
        case "pi":
          result = Math.PI;
          break;
        default:
          return;
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
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F0F1A] text-[#111827] dark:text-[#E5E7EB] transition-colors">
      <main className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16 md:space-y-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_70%)]" />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-6 relative">
            <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] px-4 py-1.5 text-xs font-semibold tracking-wide">
              100% Free • No Signup • Instant Results
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#111827] dark:text-[#F3F4F6]">
              Fast &amp; Simple Online{" "}
              <span className="bg-gradient-to-r from-[#A855F7] to-[#9333EA] bg-clip-text text-transparent">Calculators</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              Powerful tools for finance, health, math, and daily calculations in one place.
            </p>

            <div className="relative max-w-xl">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full h-12 sm:h-14 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] pl-11 pr-4 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/60 transition-all duration-200"
                placeholder={`Search for ${placeholder || "Calculator"}...`}
                type="text"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  className="min-h-[36px] px-3 rounded-full text-xs font-medium border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] hover:border-[#A855F7]/50 hover:text-[#A855F7] transition-all duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:ml-auto">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-5 shadow-sm transition-all duration-200">
              <div className="mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-4 text-right font-mono">{expression || " "}</p>
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-[#F9FAFB] dark:bg-[#0F0F1A] p-4 text-right font-mono text-3xl tracking-tight">
                  {display}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-2">
                {["sin", "cos", "tan", "sqrt"].map((func) => (
                  <button key={func} onClick={() => handleScientific(func)} className="min-h-[42px] rounded-lg text-xs font-semibold border border-black/10 dark:border-white/10 bg-[#F9FAFB] dark:bg-[#0F0F1A] hover:border-[#A855F7]/50 transition-all duration-200">
                    {func}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 mb-2">
                {["log", "sq", "pi", "AC"].map((func) => (
                  <button
                    key={func}
                    onClick={func === "AC" ? clear : () => handleScientific(func)}
                    className={`min-h-[42px] rounded-lg text-xs font-semibold border transition-colors ${
                      func === "AC"
                        ? "border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300"
                        : "border-black/10 dark:border-white/10 bg-[#F9FAFB] dark:bg-[#0F0F1A] hover:border-[#A855F7]/50"
                    }`}
                  >
                    {func}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[7, 8, 9].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="÷" onClick={() => handleOperator("/")} isAccent />
                {[4, 5, 6].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="×" onClick={() => handleOperator("*")} isAccent />
                {[1, 2, 3].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="-" onClick={() => handleOperator("-")} isAccent />
                <button onClick={() => handleNumber("0")} className="col-span-2 min-h-[46px] rounded-lg text-sm font-semibold border border-black/10 dark:border-white/10 bg-[#F9FAFB] dark:bg-[#0F0F1A] hover:border-[#A855F7]/50 transition-colors">0</button>
                <button onClick={calculate} className="col-span-2 min-h-[46px] rounded-lg text-sm font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] transition-colors">
                  =
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Popular Calculators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {popularCalculators.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-5 shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-[#A855F7]/10 text-[#A855F7] p-2.5 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
                </div>
                <h3 className="text-base font-semibold mb-1">{tool.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="categories" className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {categories.map((category) => (
              <div key={category.title} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                <div className="w-12 h-12 rounded-lg bg-[#A855F7]/10 text-[#A855F7] p-2.5 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">{category.icon}</span>
                </div>
                <p className="text-sm font-semibold">{category.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5">{category.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-5 shadow-sm transition-all duration-200">
                <div className="w-12 h-12 rounded-lg bg-[#A855F7]/10 text-[#A855F7] p-2.5 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">{feature.icon}</span>
                </div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CalcButton({ label, onClick, isAccent = false }: { label: string; onClick: () => void; isAccent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[46px] rounded-lg text-sm font-semibold border transition-colors ${
        isAccent
          ? "border-[#A855F7]/40 text-[#A855F7] bg-[#A855F7]/10 hover:bg-[#A855F7]/20 transition-all duration-200"
          : "border-black/10 dark:border-white/10 bg-[#F9FAFB] dark:bg-[#0F0F1A] hover:border-[#A855F7]/50 transition-all duration-200"
      }`}
    >
      {label}
    </button>
  );
}
