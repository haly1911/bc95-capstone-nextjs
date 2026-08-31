"use client";

import { orderService } from "@/services/order.service";
import { ApiOrderWithDetails } from "@/types/order";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface ManageOrdersProps {
  orders: ApiOrderWithDetails[];
}

const ManageOrders = ({ orders }: ManageOrdersProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.hoanThanh).length;
  const activeOrders = totalOrders - completedOrders;
  const totalEarned = orders
    .filter((o) => o.hoanThanh && o.congViec)
    .reduce((sum, o) => sum + (o.congViec?.giaTien || 0), 0);

  const stats = [
    { label: "Total Earned", value: `$${totalEarned}`, trend: "USD" },
    { label: "Active orders", value: activeOrders.toString(), trend: "In progress" },
    {
      label: "Completed",
      value: completedOrders.toString(),
      trend: `${totalOrders ? Math.round((completedOrders / totalOrders) * 100) : 0}% rate`,
    },
    { label: "Total Orders", value: totalOrders.toString(), trend: "All time" },
  ];

  const handleCompleteOrder = async (id: number) => {
    try {
      setLoading(id);
      await orderService.completeOrder(id);
      toast.success("Order marked as completed successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Error completing order:", error);
      toast.error(error?.response?.data?.message || "Failed to complete the order. Please try again");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="wrapper py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-10">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              <span className="text-xs font-semibold text-muted-foreground">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="px-6 pt-6">
          <h3 className="font-semibold leading-none tracking-tight">Manage Orders</h3>
        </div>
        <div className="p-6">
          {orders && orders.length > 0 ? (
            <>
              <div className="hidden lg:block relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="table-th">Order</th>
                      <th className="table-th">Gig Title</th>
                      <th className="table-th">Date</th>
                      <th className="table-th">Price</th>
                      <th className="table-th">Status</th>
                      <th className="table-th text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="table-td">
                          <span className="font-mono text-xs text-muted-foreground">#{o.id}</span>
                        </td>
                        <td className="table-td font-medium">{o.congViec ? o.congViec.tenCongViec : "N/A"}</td>
                        <td className="table-td text-muted-foreground">{formatDate(o.ngayThue)}</td>
                        <td className="table-td font-semibold">${o.congViec ? o.congViec.giaTien : 0}</td>
                        <td className="table-td">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              o.hoanThanh ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                            }`}
                          >
                            {o.hoanThanh ? "Completed" : "In progress"}
                          </span>
                        </td>
                        <td className="table-td text-center">
                          {!o.hoanThanh ? (
                            <button
                              type="button"
                              onClick={() => handleCompleteOrder(o.id)}
                              disabled={loading === o.id}
                              className={`inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50 transition-colors ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                              {loading === o.id ? "Processing..." : "Mark Complete"}
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-lg border bg-background p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono">#{o.id}</span>
                      <span>{formatDate(o.ngayThue)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-base line-clamp-2">
                        {o.congViec ? o.congViec.tenCongViec : "N/A"}
                      </h4>
                      <span className="font-semibold text-accent shrink-0">
                        ${o.congViec ? o.congViec.giaTien : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          o.hoanThanh ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {o.hoanThanh ? "Completed" : "In progress"}
                      </span>
                      <div>
                        {!o.hoanThanh ? (
                          <button
                            type="button"
                            onClick={() => handleCompleteOrder(o.id)}
                            disabled={loading === o.id}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                          >
                            {loading === o.id ? "Processing..." : "Mark Complete"}
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Done</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
