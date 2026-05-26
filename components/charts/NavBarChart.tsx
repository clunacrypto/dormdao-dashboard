"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useRouter } from "next/navigation";
import { SchoolRow } from "@/lib/types";
import { formatUSD, slugify } from "@/lib/utils";

export function NavBarChart({ schools }: { schools: SchoolRow[] }) {
  const router = useRouter();
  const sorted = [...schools].sort((a, b) => a.rank - b.rank);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={sorted} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          angle={-40}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickFormatter={(v) => formatUSD(v, true)}
        />
        <Tooltip
          formatter={(v) => [formatUSD(Number(v)), "NAV"]}
          contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
          labelStyle={{ color: "#f3f4f6" }}
        />
        <Bar
          dataKey="nav"
          radius={[4, 4, 0, 0]}
          fill="#34d399"
          cursor="pointer"
          activeBar={{ fillOpacity: 0.7 }}
          onClick={(data: any) => router.push(`/schools/${slugify(data.name)}`)}
        >
          <LabelList
            dataKey="nav"
            position="top"
            formatter={(v: unknown) => formatUSD(Number(v), true)}
            style={{ fill: "#6ee7b7", fontSize: 9 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
