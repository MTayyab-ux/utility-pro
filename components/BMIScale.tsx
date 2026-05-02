"use client";

interface BMIScaleProps {
  value?: number;
}

export default function BMIScale({ value }: BMIScaleProps) {
  const hasValue = typeof value === "number" && Number.isFinite(value);
  const boundedValue = hasValue ? Math.min(Math.max(value, 10), 40) : 10;
  const pointerLeft = ((boundedValue - 10) / 30) * 100;

  return (
    <div className="space-y-3">
      <div className="h-3 rounded-full overflow-hidden bg-slate-200/70 dark:bg-white/10 flex">
        <div className="w-[28%] bg-sky-400/80" />
        <div className="w-[24%] bg-emerald-400/80" />
        <div className="w-[24%] bg-amber-400/80" />
        <div className="w-[24%] bg-rose-400/80" />
      </div>
      <div className="relative h-6">
        {hasValue && (
          <div
            className="absolute -top-1.5 -translate-x-1/2 transition-all duration-300"
            style={{ left: `${pointerLeft}%` }}
          >
            <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 text-[11px] text-slate-600 dark:text-slate-300">
        <span>Underweight</span>
        <span>Healthy</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
}
