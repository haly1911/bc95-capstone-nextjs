import Skeleton from "@/components/common/Skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:pt-28">
        <div className="wrapper space-y-6">
          <Skeleton className="h-6 w-44 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full max-w-xl" />
            <Skeleton className="h-12 w-3/4 max-w-lg" />
          </div>
          <Skeleton className="h-16 w-full max-w-2xl rounded-2xl" />
          <div className="flex gap-2 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full wrapper py-20">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <Skeleton className="h-8 w-8 rounded-md mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
      <section className="w-full wrapper pb-16">
        <div className="mb-8 flex items-end justify-between">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="border-t border-border/60 pt-3 flex justify-end">
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
