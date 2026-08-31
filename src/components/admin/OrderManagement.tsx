"use client";

import { usePagination } from "@/hooks/usePagination";
import { orderService } from "@/services/order.service";
import { ApiCategory, ApiSubcategory } from "@/types/category";
import { ApiOrderWithDetails } from "@/types/order";
import { formatDate, parseDateToTimestamp } from "@/utils/date";
import { getCategoryBySubcategory } from "@/utils/getCategoryBySubcategory";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import SearchInput from "../common/SearchInput";
import { FaEye, FaTrash } from "react-icons/fa6";
import Pagination from "../common/Pagination";
import ConfirmModal from "../modals/ConfirmModal";
import OrderModal from "../modals/OrderModal";

interface OrderManagementProps {
  orders: ApiOrderWithDetails[];
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
}

const OrderManagement = ({ orders, categories, subcategories }: OrderManagementProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("none");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ApiOrderWithDetails | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.congViec?.tenCongViec.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesCategory = true;
      if (categoryFilter !== "all") {
        const categoryId = getCategoryBySubcategory.getCategoryIdBySubId(
          Number(order.congViec?.maChiTietLoaiCongViec),
          subcategories,
        );
        matchesCategory = categoryId === Number(categoryFilter);
      }
      let matchesStatus = true;
      if (statusFilter === "completed") {
        matchesStatus = order.hoanThanh === true;
      } else if (statusFilter === "inprogress") {
        matchesStatus = order.hoanThanh === false;
      }
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [orders, searchTerm, categoryFilter, statusFilter, subcategories]);

  const sortedOrders = useMemo(() => {
    let list = [...filteredOrders];
    if (sortBy === "price-low") {
      list.sort((a, b) => (a.congViec?.giaTien || 0) - (b.congViec?.giaTien || 0));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => (b.congViec?.giaTien || 0) - (a.congViec?.giaTien || 0));
    } else if (sortBy === "latest") {
      list.sort((a, b) => parseDateToTimestamp(b.ngayThue) - parseDateToTimestamp(a.ngayThue));
    }
    return list;
  }, [filteredOrders, sortBy]);

  const {
    currentPage,
    currentData: currentOrders,
    totalPages,
    handlePageChange,
    resetPage,
  } = usePagination({ data: sortedOrders, itemsPerPage: 10 });

  const confirmDeleteOrder = (e: React.MouseEvent, orderId: number) => {
    e.stopPropagation();
    setSelectedOrderId(orderId);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (order: ApiOrderWithDetails) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) return;
    try {
      await orderService.deleteOrder(selectedOrderId);
      toast.success("Order deleted successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to delete order:", error);
      toast.error(error?.response?.data?.message || "Failed to delete order. Please try again!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Review, monitor, and moderate marketplace orders.</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchInput
            placeholder="Search orders by gig title..."
            onSearch={(keyword) => {
              setSearchTerm(keyword);
              resetPage();
            }}
            className="w-full"
          />
          <div className="w-full grid grid-cols-3 gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                resetPage();
              }}
              className="filter-btn"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.tenLoaiCongViec}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                resetPage();
              }}
              className="filter-btn"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In progress</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                resetPage();
              }}
              className="filter-btn"
            >
              <option value="none">Sort: None</option>
              <option value="latest">Latest ⏳</option>
              <option value="price-low">Price: Low to High 💲</option>
              <option value="price-high">Price: High to Low 💲</option>
            </select>
          </div>
        </div>
      </div>
      {sortedOrders.length === 0 ? (
        <div className="admin-empty-state">No orders found matching your criteria.</div>
      ) : (
        <>
          <div className="hidden lg:block rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
            <div className="p-4">
              <div className="relative w-full overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="table-th w-[8%]">Order</th>
                      <th className="table-th w-[20%]">Gig Title</th>
                      <th className="table-th w-[10%]">Buyer</th>
                      <th className="table-th w-[10%]">Seller</th>
                      <th className="table-th w-[13%]">Date</th>
                      <th className="table-th w-[10%]">Price</th>
                      <th className="table-th w-[16%]">Status</th>
                      <th className="table-th text-center w-[13%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {currentOrders.map((o) => {
                      const categoryName = getCategoryBySubcategory.getCategoryNameBySubId(
                        Number(o.congViec?.maChiTietLoaiCongViec),
                        subcategories,
                        categories,
                      );
                      return (
                        <tr key={o.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="table-td">
                            <span className="font-mono text-xs text-muted-foreground">#{o.id}</span>
                          </td>
                          <td className="table-td">
                            <span className="line-clamp-2">{o.congViec?.tenCongViec}</span>
                          </td>
                          <td className="table-td">@{o.buyer?.name || "N/A"}</td>
                          <td className="table-td">@{o.congViec?.user?.name}</td>
                          <td className="table-td">{formatDate(o.ngayThue)}</td>
                          <td className="table-td">${o.congViec?.giaTien}</td>
                          <td className="table-td font-bold text-accent">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                o.hoanThanh ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                              }`}
                            >
                              {o.hoanThanh ? "Completed" : "In progress"}
                            </span>
                          </td>
                          <td className="table-td text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenViewModal(o)}
                                className="admin-edit-icon"
                                title="View Order Details"
                              >
                                <FaEye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => confirmDeleteOrder(e, o.id)}
                                className="admin-trash-icon"
                                title="Delete Order"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {currentOrders.map((o) => {
              const categoryName = getCategoryBySubcategory.getCategoryNameBySubId(
                Number(o.congViec?.maChiTietLoaiCongViec),
                subcategories,
                categories,
              );
              return (
                <div
                  key={o.id}
                  onClick={() => handleOpenViewModal(o)}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">#{o.id}</span>
                      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                        {categoryName}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground line-clamp-2" title={o.congViec?.tenCongViec}>
                      {o.congViec?.tenCongViec}
                    </h3>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>
                        Buyer: <span className="text-foreground font-medium">@{o.buyer?.name || "N/A"}</span>
                      </p>
                      <p>
                        Seller: <span className="text-foreground font-medium">@{o.congViec?.user?.name}</span>
                      </p>
                      <p>
                        Date: <span className="text-foreground">{formatDate(o.ngayThue)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-bold text-accent text-base">${o.congViec?.giaTien}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-md ${
                          o.hoanThanh ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {o.hoanThanh ? "Completed" : "In progress"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => confirmDeleteOrder(e, o.id)}
                        className="rounded-lg bg-destructive/10 text-destructive p-2 hover:bg-destructive/20 transition-colors cursor-pointer"
                        title="Delete Order"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
      <OrderModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        categories={categories}
        subcategories={subcategories}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteOrder}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default OrderManagement;
