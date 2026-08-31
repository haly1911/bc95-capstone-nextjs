"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaChevronDown, FaChevronRight, FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import { ApiCategory, ApiSubcategory } from "@/types/category";
import SearchInput from "@/components/common/SearchInput";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { categoryService } from "@/services/category.service";
import CategoryModal from "../modals/CategoryModal";
import SubcategoryModal from "../modals/SubcategoryModal";

interface CategoryManagementProps {
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
}

const CategoryManagement = ({ categories, subcategories }: CategoryManagementProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subModalMode, setSubModalMode] = useState<"create" | "edit">("create");
  const [selectedCategoryIdForSub, setSelectedCategoryIdForSub] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ApiSubcategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "category" | "subcategory"; id: number } | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCategories = categories.filter((cat) =>
    cat.tenLoaiCongViec.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenCreateModal = () => {
    setSelectedCategory(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: ApiCategory) => {
    setSelectedCategory(category);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleOpenAddSubcategory = (categoryId: number) => {
    setSelectedCategoryIdForSub(categoryId);
    setSelectedSubcategory(null);
    setSubModalMode("create");
    setIsSubModalOpen(true);
  };

  const handleOpenEditSubcategory = (categoryId: number, group: ApiSubcategory) => {
    setSelectedCategoryIdForSub(categoryId);
    setSelectedSubcategory(group);
    setSubModalMode("edit");
    setIsSubModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "category") {
        await categoryService.deleteCategory(deleteTarget.id);
      } else if (deleteTarget.type === "subcategory") {
        await categoryService.deleteSubcategory(deleteTarget.id);
      }
      toast.success("Deleted successfully!");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete. Please try again!");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Category Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage marketplace categories, groups, and sub-details.</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Search categories..."
            onSearch={(keyword) => setSearchTerm(keyword)}
            className="w-full"
          />
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer"
          >
            + Add Category
          </button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground border border-border rounded-xl bg-card">
          No categories found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const isExpanded = expandedIds[category.id] ?? false;
            return (
              <div
                key={category.id}
                className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all"
              >
                <div className="p-4 sm:p-5 flex items-center justify-between bg-card/50 hover:bg-muted/30 transition-colors">
                  <div
                    className="flex items-center gap-3 cursor-pointer select-none flex-1"
                    onClick={() => toggleExpand(category.id)}
                  >
                    <button className="text-muted-foreground hover:text-foreground">
                      {isExpanded ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
                    </button>
                    <span className="font-bold text-sm sm:text-base text-foreground">{category.tenLoaiCongViec}</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {category.dsNhomChiTietLoai?.length || 0} groups
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleOpenAddSubcategory(category.id)}
                      className="p-0.5 sm:p-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                      title="Add Subcategory"
                    >
                      <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(category)}
                      className="p-0.5 sm:p-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                      title="Edit Category"
                    >
                      <FaPencil className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget({ type: "category", id: category.id });
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-0.5 sm:p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-border p-4 sm:p-6 bg-muted/10 space-y-4">
                    {category.dsNhomChiTietLoai && category.dsNhomChiTietLoai.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {category.dsNhomChiTietLoai.map((group: ApiSubcategory) => (
                          <div
                            key={group.id}
                            className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              {group.hinhAnh && (
                                <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0 border border-border bg-muted">
                                  <Image
                                    src={group.hinhAnh}
                                    alt={group.tenNhom}
                                    width={64}
                                    height={48}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-foreground truncate" title={group.tenNhom}>
                                  {group.tenNhom}
                                </h4>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                  {group.dsChiTietLoai?.map((item) => (
                                    <span
                                      key={item.id}
                                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
                                    >
                                      {item.tenChiTiet}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border flex items-center justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenEditSubcategory(category.id, group)}
                                className="text-xs text-accent hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <FaPencil className="w-3 h-3" /> Edit
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteTarget({ type: "subcategory", id: group.id });
                                  setIsDeleteModalOpen(true);
                                }}
                                className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <FaTrash className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No detail groups found in this category.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        mode={modalMode}
        onSuccess={() => router.refresh()}
      />

      <SubcategoryModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        categoryId={selectedCategoryIdForSub}
        group={selectedSubcategory}
        mode={subModalMode}
        onSuccess={() => router.refresh()}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CategoryManagement;
