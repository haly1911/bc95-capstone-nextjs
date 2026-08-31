"use client";

import { ApiOrderHistory } from "@/types/order";
import { formatDate } from "@/utils/date";

interface OrderHistoryProps {
  orders: ApiOrderHistory[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.hoanThanh).length;
  const totalSpent = orders.reduce((sum, o) => sum + o.congViec?.giaTien || 0, 0);

  const stats = [
    { label: "Total Orders", value: totalOrders.toString(), trend: "All time" },
    {
      label: "Completed",
      value: completedOrders.toString(),
      trend: `${totalOrders ? Math.round((completedOrders / totalOrders) * 100) : 0}% rate`,
    },
    { label: "Total Spent", value: `$${totalSpent}`, trend: "USD" },
    { label: "Active Orders", value: (totalOrders - completedOrders).toString(), trend: "In progress" },
  ];

  return (
    <div className="wrapper space-y-6 pb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              {stat.trend && <span className="text-xs text-muted-foreground">{stat.trend}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4 flex justify-between items-center">
          <h3 className="font-semibold text-foreground">Order history</h3>
          <span className="text-xs text-muted-foreground">({orders.length} orders)</span>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">You haven't placed any orders yet</div>
          ) : (
            <>
              <div className="hidden lg:block relative w-full overflow-x-hidden">
                <table className="w-full text-left border-collapse text-sm table-fixed">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="px-6 py-3 font-medium w-[15%]">Order ID</th>
                      <th className="px-6 py-3 font-medium w-[45%]">Gig Details</th>
                      <th className="px-6 py-3 font-medium w-[15%]">Date</th>
                      <th className="px-6 py-3 font-medium w-[15%]">Status</th>
                      <th className="px-6 py-3 font-medium w-[10%] text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-muted-foreground">#{o.id}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground truncate">{o.congViec?.tenCongViec}</td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{formatDate(o.ngayThue)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                              o.hoanThanh
                                ? "bg-accent/10 text-accent border-accent/20"
                                : "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {o.hoanThanh ? "Completed" : "In Progress"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-semibold text-foreground">${o.congViec?.giaTien ?? 0}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:hidden">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-lg border bg-background p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono">#{o.id}</span>
                      <span>{formatDate(o.ngayThue)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-base line-clamp-2">{o.congViec?.tenCongViec || "N/A"}</h4>
                    </div>
                    <div className="pt-4 border-t flex items-center justify-between">
                      <span className="font-semibold text-primary shrink-0">${o.congViec?.giaTien ?? 0}</span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          o.hoanThanh
                            ? "bg-accent/10 text-accent border-accent/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {o.hoanThanh ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
