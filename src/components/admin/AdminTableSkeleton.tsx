const AdminTableSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-md" />
          <div className="h-4 w-72 bg-muted rounded-md" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-full sm:w-80 bg-muted rounded-full" />
          <div className="h-10 w-32 bg-muted rounded-full shrink-0" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
        <div className="h-10 w-full bg-muted rounded-lg" /> {/* Table Header */}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 w-full bg-muted/60 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTableSkeleton;
