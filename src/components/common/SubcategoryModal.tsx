"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import Image from "next/image";
import { categoryService } from "@/services/category.service";
import { ApiSubcategoryItem, ApiSubcategory } from "@/types/category";
import FormError from "./FormError";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { SubcategoryFormData, subcategorySchema } from "@/lib/schemas";

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number | null;
  group?: ApiSubcategory | null;
  mode?: "create" | "edit";
  onSuccess?: () => void;
}

const SubcategoryModal = ({
  isOpen,
  onClose,
  categoryId,
  group,
  mode = "create",
  onSuccess,
}: SubcategoryModalProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [subcategoryItems, setSubcategoryItems] = useState<ApiSubcategoryItem[]>([]);

  const isEditMode = mode === "edit" || !!group;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubcategoryFormData>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      tenNhom: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (group && isEditMode) {
        reset({ tenNhom: group.tenNhom || "" });
        setPreviewImage(group.hinhAnh || "");
        setSubcategoryItems(
          group.dsChiTietLoai?.map((item) => ({
            id: item.id,
            tenChiTiet: item.tenChiTiet,
          })) || [],
        );
      } else {
        reset({ tenNhom: "" });
        setPreviewImage("");
        setSubcategoryItems([]);
      }
      setSelectedFile(null);
    }
  }, [isOpen, group, isEditMode, reset]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: SubcategoryFormData) => {
    const targetCategoryId = categoryId || group?.maLoaiCongviec;
    if (!targetCategoryId) return;
    setLoading(true);
    try {
      let savedGroupId = group?.id;
      if (isEditMode && group) {
        const payload = {
          id: group.id,
          tenChiTiet: data.tenNhom,
          maLoaiCongViec: targetCategoryId,
          danhSachChiTiet: subcategoryItems.map((item) => item.id || 0),
        };
        await categoryService.updateSubcategory(group.id, payload as any);
        toast.success("Subcategory updated successfully!");
      } else {
        const payload = {
          id: 0,
          tenChiTiet: data.tenNhom,
          maLoaiCongViec: targetCategoryId,
          danhSachChiTiet: [],
        };

        const res = await categoryService.createSubcategory(payload as any);
        savedGroupId = res.content?.id;
        toast.success("Subcategory created successfully!");
      }
      if (selectedFile && savedGroupId) {
        await categoryService.uploadSubcategoryImage(savedGroupId, selectedFile);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to save subcategory group:", error);
      const errorMessage = error?.response?.data?.message || "Failed to save group. Please try again!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-lg font-bold text-foreground">
            {isEditMode ? "Edit Subcategory" : "Add New Subcategory"}
          </h3>
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
            <label className="text-xs font-medium uppercase text-muted-foreground">Group Name</label>
            <input
              type="text"
              {...register("tenNhom")}
              placeholder="e.g. Logo & Brand Identity"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent"
            />
            <FormError message={errors.tenNhom?.message} />
          </div>

          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Group Image</label>
            <div className="mt-1 flex items-center gap-4">
              {previewImage && (
                <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={96}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-accent/20 cursor-pointer"
              />
            </div>
          </div>
          {isEditMode && subcategoryItems.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Subcategory Items ({subcategoryItems.length})
              </label>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {subcategoryItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted/20 border border-border/50 px-3 py-1.5 rounded-lg text-sm text-muted-foreground"
                  >
                    <span>{item.tenChiTiet}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              {loading ? "Saving..." : isEditMode ? "Update Group" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubcategoryModal;
