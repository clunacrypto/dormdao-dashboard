"use client";

export function SyncFooter({ fetchedAt }: { fetchedAt: string }) {
  const syncedAgo = Math.round((Date.now() - new Date(fetchedAt).getTime()) / 60000);

  return (
    <div className="text-center text-xs text-gray-600 mt-8 pb-2">
      Last synced: {syncedAgo < 1 ? "just now" : `${syncedAgo} min ago`}
      {" · "}
      <button
        onClick={async () => {
          await fetch("/api/revalidate", { method: "POST" });
          window.location.reload();
        }}
        className="text-primary hover:underline"
      >
        Refresh
      </button>
    </div>
  );
}
