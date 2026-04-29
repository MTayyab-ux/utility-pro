"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center px-6 py-12 transition-colors duration-300">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            Utility<span className="text-blue-600">Pro</span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm font-medium">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm dark:shadow-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Password
                </label>
                <Link href="#" className="text-xs font-bold text-blue-600 dark:text-blue-500 hover:text-blue-500 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm dark:shadow-none"
                />
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border border-slate-300 dark:border-white/10 rounded-md bg-white dark:bg-black/40 checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <span className="material-symbols-outlined absolute text-white text-[16px] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                Remember for 30 days
              </span>
            </label>

            {/* Sign In Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Sign In
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 dark:bg-[#0f172a] px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest rounded-full">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white py-3 rounded-2xl transition-all shadow-sm dark:shadow-none">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="text-[10px] font-black uppercase tracking-tight">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white py-3 rounded-2xl transition-all shadow-sm dark:shadow-none">
                <span className="material-symbols-outlined text-lg">brand_awareness</span>
                <span className="text-[10px] font-black uppercase tracking-tight">Github</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link href="#" className="text-blue-600 dark:text-blue-500 font-bold hover:underline underline-offset-4">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}