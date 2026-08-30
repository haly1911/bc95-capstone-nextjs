import Skeleton from "@/components/common/Skeleton";

const CategoryDetailLoading = () => {
  return (
    <main className="wrapper pt-10">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-9 w-44 rounded-full" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-1 pt-1">
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-end">
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryDetailLoading;
