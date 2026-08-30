import Skeleton from "@/components/common/Skeleton";

const BecomeASellerLoading = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden py-20 border-b border-border/60 bg-card/40">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton className="h-7 w-52 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full max-w-lg" />
              <Skeleton className="h-12 w-3/4 max-w-md" />
            </div>
            <Skeleton className="h-16 w-full max-w-md" />
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
          <div className="hidden lg:block">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </section>
      <section className="py-20 wrapper max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8 space-y-4">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-card/50 border-y border-border/60">
        <div className="wrapper max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-8 w-56 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border border-border bg-background">
                <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeASellerLoading;
