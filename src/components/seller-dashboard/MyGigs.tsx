"use client";

import { ApiGig } from "@/types/gig";
import { useState } from "react";
import { FaPen, FaStar, FaTrash } from "react-icons/fa6";
import GigModal from "../modals/GigModal";
import { ApiCategory, ApiSubcategory } from "@/types/category";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { gigService } from "@/services/gig.service";
import ConfirmModal from "../modals/ConfirmModal";

interface MyGigsProps {
  gigs: ApiGig[];
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
  userId: number;
}

const MyGigs = ({ gigs, categories, subcategories, userId }: MyGigsProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGig, setEditingGig] = useState<ApiGig | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGigId, setSelectedGigId] = useState<number | null>(null);

  const handleOpenModal = (gig?: ApiGig) => {
    setEditingGig(gig ? gig : null);
    setIsModalOpen(true);
  };

  const confirmDeleteGig = (gigId: number) => {
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
    <section className="wrapper pt-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Seller dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your gigs, deliveries and earnings</p>
      </div>

      <div className="mt-10">
        <div className="space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex items-center justify-between px-6 pt-4">
              <h3 className="font-semibold leading-none tracking-tight">My Gigs</h3>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="mt-4 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer"
              >
                Create a new gig
              </button>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                {gigs.length === 0 ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    You haven't created any gigs yet. Click "Create a new gig" to get started!
                  </div>
                ) : (
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Gig</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Description
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reviews</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {gigs.map((g, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <span className="font-medium">{g.tenCongViec}</span>
                          </td>
                          <td className="p-4 align-middle">{g.moTa}</td>
                          <td className="p-4 align-middle">{g.danhGia}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              {g.saoCongViec}
                              <FaStar className="text-accent" />
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="font-semibold">${g.giaTien}</span>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenModal(g)}
                                className="rounded-lg text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                                title="Edit Gig"
                              >
                                <FaPen className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => confirmDeleteGig(g.id)}
                                className="rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                                title="Delete Gig"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gig={editingGig}
        categories={categories}
        subcategories={subcategories}
        userId={userId}
        onSuccess={() => router.refresh()}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Gig"
        message="Are you sure you want to delete this gig? This action cannot be undone"
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteGig}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </section>
  );
};

export default MyGigs;
