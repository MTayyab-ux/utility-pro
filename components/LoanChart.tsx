"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { LoanVisualData } from "../src/lib/calculations";

interface LoanChartProps {
  data?: LoanVisualData;
}

export default function LoanChart({ data }: LoanChartProps) {
  if (!data) {
    return (
      <div className="text-sm text-slate-600 dark:text-slate-300">
        Enter valid loan values to view the repayment split.
      </div>
    );
  }

  const chartData = [
    { name: "Principal", value: data.principal, fill: "#3B82F6" },
    { name: "Interest", value: data.totalInterest, fill: "#F59E0B" },
  ];

  return (
    <div className="space-y-4">
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={52}
              outerRadius={84}
              paddingAngle={2}
              stroke="transparent"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => {
                const resolvedValue = Array.isArray(value) ? value[0] : value;
                const numericValue = Number(resolvedValue);
                return Number.isFinite(numericValue) ? numericValue.toFixed(2) : "0.00";
              }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background: "rgba(15, 23, 42, 0.9)",
                color: "#e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-950/30 p-3">
          <p className="text-slate-500 dark:text-slate-400">Monthly</p>
          <p className="font-semibold text-slate-900 dark:text-white">{data.monthlyPayment.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-950/30 p-3">
          <p className="text-slate-500 dark:text-slate-400">Total Payment</p>
          <p className="font-semibold text-slate-900 dark:text-white">{data.totalPayment.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
