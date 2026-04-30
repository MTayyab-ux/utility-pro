"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const linkStyle = (path: string) => {
    const isActive = pathname === path;
    return `text-sm font-medium transition-all relative py-2 ${
      isActive ? "text-blue-600" : "text-slate-600 dark:text-slate-400 hover:text-blue-600"
    }`;
  };

  const toolCategories = [
    { title: "AI Tools", icon: "auto_awesome", links: ["AI Math Solver", "Word Solver", "AI Chat"] },
    { title: "Math", icon: "calculate", links: ["GPA Calc", "Fraction", "Percentage"] },
    { title: "Health", icon: "monitor_heart", links: ["BMI Calc", "BMR Calc", "Water Intake"] },
    { title: "Finance", icon: "payments", links: ["Loan Calc", "Tax Calc", "Interest"] }
  ];

  const categoryList = [
    { name: "AI Tools", icon: "auto_awesome" },
    { name: "Health", icon: "monitor_heart" },
    { name: "Math", icon: "calculate" },
    { name: "Everyday Life", icon: "info" },
    { name: "Finance", icon: "payments" },
    { name: "Physics", icon: "science" },
    { name: "Chemistry", icon: "biotech" },
    { name: "Statistics", icon: "query_stats" }
  ];

  const languages = ["EN", "ES", "DE", "FR", "JA", "KO", "ZH", "AR", "CS", "EL", "VI", "ID"];

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl mx-4 bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center p-4 gap-3 border-b border-slate-100 dark:border-white/5">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input 
                autoFocus
                placeholder="Search for any tool..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase">Esc</button>
            </div>
            <div className="p-4 text-xs text-slate-400">Try searching for "BMI Calculator" or "AI Math Solver"</div>
          </div>
        </div>
      )}

      <nav className="bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto" ref={dropdownRef}>
          
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">
              UtilityPro
            </Link>
            
            <div className="hidden lg:flex gap-8 items-center">
              <Link className={linkStyle("/")} href="/">Home</Link>
              <Link className={linkStyle("/ai-chat")} href="/ai-chat">AI Chat</Link>
              
              <div className="relative group">
                <Link className={linkStyle("/ai-math-solver")} href="/ai-math-solver">
                  AI Math Solver
                  <span className="absolute -top-1 -right-7 bg-red-500 text-[7px] text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse shadow-lg shadow-red-500/40">
                    NEW
                  </span>
                </Link>
              </div>

              {/* Tools Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                  className={`text-sm font-medium flex items-center gap-1 transition-colors ${activeDropdown === 'tools' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Tools <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {activeDropdown === 'tools' && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 animate-in zoom-in-95 fade-in duration-200">
                    {toolCategories.map((cat, i) => (
                      <div key={i} className="space-y-3">
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-blue-500">{cat.icon}</span>
                          {cat.title}
                        </p>
                        <ul className="space-y-2">
                          {cat.links.map((l, j) => (
                            <li key={j} className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">{l}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
                  className={`text-sm font-medium flex items-center gap-1 transition-colors ${activeDropdown === 'cat' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Category <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${activeDropdown === 'cat' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {activeDropdown === 'cat' && (
                  <div className="absolute top-12 left-0 w-64 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl py-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    {categoryList.map((item, idx) => (
                      <button key={idx} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors group">
                        <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-500">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Pricing Link */}
            <Link 
              href="/pricing-page" 
              className={`${linkStyle("/pricing-page")} hidden sm:block px-2`}
            >
              Pricing
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
                className="flex items-center gap-1 text-[13px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-all"
              >
                EN <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              {activeDropdown === 'lang' && (
                <div className="absolute top-10 right-0 w-48 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl p-2 grid grid-cols-3 gap-1 animate-in fade-in duration-150">
                  {languages.map((l) => (
                    <button key={l} className="text-[11px] font-bold py-2 hover:bg-blue-500 hover:text-white rounded-md transition-colors">{l}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </button>

            {/* Sign In - Updated for Navigation */}
            <Link href="/sign-in">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}