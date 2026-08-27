import { gigService } from "@/services/gig.service";
import { categoryService } from "@/services/category.service";
import GigManagement from "@/components/admin/GigManagement";
import { cookies } from "next/headers";

const AdminGigsPage = async () => {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("userId")?.value);
  const [gigRes, categoryRes] = await Promise.all([
    gigService.getGigList(),
    categoryService.getCategoryWithDetailGroups(),
  ]);

  const gigs = gigRes.content || [];
  const categories = categoryRes.categories || [];
  const subcategories = categoryRes.subcategories || [];

  return <GigManagement initialGigs={gigs} categories={categories} subcategories={subcategories} userId={userId} />;
};

export default AdminGigsPage;
