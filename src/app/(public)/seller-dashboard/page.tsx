import ManageOrders from "@/components/seller-dashboard/ManageOrders";
import MyGigs from "@/components/seller-dashboard/MyGigs";
import { gigService } from "@/services/gig.service";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SellerDashboardPage = async () => {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("userId")?.value || "");
  const token = cookieStore.get("token")?.value || "";
  if (!userId || !token) {
    redirect("/auth");
  }
  const gigsRes = await gigService.getGigByCreator(userId);
  const gigs = gigsRes.content || [];
  const sellerOrdersRes = await orderService.getSellerOrders(userId);
  const sellerOrders = sellerOrdersRes.content || [];
  return (
    <main className="wrapper">
      <MyGigs gigs={gigs} />
      <ManageOrders orders={sellerOrders} token={token} />
    </main>
  );
};

export default SellerDashboardPage;
