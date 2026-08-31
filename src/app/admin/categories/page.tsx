import CategoryManagement from "@/components/admin/CategoryManagement";
import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

const AdminGigsPage = async () => {
  const categoryRes = await categoryService.getCategoryWithDetailGroups();

  const categories = categoryRes.categories || [];
  const subcategories = categoryRes.subcategories || [];

  return <CategoryManagement categories={categories} subcategories={subcategories} />;
};

export default AdminGigsPage;
