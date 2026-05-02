"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (!mounted) return null;

  const toolsLinks = [
    { label: "BMI Calculator", href: "/tool/bmi-calculator" },
    { label: "Loan Calculator", href: "/tool/loan-calculator" },
    { label: "Age Calculator", href: "/tool/age-calculator" },
    { label: "Color Converter", href: "/tool/color-converter" },
    { label: "AI Chat", href: "/ai-chat" },
    { label: "AI Math Solver", href: "/ai-math-solver" },
  ];

  const languages = ["EN", "ES", "DE", "FR"];

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      pathname === path ? "text-[#A855F7]" : "text-slate-700 dark:text-slate-300 hover:text-[#A855F7]"
    }`;

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl mx-4 bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center p-4 gap-3 border-b border-slate-100 dark:border-white/5">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                autoFocus
                placeholder="Search for any tool..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs font-semibold text-slate-400 hover:text-red-500 uppercase">
                Esc
              </button>
            </div>
            <div className="p-4 text-xs text-slate-400">Try searching for "BMI Calculator" or "AI Math Solver"</div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-xl border-l border-black/10 dark:border-white/10 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
              <Link href="/" className="text-2xl font-bold text-[#111827] dark:text-[#E5E7EB] tracking-tight">
                UtilityPro
              </Link>
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>
            </div>

            <div className="px-6 py-8 h-[calc(100%-81px)] overflow-y-auto flex flex-col">
              <div className="space-y-4">
                <Link href="/" className="min-h-[44px] rounded-xl px-3 flex items-center text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/10">
                  Home
                </Link>
                <Link href="/#categories" className="min-h-[44px] rounded-xl px-3 flex items-center text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/10">
                  Categories
                </Link>
                <div className="rounded-xl bg-black/5 dark:bg-white/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Tools</p>
                  <div className="space-y-2">
                    {toolsLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="min-h-[40px] rounded-lg px-2.5 flex items-center text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/pricing-page" className="min-h-[44px] rounded-xl px-3 flex items-center text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/10">
                  Pricing
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="w-full min-h-[44px] rounded-xl px-4 bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-100 hover:bg-black/10 dark:hover:bg-white/15 transition-colors text-sm font-medium"
                >
                  Toggle theme
                </button>
                <button className="w-full min-h-[44px] rounded-xl bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-100 text-sm font-medium">
                  Language: EN
                </button>
                <Link href="/sign-in" className="block w-full">
                  <button className="w-full min-h-[44px] rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-white font-semibold transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 w-full z-50 border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#0F0F1A]/90 backdrop-blur">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto" ref={dropdownRef}>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-[#111827] dark:text-[#E5E7EB] tracking-tight">
              UtilityPro
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link className={navLinkClass("/")} href="/">Home</Link>
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "tools" ? null : "tools")}
                  className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                    activeDropdown === "tools" ? "text-[#A855F7]" : "text-slate-700 dark:text-slate-300 hover:text-[#A855F7]"
                  }`}
                >
                  Tools <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "tools" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "tools" && (
                  <div className="absolute top-11 left-0 w-64 bg-white dark:bg-[#1A1A2E] border border-black/5 dark:border-white/10 rounded-xl shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150">
                    {toolsLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/#categories" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#A855F7] transition-colors">
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/pricing-page" className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#A855F7] transition-colors">
              Pricing
            </Link>

            <div className="relative hidden md:block">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "lang" ? null : "lang")}
                className="min-h-[36px] px-3 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-black/5 dark:bg-white/10 flex items-center gap-1"
              >
                EN <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === "lang" && (
                <div className="absolute top-10 right-0 w-32 bg-white dark:bg-[#1A1A2E] border border-black/5 dark:border-white/10 rounded-xl shadow-xl p-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className="w-full text-left rounded-md px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <Link href="/sign-in" className="hidden md:block">
              <button className="min-h-[38px] px-4 rounded-lg bg-[#A855F7] hover:bg-[#9333EA] text-white text-sm font-semibold transition-colors">
                Sign In
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
