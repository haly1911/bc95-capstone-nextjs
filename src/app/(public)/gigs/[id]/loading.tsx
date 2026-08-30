import Skeleton from "@/components/common/Skeleton";

const GigDetailLoading = () => {
  return (
    <main>
      <div className="wrapper py-10">
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-full max-w-xl" />
              <Skeleton className="h-8 w-3/4 max-w-md" />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Skeleton className="aspect-video w-full rounded-none" />
            </div>
          </div>
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-36 pb-3 border-b border-border/60" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="pt-4 space-y-3">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </aside>
        </div>
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-40 rounded-full" />
          </div>
          <Skeleton className="h-20 w-full rounded-2xl" />
          <div className="space-y-4 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GigDetailLoading;
