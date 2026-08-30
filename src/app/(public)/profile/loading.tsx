import Skeleton from "@/components/common/Skeleton";

const ProfileLoading = () => {
  return (
    <main className="wrapper pt-10 pb-20 space-y-8">
      <div className="w-full">
        <div className="bg-card border border-border rounded-2xl p-10 space-y-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-18 w-18 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-baseline justify-between">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-6 py-4 flex justify-between items-center">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="p-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-none">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLoading;