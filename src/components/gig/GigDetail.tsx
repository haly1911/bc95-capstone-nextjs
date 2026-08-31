"use client";

import { orderService } from "@/services/order.service";
import { useAuthStore } from "@/store/useAuthStore";
import { ApiGigWithUser } from "@/types/gig";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../modals/ConfirmModal";
import UserAvatar from "../common/UserAvatar";
import ChatModal from "../modals/ChatModal";

interface GigDetailProps {
  gig: ApiGigWithUser;
}

const GigDetail = ({ gig }: GigDetailProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOrder = () => {
    if (!isAuthenticated || !user) {
      toast.warning("Please sign in to continue ordering");
      router.push("/auth");
      return;
    }
    if (user.id === gig.nguoiTao) {
      toast.error("You cannot order your own gig!");
      return;
    }
    setIsOrderModalOpen(true);
  };

  const executeOrder = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await orderService.orderGig({
        maCongViec: gig.id,
        maNguoiThue: user.id,
        ngayThue: new Date().toISOString(),
        hoanThanh: false,
      });
      toast.success("Order placed successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to place order!");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (!isAuthenticated || !user) {
      toast.warning("Please sign in to contact the seller");
      router.push("/auth");
      return;
    }
    if (user.id === gig.nguoiTao) {
      toast.error("You cannot chat with yourself!");
      return;
    }
    setIsChatOpen(true);
  };
  return (
    <main>
      <div className="wrapper py-10">
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{gig.tenCongViec}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <Link href="/seller/$username" className="flex items-center gap-3 hover:text-accent">
                <UserAvatar src={gig.user?.avatar} name={gig.user?.name} size={40} />
                <p className="font-semibold">{gig.user?.name}</p>
              </Link>
              <span className="text-xs">
                ★ <b>{gig.saoCongViec}</b> <span className="text-muted-foreground">({gig.danhGia})</span>
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                loading="eager"
                src={gig.hinhAnh}
                alt="gig-img"
                width={200}
                height={100}
                className="w-full object-cover"
              />
            </div>
          </div>
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold border-b pb-3">About this gig</h2>
              <p className="mt-3 text-sm leading-relaxed text-justify text-muted-foreground">{gig.moTa}</p>
              <div className="p-6">
                <button
                  type="button"
                  onClick={handleOrder}
                  disabled={loading}
                  className={`w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {loading ? "Processing..." : `Continue ($${gig.giaTien})`}
                </button>
                <button
                  type="button"
                  onClick={handleContactSeller}
                  className="mt-2 w-full rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:border-accent cursor-pointer"
                >
                  Contact seller
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ConfirmModal
        isOpen={isOrderModalOpen}
        title="Confirm Order"
        message={`Are you sure you want to place an order for "${gig.tenCongViec}" with a total of $${gig.giaTien}?`}
        confirmText="Confirm & Pay"
        type="primary"
        onConfirm={executeOrder}
        onClose={() => setIsOrderModalOpen(false)}
      />
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sellerName={gig.user?.name}
        sellerAvatar={gig.user?.avatar}
        gigTitle={gig.tenCongViec}
      />
    </main>
  );
};

export default GigDetail;
