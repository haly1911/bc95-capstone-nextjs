import Link from "next/link";
import UserAvatar from "@/components/common/UserAvatar";

const AdminOverviewPage = () => {
  const recentUsers = [
    { name: "John Doe", email: "john@example.com", role: "ADMIN", avatar: "" },
    { name: "Sarah Smith", email: "sarah@example.com", role: "USER", avatar: "" },
    { name: "Michael Lee", email: "michael@example.com", role: "USER", avatar: "" },
    { name: "Jessica Taylor", email: "jessica@example.com", role: "USER", avatar: "" },
    { name: "David Brown", email: "david@example.com", role: "USER", avatar: "" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Marketplace Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Live health metrics and system summary across Skillora.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Users</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">--</p>
            <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">Database</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Gigs</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">--</p>
            <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Published
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Categories</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">--</p>
            <span className="text-xs text-blue-500 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full">Catalog</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Orders</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">--</p>
            <span className="text-xs text-purple-500 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full">
              Transactions
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">Recent Registered Users</h3>
              <Link href="/admin/users" className="text-xs font-semibold text-accent hover:underline">
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentUsers.map((u, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 flex items-center gap-3">
                        <UserAvatar src={u.avatar} name={u.name} size={32} />
                        <span className="font-medium text-foreground">{u.name}</span>
                      </td>
                      <td className="py-3 text-muted-foreground">{u.email}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${u.role === "ADMIN" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                        >
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="text-sm font-bold">Top Categories Distribution</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {[
                ["Graphics & Design", "31%"],
                ["Programming & Tech", "24%"],
                ["Digital Marketing", "17%"],
                ["AI Services", "12%"],
              ].map(([k, v]) => (
                <li key={k}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">{k}</span>
                    <span className="font-bold">{v}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: v }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-linear-to-br from-primary to-accent p-6 text-primary-foreground shadow-lg shadow-accent/10">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">System Notice</h3>
            <p className="mt-2 text-xl font-extrabold">Skillora Core V1.0</p>
            <p className="mt-1 text-xs opacity-90 leading-relaxed">
              Platform status is operating normally. All security measures are active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
