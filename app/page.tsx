import { Suspense } from "react";
import { DashboardClient } from "@/components/DashboardClient";
import { getSchoolsData } from "@/lib/cache";
import { Skeleton } from "@/components/ui/Card";

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <Skeleton className="h-3 w-24 mb-3" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <Skeleton className="h-3 w-40 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}

async function Dashboard() {
  const { schools, sinceInceptionSchools, fetchedAt } = await getSchoolsData();
  return <DashboardClient schools={schools} sinceInceptionSchools={sinceInceptionSchools} fetchedAt={fetchedAt} />;
}

export default function HomePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">DormDAO Portfolio Dashboard</h1>
        <p className="text-gray-400 mt-1">Real-time crypto portfolio tracking for 17 university investment DAOs</p>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
