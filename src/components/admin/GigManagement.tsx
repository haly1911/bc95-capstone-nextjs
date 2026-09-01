"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { gigService } from "@/services/gig.service";
import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { ApiCategory, ApiSubcategory } from "@/types/category";
import GigModal from "@/components/modals/GigModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import SearchInput from "@/components/common/SearchInput";
import { FaEye, FaStar, FaTrash } from "react-icons/fa6";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "../common/Pagination";
import UserAvatar from "../common/UserAvatar";
import { getCategoryBySubcategory } from "@/utils/getCategoryBySubcategory";

interface GigManagementProps {
  initialGigs: ApiGigWithUser[];
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
  userId: number;
}

const GigManagement = ({ initialGigs, categories, subcategories, userId }: GigManagementProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState<ApiGig | null>(null);
  const [selectedGigId, setSelectedGigId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("create");
  const [isGigModalOpen, setIsGigModalOpen] = useState(false);

  const searchedGigs = useMemo(() => {
    return initialGigs.filter((gig) => {
      const matchesSearch = gig.tenCongViec?.toLowerCase().includes(searchTerm.toLowerCase());
      if (selectedCategoryFilter === "all") return matchesSearch;
      const categoryId = getCategoryBySubcategory.getCategoryIdBySubId(gig.maChiTietLoaiCongViec, subcategories);
      const matchesCategory = selectedCategoryFilter ? categoryId === Number(selectedCategoryFilter) : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialGigs, searchTerm, selectedCategoryFilter, subcategories]);

  const sortedGigs = useMemo(() => {
    let list = [...searchedGigs];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.giaTien - b.giaTien);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.giaTien - a.giaTien);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.saoCongViec - a.saoCongViec);
    }
    return list;
  }, [searchedGigs, sortBy]);

  const {
    currentPage,
    currentData: currentGigs,
    totalPages,
    handlePageChange,
    resetPage,
  } = usePagination({ data: sortedGigs, itemsPerPage: 10 });

  const handleOpenCreateModal = () => {
    setSelectedGig(null);
    setModalMode("create");
    setIsGigModalOpen(true);
  };

  const handleOpenViewModal = (gig: ApiGig) => {
    setSelectedGig(gig);
    setModalMode("view");
    setIsGigModalOpen(true);
  };

  const confirmDeleteGig = (e: React.MouseEvent, gigId: number) => {
    e.stopPropagation();
    setSelectedGigId(gigId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteGig = async () => {
    if (!selectedGigId) return;
    try {
      await gigService.deleteGig(selectedGigId);
      toast.success("Gig deleted successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to delete gig:", error);
      toast.error(error?.response?.data?.message || "Failed to delete gig. Please try again!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gig Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Review, monitor, and moderate marketplace services.</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchInput
            placeholder="Search gigs by title..."
            onSearch={(keyword) => {
              setSearchTerm(keyword);
              resetPage();
            }}
            className="w-full"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => {
                setSelectedCategoryFilter(e.target.value);
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
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                resetPage();
              }}
              className="filter-btn"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Highest Rated ⭐</option>
              <option value="price-low">Price: Low to High 💲</option>
              <option value="price-high">Price: High to Low 💲</option>
            </select>
          </div>
          <button type="button" onClick={handleOpenCreateModal} className="admin-create-btn">
            + Add New Gig
          </button>
        </div>
      </div>
      {sortedGigs.length === 0 ? (
        <div className="admin-empty-state">No gigs found matching your criteria.</div>
      ) : (
        <>
          <div className="hidden lg:block rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
            <div className="p-6">
              <div className="relative w-full overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="table-th w-[30%]">Gig</th>
                      <th className="table-th w-[25%]">Description</th>
                      <th className="table-th w-[10%]">Seller</th>
                      <th className="table-th w-[9%]">Reviews</th>
                      <th className="table-th w-[9%]">Rating</th>
                      <th className="table-th w-[6%]">Price</th>
                      <th className="table-th text-right w-[10%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {currentGigs.map((g) => {
                      const categoryName = getCategoryBySubcategory.getCategoryNameBySubId(
                        g.maChiTietLoaiCongViec,
                        subcategories,
                        categories,
                      );
                      const isOwner = g.nguoiTao === userId;
                      return (
                        <tr key={g.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="table-td">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-8 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
                                {g.hinhAnh && (
                                  <Image
                                    src={g.hinhAnh}
                                    alt={g.tenCongViec}
                                    width={40}
                                    height={32}
                                    className="object-cover w-full h-full"
                                  />
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium max-w-xs line-clamp-2" title={g.tenCongViec}>
                                  {g.tenCongViec}
                                </span>
                                <span className="inline-block w-fit text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                  {categoryName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="table-td text-muted-foreground">
                            <p className="line-clamp-3 max-w-xs text-sm" title={g.moTa}>
                              {g.moTa}
                            </p>
                          </td>
                          <td className="table-td">@{g.user?.name}</td>
                          <td className="table-td">{g.danhGia}</td>
                          <td className="table-td">
                            <div className="flex items-center gap-1 font-semibold">
                              {g.saoCongViec}
                              <FaStar className="text-accent" />
                            </div>
                          </td>
                          <td className="table-td font-bold text-accent">${g.giaTien}</td>
                          <td className="table-td text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenViewModal(g)}
                                className="admin-edit-icon"
                                title="View Gig Details"
                              >
                                <FaEye className="w-4 h-4" />
                              </button>
                              {isOwner && (
                                <button
                                  type="button"
                                  onClick={(e) => confirmDeleteGig(e, g.id)}
                                  className="admin-trash-icon"
                                  title="Delete Gig"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              )}
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
            {currentGigs.map((g) => {
              const categoryName = getCategoryBySubcategory.getCategoryNameBySubId(
                g.maChiTietLoaiCongViec,
                subcategories,
                categories,
              );
              const isOwner = g.nguoiTao === userId;
              return (
                <div
                  key={g.id}
                  onClick={() => handleOpenViewModal(g)}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border bg-muted">
                      {g.hinhAnh && (
                        <Image
                          src={g.hinhAnh}
                          alt={g.tenCongViec}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div>
                      <span className="inline-block mb-1 text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                        {categoryName}
                      </span>
                      <h3 className="font-semibold text-foreground" title={g.tenCongViec}>
                        {g.tenCongViec}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-3 mt-1 text-justify">{g.moTa}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <p>
                        <span className="text-xs text-muted-foreground">Price: </span>
                        <span className="font-bold text-accent text-base">${g.giaTien}</span>
                      </p>
                      <p>
                        <span className="text-xs text-muted-foreground">Seller: </span>
                        <span className="text-xs">@{g.user?.name}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-muted flex items-center gap-1">
                        {g.saoCongViec} <FaStar className="text-accent text-xs" /> ({g.danhGia})
                      </span>
                      {isOwner && (
                        <button
                          type="button"
                          onClick={(e) => confirmDeleteGig(e, g.id)}
                          className="rounded-lg bg-destructive/10 text-destructive p-2 hover:bg-destructive/20 transition-colors cursor-pointer"
                          title="Delete Gig"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
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
      <GigModal
        isOpen={isGigModalOpen}
        onClose={() => {
          setIsGigModalOpen(false);
          setSelectedGig(null);
        }}
        categories={categories}
        subcategories={subcategories}
        userId={userId}
        gig={selectedGig}
        mode={modalMode}
        onSuccess={() => router.refresh()}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Gig"
        message="Are you sure you want to delete this gig? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteGig}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GigManagement;
