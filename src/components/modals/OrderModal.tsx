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
    <div onClick={onClose} className="form-modal-bg">
      <div onClick={(e) => e.stopPropagation()} className="form-modal">
        <div className="form-modal-header">
          <div className="flex items-center gap-2">
            <h3 className="form-modal-title">Order Details</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
              #{order.id}
            </span>
          </div>
          <button type="button" onClick={onClose} className="form-modal-cancel-icon">
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-modal-label">Order Status</label>
              <div className="form-modal-input bg-muted font-medium pointer-events-none">
                {order.hoanThanh ? "Completed" : "In progress"}
              </div>
            </div>
            <div>
              <label className="form-modal-label">Placed Date</label>
              <div className="form-modal-input bg-muted font-medium pointer-events-none">
                {formatDate(order.ngayThue)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-modal-label">Buyer</label>
              <div className="form-modal-input bg-muted font-medium pointer-events-none">
                @{order.buyer?.name || "N/A"}{" "}
                <span className="text-xs text-muted-foreground font-normal">(ID: {order.maNguoiThue})</span>
              </div>
            </div>
            <div>
              <label className="form-modal-label">Seller</label>
              <div className="form-modal-input bg-muted font-medium pointer-events-none">
                @{order.congViec?.user?.name || "N/A"}{" "}
                <span className="text-xs text-muted-foreground font-normal">(ID: {order.congViec?.nguoiTao})</span>
              </div>
            </div>
          </div>
          <div>
            <label className="form-modal-label">Gig Title</label>
            <div className="form-modal-input bg-muted font-medium pointer-events-none">
              {order.congViec?.tenCongViec || "N/A"}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-modal-label">Category</label>
              <div className="form-modal-input bg-muted font-medium pointer-events-none">
                {categoryName}
              </div>
            </div>
            <div>
              <label className="form-modal-label">Price ($)</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-bold text-accent pointer-events-none">
                ${order.congViec?.giaTien || 0}
              </div>
            </div>
          </div>
          {order.congViec?.moTaNgan && (
            <div>
              <label className="form-modal-label">Short Description</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground pointer-events-none">
                {order.congViec.moTaNgan}
              </div>
            </div>
          )}
          {order.congViec?.moTa && (
            <div>
              <label className="form-modal-label">Description</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground pointer-events-none whitespace-pre-wrap max-h-32 overflow-y-auto">
                {order.congViec.moTa}
              </div>
            </div>
          )}
          {order.congViec?.hinhAnh && (
            <div>
              <label className="form-modal-label">Gig Image</label>
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
              className="form-modal-cancel-btn"
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
