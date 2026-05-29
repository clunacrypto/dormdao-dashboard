"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResearchClient } from "@/components/ResearchClient";
import { AllSchoolDocuments } from "@/components/AllSchoolDocuments";

const TABS = [
  { key: "community", label: "Community Research" },
  { key: "documents", label: "School Documents" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ResearchTabs({ initialTickers }: { initialTickers: string[] }) {
  const [tab, setTab] = useState<TabKey>("community");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Research</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-0 border-b border-gray-800">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors",
              tab === t.key
                ? "border-primary text-white font-medium"
                : "border-transparent text-gray-500 hover:text-gray-300 font-normal"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "community" && <ResearchClient initialTickers={initialTickers} hideHeader />}
      {tab === "documents" && <AllSchoolDocuments />}
    </div>
  );
}
