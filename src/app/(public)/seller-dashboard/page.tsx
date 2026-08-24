import ManageOrders from "@/components/seller-dashboard/ManageOrders";
import MyGigs from "@/components/seller-dashboard/MyGigs";
import { categoryService } from "@/services/category.service";
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
  const [gigsRes, sellerOrdersRes, categoryData] = await Promise.all([
    gigService.getGigByCreator(userId),
    orderService.getSellerOrders(userId),
    categoryService.getCategoryWithDetailGroups(),
  ]);
  const gigs = gigsRes.content || [];
  const sellerOrders = sellerOrdersRes.content || [];
  return (
    <main className="wrapper">
      <MyGigs
        gigs={gigs}
        userId={userId}
        categories={categoryData.categories}
        subcategories={categoryData.subcategories}
      />
      <ManageOrders orders={sellerOrders} />
    </main>
  );
};

export default SellerDashboardPage;
