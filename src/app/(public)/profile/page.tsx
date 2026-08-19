import OrderHistory from "@/components/profile/OrderHistory";
import UserInfo from "@/components/profile/UserInfo";
import { orderService } from "@/services/order.service";
import { skillService } from "@/services/skill.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (!token) {
    redirect("/auth");
  }
  const orderRes = await orderService.getOrderHistory(token);
  const orders = orderRes.content;
  const skillRes = await skillService.getSkillList();
  const skills = skillRes.content;
  return (
    <main className="wrapper">
      <UserInfo skills={skills}/>
      <OrderHistory orders={orders} />
    </main>
  );
};

export default ProfilePage;
