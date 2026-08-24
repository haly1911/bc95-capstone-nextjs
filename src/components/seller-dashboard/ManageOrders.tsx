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
        <div className="p-6 pb-4">
          <h3 className="font-semibold leading-none tracking-tight">Manage Orders</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Gig Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {orders && orders.length > 0 ? (
                  orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <span className="font-mono text-xs text-muted-foreground">#{o.id}</span>
                      </td>
                      <td className="p-4 align-middle font-medium">{o.congViec ? o.congViec.tenCongViec : "N/A"}</td>
                      <td className="p-4 align-middle text-muted-foreground">{formatDate(o.ngayThue)}</td>
                      <td className="p-4 align-middle font-semibold">${o.congViec ? o.congViec.giaTien : 0}</td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            o.hoanThanh ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {o.hoanThanh ? "Completed" : "In progress"}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-center">
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
