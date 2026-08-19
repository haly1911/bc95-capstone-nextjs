import OrderHistory from "@/components/profile/OrderHistory";
import UserInfo from "@/components/profile/UserInfo";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (!token) {
    redirect("/auth");
  }
  const orderRes = orderService.getOrderHistory(token);
  const orders = (await orderRes).content;
  return (
    <main className="wrapper">
      <UserInfo />
      <OrderHistory orders={orders} />
    </main>
  );
};

export default ProfilePage;
