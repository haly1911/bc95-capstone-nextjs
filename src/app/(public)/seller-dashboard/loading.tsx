import Skeleton from "@/components/common/Skeleton";

const SellerDashboardLoading = () => {
  return (
    <main className="wrapper pt-10 pb-20 space-y-12">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
        <div className="space-y-4 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-none"
            >
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-3">
              <Skeleton className="h-4 w-28" />
              <div className="flex items-baseline justify-between">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-6">
          <Skeleton className="h-6 w-36" />
          <div className="space-y-4 pt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-none"
              >
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerDashboardLoading;
