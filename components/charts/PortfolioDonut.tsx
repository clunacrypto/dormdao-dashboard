"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Holding } from "@/lib/types";

const COLORS = [
  "#34d399", "#60a5fa", "#f59e0b", "#a78bfa", "#fb7185",
  "#34d399aa", "#60a5faaa", "#f59e0baa", "#a78bfaaa", "#fb7185aa",
];

interface Props {
  holdings: Holding[];
}

export function PortfolioDonut({ holdings }: Props) {
  const withPct = holdings.filter((h) => h.pctOfPortfolio > 0);
  if (withPct.length === 0) return null;

  const THRESHOLD = 4;
  const main = withPct.filter((h) => h.pctOfPortfolio >= THRESHOLD);
  const other = withPct.filter((h) => h.pctOfPortfolio < THRESHOLD);
  const otherTotal = other.reduce((s, h) => s + h.pctOfPortfolio, 0);

  const data = [
    ...main.map((h) => ({ name: h.ticker, value: parseFloat(h.pctOfPortfolio.toFixed(1)) })),
    ...(otherTotal > 0 ? [{ name: "Other", value: parseFloat(otherTotal.toFixed(1)) }] : []),
  ].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: unknown) => [`${v}%`, "Portfolio"]}
          contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
          labelStyle={{ color: "#f3f4f6" }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ color: "#9ca3af", fontSize: 11 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
