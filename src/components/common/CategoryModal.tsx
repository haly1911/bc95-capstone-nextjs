"use client";

import { categoryService } from "@/services/category.service";
import { ApiCategory } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormError from "./FormError";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-lg font-bold text-foreground">{isEditMode ? "Edit Category" : "Create New Category"}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Category Name</label>
            <input
              type="text"
              {...register("tenLoaiCongViec")}
              placeholder="e.g. Graphics & Design"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent"
            />
            <FormError message={errors.tenLoaiCongViec?.message} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer"
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
