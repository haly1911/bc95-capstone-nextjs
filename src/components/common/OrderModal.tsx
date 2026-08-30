"use client";

import { ApiCategory, ApiSubcategory } from "@/types/category";
import { ApiOrderWithDetails } from "@/types/order";
import { formatDate } from "@/utils/date";
import { getCategoryBySubcategory } from "@/utils/getCategoryBySubcategory";
import Image from "next/image";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: ApiOrderWithDetails | null;
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
}

const OrderModal = ({ isOpen, onClose, order, categories, subcategories }: OrderModalProps) => {
  if (!isOpen || !order) return null;

  const categoryName = getCategoryBySubcategory.getCategoryNameBySubId(
    Number(order.congViec?.maChiTietLoaiCongViec),
    subcategories,
    categories,
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-card border border-border p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">Order Details</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
              #{order.id}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Order Status</label>
              <div className="mmt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                {order.hoanThanh ? "Completed" : "In progress"}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Placed Date</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                {formatDate(order.ngayThue)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Buyer</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                @{order.buyer?.name || "N/A"}{" "}
                <span className="text-xs text-muted-foreground font-normal">(ID: {order.maNguoiThue})</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Seller</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                @{order.congViec?.user?.name || "N/A"}{" "}
                <span className="text-xs text-muted-foreground font-normal">(ID: {order.congViec?.nguoiTao})</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Gig Title</label>
            <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
              {order.congViec?.tenCongViec || "N/A"}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Category</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                {categoryName}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Price ($)</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-bold text-accent pointer-events-none">
                ${order.congViec?.giaTien || 0}
              </div>
            </div>
          </div>
          {order.congViec?.moTaNgan && (
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Short Description</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground pointer-events-none">
                {order.congViec.moTaNgan}
              </div>
            </div>
          )}
          {order.congViec?.moTa && (
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground pointer-events-none whitespace-pre-wrap max-h-32 overflow-y-auto">
                {order.congViec.moTa}
              </div>
            </div>
          )}
          {order.congViec?.hinhAnh && (
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Gig Image</label>
              <div className="mt-3 relative w-full h-60 rounded-lg border border-border overflow-hidden bg-muted/50 flex items-center justify-center">
                <Image
                  src={order.congViec.hinhAnh}
                  alt={order.congViec.tenCongViec || "Gig Image"}
                  width={425}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
