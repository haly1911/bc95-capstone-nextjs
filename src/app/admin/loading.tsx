const AdminOverviewLoading = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 bg-muted rounded-md" />
        <div className="h-4 w-80 bg-muted rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card h-28" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 h-96 bg-muted/30 rounded-2xl border border-border" />
        <div className="h-96 bg-muted/30 rounded-2xl border border-border" />
      </div>
    </div>
  );
};

export default AdminOverviewLoading;
