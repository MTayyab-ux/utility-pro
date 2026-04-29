"use client";
import Link from 'next/link';

export default function ToolsDirectory() {
  // 1. Added 'href' property to each tool based on your project structure
  const tools = [
    { 
      title: "BMI Calculator", 
      desc: "Calculate Body Mass Index based on weight and height metrics.", 
      icon: "monitor_weight", 
      cat: "Health", 
      href: "/bmi-calculator", // Dynamic route
      color: "text-blue-600 dark:text-secondary", 
      bg: "bg-blue-50 dark:bg-secondary-container/20", 
      border: "border-blue-100 dark:border-secondary/20" 
    },
    { 
      title: "Loan Calculator", 
      desc: "Estimate monthly payments, total interest, and amortization schedules.", 
      icon: "account_balance", 
      cat: "Finance", 
      href: "/loan-calculator",
      color: "text-emerald-600 dark:text-primary-fixed", 
      bg: "bg-emerald-50 dark:bg-primary-container/20", 
      border: "border-emerald-100 dark:border-primary/20" 
    },
    { 
      title: "Color Converter", 
      desc: "Instantly convert between HEX, RGB, HSL, and CMYK color spaces.", 
      icon: "palette", 
      cat: "Dev", 
      href: "/color-converter",
      color: "text-purple-600 dark:text-tertiary", 
      bg: "bg-purple-50 dark:bg-tertiary-container/20", 
      border: "border-purple-100 dark:border-tertiary/20" 
    },
    { 
      title: "Age Calculator", 
      desc: "Determine exact age in years, months, days, or even seconds.", 
      icon: "cake", 
      cat: "Health", 
      href: "/age-calculator",
      color: "text-blue-600 dark:text-secondary", 
      bg: "bg-blue-50 dark:bg-secondary-container/20", 
      border: "border-blue-100 dark:border-secondary/20" 
    },
    { 
      title: "Unit Converter", 
      desc: "Coming soon: Convert length, mass, and more.", 
      icon: "swap_horiz", 
      cat: "Units", 
      href: "#", // Placeholder for now
      color: "text-slate-600", 
      bg: "bg-slate-100", 
      border: "border-slate-200" 
    },
    { 
      title: "Percentage Calc", 
      desc: "Coming soon: Quick ratio calculations.", 
      icon: "percent", 
      cat: "Math", 
      href: "#",
      color: "text-slate-600", 
      bg: "bg-slate-100", 
      border: "border-slate-200" 
    },
  ];

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-[#e1e2ec] min-h-screen font-sans antialiased transition-colors duration-300">
      <main className="pt-[104px] pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto w-full flex flex-col gap-10 relative">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-400/5 dark:bg-[#adc6ff]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <section className="flex flex-col gap-6 items-center text-center mt-10 mb-4">
          <h1 className="text-5xl font-bold tracking-tight">Tools Directory</h1>
          <p className="text-lg text-slate-600 dark:text-[#c2c6d6] max-w-2xl">Find the perfect precision instrument for your next task.</p>
        </section>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            // 2. Wrapped the entire card in a Link component for better UX
            <Link 
              key={idx} 
              href={tool.href}
              className="bg-white dark:bg-[#1d2027]/40 shadow-sm hover:shadow-xl dark:shadow-none backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-blue-400 dark:hover:border-[#adc6ff]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#32353c] border border-slate-200 dark:border-[#424754]/20 flex items-center justify-center text-blue-600 dark:text-[#adc6ff] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{tool.icon}</span>
                </div>
                <span className={`${tool.bg} ${tool.color} border ${tool.border} px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold`}>
                  {tool.cat}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-[#e1e2ec] mb-1 group-hover:text-blue-600 dark:group-hover:text-[#adc6ff] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-[#c2c6d6] line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-[#adc6ff] gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Launch Tool <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}