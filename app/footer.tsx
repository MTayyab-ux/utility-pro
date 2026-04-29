import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 w-full border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold text-slate-800 dark:text-white">UtilityPro</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">Engineered for efficiency.</p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Legal</span>
            <Link className="text-xs text-slate-500 hover:text-[#0058be] dark:hover:text-blue-400" href="/privacy">Privacy</Link>
            <Link className="text-xs text-slate-500 hover:text-[#0058be] dark:hover:text-blue-400" href="/terms">Terms</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Social</span>
            <a className="text-xs text-slate-500 hover:text-[#0058be] dark:hover:text-blue-400" href="https://github.com">Github</a>
            <a className="text-xs text-slate-500 hover:text-[#0058be] dark:hover:text-blue-400" href="#">Twitter</a>
          </div>
        </div>

        <span className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} UtilityPro. All rights reserved.
        </span>
      </div>
    </footer>
  );
}