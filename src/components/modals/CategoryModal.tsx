"use client";

import { categoryService } from "@/services/category.service";
import { ApiCategory } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormError from "../common/FormError";
import { CategoryFormData, categorySchema } from "@/lib/schemas";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: ApiCategory | null;
  mode?: "edit" | "create";
  onSuccess?: () => void;
}

const CategoryModal = ({ isOpen, onClose, category, mode = "create", onSuccess }: CategoryModalProps) => {
  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit" || !!category;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      tenLoaiCongViec: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (category) {
        reset({
          tenLoaiCongViec: category.tenLoaiCongViec || "",
        });
      } else {
        reset({
          tenLoaiCongViec: "",
        });
      }
    }
  }, [isOpen, category, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      if (isEditMode && category) {
        await categoryService.updateCategory(category.id, data);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.createCategory(data);
        toast.success("Category created successfully!");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to save category:", error);
      const errorMessage = error?.response?.data?.message || "Failed to save category. Please try again!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => onClose()}
      className="form-modal-bg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="form-modal-header">
          <h3 className="form-modal-title">{isEditMode ? "Edit Category" : "Create New Category"}</h3>
          <button
            type="button"
            onClick={onClose}
            className="form-modal-cancel-icon"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="form-modal-label">Category Name</label>
            <input
              type="text"
              {...register("tenLoaiCongViec")}
              placeholder="e.g. Graphics & Design"
              className="form-modal-input"
            />
            <FormError message={errors.tenLoaiCongViec?.message} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="form-modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="form-modal-save-btn"
            >
              {loading ? "Saving..." : isEditMode ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
