"use client";

import { GigFormData, gigSchema } from "@/lib/schemas";
import { gigService } from "@/services/gig.service";
import { ApiCategory, ApiSubcategory } from "@/types/category";
import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormError from "./FormError";
import Image from "next/image";

interface GigModalProps {
  isOpen: boolean;
  onClose: () => void;
  gig?: ApiGigWithUser | null;
  mode?: "view" | "edit" | "create";
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
  userId: number;
  onSuccess: () => void;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const GigModal = ({
  isOpen,
  onClose,
  gig: initialData,
  mode = "create",
  categories,
  subcategories,
  userId,
  onSuccess,
}: GigModalProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.hinhAnh || "");
  const [imageError, setImageError] = useState<string>("");
  const isEditMode = mode === "edit" || (!!initialData && mode !== "view");
  const isViewMode = mode === "view";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GigFormData>({
    resolver: zodResolver(gigSchema),
    defaultValues: {
      tenCongViec: "",
      giaTien: 0,
      maChiTietLoaiCongViec: 1,
      moTaNgan: "",
      moTa: "",
      hinhAnh: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          tenCongViec: initialData.tenCongViec,
          giaTien: initialData.giaTien,
          maChiTietLoaiCongViec: initialData.maChiTietLoaiCongViec,
          moTaNgan: initialData.moTaNgan,
          moTa: initialData.moTa,
          hinhAnh: initialData.hinhAnh,
        });
        setImagePreview(initialData.hinhAnh || "");
        setSelectedFile(null);
        setImageError("");
        const foundGroup = subcategories.find((group) =>
          group.dsChiTietLoai?.some((sub: any) => sub.id === initialData.maChiTietLoaiCongViec),
        );
        if (foundGroup) {
          setSelectedCategoryId(foundGroup.maLoaiCongviec);
        }
      } else {
        reset({
          tenCongViec: "",
          giaTien: 0,
          maChiTietLoaiCongViec: 1,
          moTaNgan: "",
          moTa: "",
          hinhAnh: "",
        });
        setSelectedCategoryId(null);
        setImagePreview("");
        setSelectedFile(null);
        setImageError("");
      }
    }
  }, [isOpen, initialData, reset, subcategories]);

  if (!isOpen) return null;

  const filteredGroups = selectedCategoryId
    ? subcategories.filter((group) => group.maLoaiCongviec === selectedCategoryId)
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return;
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file (PNG, JPG, JPEG)...");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setImageError(`Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }
    setImageError("");
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: GigFormData) => {
    if (isViewMode) return;
    setLoading(true);
    let gigId: number | null = null;
    try {
      if (isEditMode && initialData) {
        const payload: ApiGig = { ...initialData, ...data };
        await gigService.updateGig(initialData.id, payload);
        gigId = initialData.id;
        toast.success("Gig updated successfully!");
      } else {
        const payload = { ...data, danhGia: 0, nguoiTao: userId, saoCongViec: 5 };
        const res = await gigService.createGig(payload);
        gigId = res?.content?.id;
        toast.success("Gig created successfully!");
      }
      if (selectedFile && gigId) {
        await gigService.uploadGigImage(gigId, selectedFile);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to save gig:", error);
      toast.error(error?.response?.data?.message || "Failed to save gig. Please try again!");
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
        className="w-full max-w-xl rounded-2xl bg-card border border-border p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-lg font-bold text-foreground">
            {isViewMode ? "Gig Details" : isEditMode ? "Edit Gig" : "Create New Gig"}
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
          {isViewMode && initialData?.user && (
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Seller</label>
              <div className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-medium pointer-events-none">
                @{initialData.user.name}{" "}
                <span className="text-xs text-muted-foreground font-normal">(ID: {initialData.nguoiTao})</span>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Gig title</label>
            <input
              type="text"
              disabled={isViewMode}
              {...register("tenCongViec")}
              placeholder="e.g. I will build a professional website using React"
              className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
            />
            <FormError message={errors.tenCongViec?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Category</label>
              <select
                disabled={isViewMode}
                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                value={selectedCategoryId || ""}
                className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent cursor-pointer ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.tenLoaiCongViec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase text-muted-foreground">Subcategory</label>
              <select
                {...register("maChiTietLoaiCongViec", { valueAsNumber: true })}
                disabled={!selectedCategoryId || isViewMode}
                className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent ${!selectedCategoryId ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
              >
                <option value={0} disabled>
                  {selectedCategoryId ? "Select subcategory" : "Choose category first"}
                </option>
                {filteredGroups.map((group) =>
                  group.dsChiTietLoai?.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.tenChiTiet || sub.tenChiTietLoai}
                    </option>
                  )),
                )}
              </select>
              <FormError message={errors.maChiTietLoaiCongViec?.message} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Price ($)</label>
            <input
              type="number"
              disabled={isViewMode}
              placeholder="50"
              {...register("giaTien", { valueAsNumber: true })}
              className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
            />
            <FormError message={errors.giaTien?.message} />
          </div>
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Short Description</label>
            <input
              type="text"
              disabled={isViewMode}
              {...register("moTaNgan")}
              placeholder="Briefly describe what you will do..."
              className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
            />
            <FormError message={errors.moTaNgan?.message} />
          </div>
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
            <textarea
              rows={4}
              disabled={isViewMode}
              {...register("moTa")}
              placeholder="Detailed description of your service..."
              className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-accent ${isViewMode ? "pointer-events-none bg-muted" : ""}`}
            />
            <FormError message={errors.moTa?.message} />
          </div>
          <div>
            <label className="text-xs font-medium uppercase text-muted-foreground">Gig Image (Max 1MB)</label>
            {!isViewMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:opacity-90 cursor-pointer"
              />
            )}
            <FormError message={imageError} />
            {imagePreview && (
              <div className="mt-3 relative w-full h-80 rounded-lg border border-border overflow-hidden bg-muted/50 flex items-center justify-center">
                <Image
                  src={imagePreview}
                  alt="Gig Preview"
                  width={425}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted cursor-pointer"
            >
              {isViewMode ? "Close" : "Cancel"}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Saving..." : isEditMode ? "Update Gig" : "Create Gig"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GigModal;
