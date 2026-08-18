import OrderHistory from "@/components/profile/OrderHistory";
import UserInfo from "@/components/profile/UserInfo";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
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
