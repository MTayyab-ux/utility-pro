"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const popularCalculators = [
  { icon: "monitor_weight", title: "BMI Calculator", desc: "Check your body mass index instantly.", href: "/tool/bmi-calculator", bento: true, tag: "Health" },
  { icon: "payments", title: "Loan Calculator", desc: "Estimate monthly payment and interest.", href: "/tool/loan-calculator", bento: true, tag: "Finance" },
  { icon: "cake", title: "Age Calculator", desc: "Find your exact age in seconds.", href: "/tool/age-calculator", tag: "Date & Time" },
  { icon: "palette", title: "Color Converter", desc: "Convert HEX, RGB and more formats.", href: "/tool/color-converter", tag: "Others" },
  { icon: "auto_awesome", title: "AI Math Solver", desc: "Solve complex equations instantly.", href: "/ai-math-solver", tag: "Math" },
  { icon: "chat", title: "AI Chat", desc: "Get quick smart assistance.", href: "/ai-chat", tag: "AI" },
  { icon: "calculate", title: "Scientific Tools", desc: "Everyday advanced formulas.", href: "/tools-page-nav", tag: "Math" },
  { icon: "query_stats", title: "Statistics Tools", desc: "Analyze and calculate data points.", href: "/tools-page-nav", tag: "Math" },
];

const categories = [
  { title: "Finance", desc: "Loans, ROI, tax and planning", icon: "payments", href: "/category/finance", count: "12 Tools", color: "text-emerald-500", bg: "bg-emerald-500/10", hover: "hover:border-emerald-500/40 hover:bg-emerald-500/5" },
  { title: "Health", desc: "BMI, BMR and wellness tools", icon: "monitor_heart", href: "/category/health", count: "9 Tools", color: "text-rose-500", bg: "bg-rose-500/10", hover: "hover:border-rose-500/40 hover:bg-rose-500/5" },
  { title: "Math", desc: "Algebra, percentage and equations", icon: "calculate", href: "/category/math", count: "18 Tools", color: "text-blue-500", bg: "bg-blue-500/10", hover: "hover:border-blue-500/40 hover:bg-blue-500/5" },
  { title: "Date & Time", desc: "Age, duration and date utilities", icon: "calendar_month", href: "/category/date-time", count: "7 Tools", color: "text-amber-500", bg: "bg-amber-500/10", hover: "hover:border-amber-500/40 hover:bg-amber-500/5" },
  { title: "Others", desc: "Conversion and productivity tools", icon: "widgets", href: "/category/others", count: "14 Tools", color: "text-purple-500", bg: "bg-purple-500/10", hover: "hover:border-purple-500/40 hover:bg-purple-500/5" },
];

const features = [
  { icon: "bolt", title: "Ultra Fast", desc: "Instant calculations without lag.", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: "verified", title: "100% Accurate", desc: "Verified mathematical algorithms.", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: "lock", title: "Private", desc: "Your data never leaves your device.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: "devices", title: "Responsive", desc: "Perfect experience on any screen.", color: "text-purple-500", bg: "bg-purple-500/10" },
];

const recentActivities = [
  { name: "BMI Calculator", time: "2 mins ago", icon: "monitor_weight" },
  { name: "Loan Estimator", time: "15 mins ago", icon: "payments" },
  { name: "Scientific Calc", time: "1 hour ago", icon: "calculate" },
];

const recentlyAdded = [
  { icon: "percent", title: "Percentage Calculator", desc: "Calculate percentage increase, decrease and difference.", href: "/tool/percentage-calculator", badge: "New", color: "text-pink-500", bg: "bg-pink-500/10" },
  { icon: "restaurant", title: "Tip Calculator", desc: "Split bills and calculate tips for any group size.", href: "/tool/tip-calculator", badge: "New", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: "bedtime", title: "Sleep Calculator", desc: "Find your ideal bedtime based on sleep cycles.", href: "/tool/sleep-calculator", badge: "New", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { icon: "trending_up", title: "Compound Interest", desc: "Project investment growth over any time period.", href: "/tool/compound-interest", badge: "New", color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

const stats = [
  { value: "200+", label: "Free Tools", icon: "build" },
  { value: "4M+", label: "Calculations Done", icon: "calculate" },
  { value: "98%", label: "Accuracy Rate", icon: "verified" },
  { value: "0", label: "Signups Needed", icon: "lock_open" },
];

const faqs = [
  {
    q: "How accurate are these calculators?",
    a: "All our tools use industry-standard formulas verified by domain experts. Health tools like BMI should be supplemented with professional medical advice.",
  },
  {
    q: "Is my data saved or tracked?",
    a: "No. All calculations run locally in your browser. We never transmit, store, or sell your personal data.",
  },
  {
    q: "Are these tools completely free?",
    a: "Yes — every tool on UtilityPro is 100% free, forever. No hidden charges, no premium tiers, no signup walls.",
  },
  {
    q: "Can I use these on my mobile phone?",
    a: "Absolutely. Every tool is fully responsive and optimized for touch screens, tablets, and desktops alike.",
  },
];

const typingWords = ["BMI Calculator", "Age Calculator", "Loan Estimator", "Color Converter", "AI Math Solver"];

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── CALC BUTTON ───────────────────────────────────────────────────────────

function CalcButton({ label, onClick, isAccent = false }: { label: string; onClick: () => void; isAccent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`h-14 rounded-2xl text-lg font-bold border transition-all active:scale-90 ${
        isAccent
          ? "border-purple-500/20 text-purple-500 bg-purple-500/5 hover:bg-purple-500 hover:text-white"
          : "border-transparent bg-slate-500/5 hover:bg-purple-500/10"
      }`}
    >
      {label}
    </button>
  );
}

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer
        ${open
          ? "border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10"
          : "border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E]"
        }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 font-bold text-sm">
        <span>{q}</span>
        <span
          className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Typing animation
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const fullWord = typingWords[wordIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(fullWord.substring(0, placeholder.length + 1));
        setSpeed(150);
        if (placeholder === fullWord) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setPlaceholder(fullWord.substring(0, placeholder.length - 1));
        setSpeed(50);
        if (placeholder === "") {
          setIsDeleting(false);
          setWordIndex((p) => (p + 1) % typingWords.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, wordIndex, speed]);

  // Calculator logic
  const handleNumber = (num: string) =>
    setDisplay((p) => (p === "0" ? num : p + num));

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
      let result = 0;
      switch (func) {
        case "sin": result = Math.sin((val * Math.PI) / 180); break;
        case "cos": result = Math.cos((val * Math.PI) / 180); break;
        case "tan": result = Math.tan((val * Math.PI) / 180); break;
        case "log": result = Math.log10(val); break;
        case "sqrt": result = Math.sqrt(val); break;
        case "sq": result = Math.pow(val, 2); break;
        case "pi": result = Math.PI; break;
        default: return;
      }
      setDisplay(result.toFixed(6).replace(/\.?0+$/, ""));
    } catch { setDisplay("Error"); }
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(expression + display);
      setDisplay(String(result));
      setExpression("");
    } catch { setDisplay("Error"); }
  };

  const clear = () => { setDisplay("0"); setExpression(""); };

  // Search filter
  const allTools = [...popularCalculators, ...recentlyAdded];
  const filtered = searchValue.trim()
    ? allTools.filter(
        (t) =>
          t.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          t.desc.toLowerCase().includes(searchValue.toLowerCase()) ||
          (t.tag ?? "").toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F0F1A] text-[#111827] dark:text-[#E5E7EB] transition-colors">
      <main className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20 md:space-y-28">

        {/* BG GRADIENT */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.13),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.16),transparent_70%)]" />

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
          <div className="space-y-8">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A2E] px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                200+ Tools — All Free
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
                Smart Tools for <br />
                <span className="bg-gradient-to-r from-[#A855F7] to-[#9333EA] bg-clip-text text-transparent italic">
                  Every Calculation
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                A minimalist suite of 200+ professional calculators. No ads, no signups — just pure, instant utility.
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-15 group-focus-within:opacity-30 transition duration-500" />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                search
              </span>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="relative w-full h-14 sm:h-16 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] pl-12 pr-4 text-sm sm:text-base outline-none shadow-xl focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder={`Search ${placeholder}...`}
                type="text"
              />
              {/* Live search results dropdown */}
              {filtered.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1A1A2E] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {filtered.slice(0, 5).map((t) => (
                    <Link
                      key={t.title}
                      href={t.href}
                      onClick={() => setSearchValue("")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-purple-500 text-[18px]">{t.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t.title}</p>
                        <p className="text-[11px] text-slate-400">{t.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {searchValue && filtered.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1A1A2E] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl z-50 px-4 py-6 text-center">
                  <span className="material-symbols-outlined text-slate-400 text-3xl mb-2 block">search_off</span>
                  <p className="text-sm text-slate-500">No tools found for &quot;{searchValue}&quot;</p>
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span>
                Recent Global Activity
              </p>
              <div className="flex flex-wrap gap-3">
                {recentActivities.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-white dark:bg-[#1A1A2E] border border-black/5 dark:border-white/5 px-3 py-2 rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default"
                  >
                    <span className="material-symbols-outlined text-purple-500 text-lg">{act.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold leading-tight">{act.name}</span>
                      <span className="text-[9px] text-slate-400 uppercase">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALCULATOR */}
          <div className="w-full max-w-md mx-auto lg:ml-auto relative">
            <div className="absolute -inset-4 bg-purple-500/5 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-xl p-6 shadow-2xl">
              <div className="mb-6">
                <p className="text-xs text-slate-400 min-h-5 text-right font-mono mb-1">
                  {expression || "READY"}
                </p>
                <div className="rounded-2xl bg-slate-100/50 dark:bg-[#0F0F1A] p-5 text-right font-mono text-4xl font-light tracking-tighter overflow-hidden border border-black/5 dark:border-white/5">
                  {display}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {["sin", "cos", "tan", "sqrt", "log", "sq", "pi", "AC"].map((f) => (
                  <button
                    key={f}
                    onClick={f === "AC" ? clear : () => handleScientific(f)}
                    className={`h-11 rounded-xl text-xs font-bold transition-all ${
                      f === "AC"
                        ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                        : "bg-slate-500/5 hover:bg-purple-500/10"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
                {[7, 8, 9].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="÷" onClick={() => handleOperator("/")} isAccent />
                {[4, 5, 6].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="×" onClick={() => handleOperator("*")} isAccent />
                {[1, 2, 3].map((n) => <CalcButton key={n} label={`${n}`} onClick={() => handleNumber(`${n}`)} />)}
                <CalcButton label="−" onClick={() => handleOperator("-")} isAccent />
                <button onClick={() => handleNumber("0")} className="col-span-2 h-14 rounded-2xl text-lg font-bold bg-slate-500/5 hover:bg-purple-500/10 transition-all">0</button>
                <button onClick={calculate} className="col-span-2 h-14 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#9333EA] shadow-lg shadow-purple-500/20 hover:scale-[0.98] active:scale-95 transition-all">=</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden flex flex-col items-center justify-center text-center rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] p-6 shadow-sm group hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
              <span className="material-symbols-outlined text-purple-400 text-2xl mb-2">{s.icon}</span>
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#A855F7] to-[#9333EA] bg-clip-text text-transparent leading-none mb-1">
                {s.value === "4M+" ? <><AnimatedCounter target={4} suffix="M+" /></> :
                 s.value === "200+" ? <><AnimatedCounter target={200} suffix="+" /></> :
                 s.value === "98%" ? <><AnimatedCounter target={98} suffix="%" /></> :
                 s.value}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
        <section className="py-10 border-y border-black/5 dark:border-white/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-3 px-2">
                <div className={`w-11 h-11 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[22px]">{f.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">{f.title}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED TOOL OF THE DAY ─────────────────────────────────── */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-500/15 dark:via-purple-500/5 dark:to-transparent p-8 sm:p-10">
            {/* BG decoration */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 left-20 w-40 h-40 rounded-full bg-pink-500/8 blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-400 text-3xl">monitor_weight</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    ⭐ Tool of the Day
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Used 1,248 times today
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">BMI Calculator</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  Instantly check if you&apos;re in a healthy weight range using the World Health Organization standard formula.
                </p>
              </div>
              <Link
                href="/tool/bmi-calculator"
                className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-purple-500/25 hover:scale-[0.98] active:scale-95 transition-all text-sm"
              >
                Try Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── POPULAR TOOLS GRID ──────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-l-4 border-purple-500 pl-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Top Tools</h2>
              <p className="text-sm text-slate-500 mt-1">Most used by our community</p>
            </div>
            <Link href="/tools" className="flex items-center gap-1 text-xs font-bold text-purple-500 hover:underline">
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCalculators.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-purple-500/20 ${
                  tool.bento ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">{tool.icon}</span>
                </div>
                {/* Tag badge */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full mb-4">
                  {tool.tag}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">{tool.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-1.5 leading-none">{tool.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tool.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Tool
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── RECENTLY ADDED ──────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-l-4 border-emerald-500 pl-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Recently Added</h2>
              <p className="text-sm text-slate-500 mt-1">Fresh tools just launched</p>
            </div>
            <Link href="/tools" className="flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline">
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyAdded.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/20"
              >
                {/* NEW badge */}
                <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {tool.badge}
                </span>
                <div className={`w-12 h-12 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center mb-5 transition-all group-hover:scale-110`}>
                  <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
                </div>
                <h3 className="text-base font-bold mb-1.5 leading-snug">{tool.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tool.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Try Now
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ──────────────────────────────────────────────── */}
        <section id="categories" className="space-y-8">
          <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Browse Categories</h2>
              <p className="text-sm text-slate-500 mt-1">Find tools by topic</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group flex flex-col items-center justify-center aspect-square rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] ${cat.hover} hover:scale-[1.04] transition-all text-center p-4`}
              >
                <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                </div>
                <span className="text-sm font-bold">{cat.title}</span>
                <span className={`text-[11px] font-semibold mt-1 ${cat.color}`}>{cat.count}</span>
                <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER STRIP ─────────────────────────────────────────── */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1A1A2E] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            <div className="relative flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                🔔 Get Notified of New Tools
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We add new calculators every week. No spam, unsubscribe anytime.
              </p>
            </div>
            <div className="relative flex w-full sm:w-auto gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-12 rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-[#0F0F1A] px-4 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 transition-all w-full sm:w-56"
              />
              <button className="h-12 px-6 rounded-2xl bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[0.98] active:scale-95 transition-all whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto w-full space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Common Questions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need to know about UtilityPro</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}