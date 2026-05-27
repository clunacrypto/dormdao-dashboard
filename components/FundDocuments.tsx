"use client";
import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";

interface TokenDocument {
  id: string;
  token_ticker: string;
  title: string;
  school: string | null;
  document_date: string | null;
  file_url: string;
  document_type: string;
  created_at: string;
}

function formatDocDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function TypeBadge({ type }: { type: string }) {
  if (type === "pitch_deck") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/40">
        Pitch Deck
      </span>
    );
  }
  if (type === "report") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/30">
        Fund Report
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
      Document
    </span>
  );
}

export function FundDocuments({ ticker }: { ticker: string }) {
  const [docs, setDocs] = useState<TokenDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/documents?ticker=${encodeURIComponent(ticker)}`)
      .then((r) => r.json())
      .then((d) => setDocs(d.documents ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ticker]);

  if (loading || docs.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">Fund Documents</h2>
      </div>
      <ul className="divide-y divide-gray-800/60">
        {docs.map((doc) => (
          <li key={doc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-800/30 transition-colors">
            {/* Icon */}
            <div className="shrink-0 w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
              <FileText className="w-4 h-4 text-gray-400" />
            </div>

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{doc.title}</div>
              <div className="flex items-center flex-wrap gap-2 mt-1">
                <TypeBadge type={doc.document_type} />
                {doc.school && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700/60 text-gray-300">
                    {doc.school}
                  </span>
                )}
                {doc.document_date && (
                  <span className="text-xs text-gray-500">{formatDocDate(doc.document_date)}</span>
                )}
              </div>
            </div>

            {/* View button */}
            <a
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              <Download className="w-3 h-3" />
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
