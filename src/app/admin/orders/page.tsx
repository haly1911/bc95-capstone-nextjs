import OrderManagement from "@/components/admin/OrderManagement";
import { categoryService } from "@/services/category.service";
import { orderService } from "@/services/order.service";

const AdminOrdersPage = async () => {
  const [orderRes, categoryRes] = await Promise.all([
    orderService.getAllOrdersWithDetails(),
    categoryService.getCategoryWithDetailGroups(),
  ]);
  const orders = orderRes.content;
  const categories = categoryRes.categories;
  const subcategories = categoryRes.subcategories;
  return <OrderManagement orders={orders} categories={categories} subcategories={subcategories} />;
};

export default AdminOrdersPage;
