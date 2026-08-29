import { ApiCategory, ApiCategoryDetailGroup } from "@/types/category";

export const getCategoryBySubcategory = {
  getCategoryNameBySubId: (subId: number, subcategories: ApiCategoryDetailGroup[], categories: ApiCategory[]) => {
    const foundGroup = subcategories.find((group) => group.dsChiTietLoai?.some((sub) => sub.id === subId));
    if (!foundGroup) return "Uncategorized";

    const foundCat = categories.find((cat) => cat.id === foundGroup.maLoaiCongviec);
    return foundCat ? foundCat.tenLoaiCongViec : "Uncategorized";
  },

  getCategoryIdBySubId: (subId: number, subcategories: ApiCategoryDetailGroup[]) => {
    const foundGroup = subcategories.find((group) => group.dsChiTietLoai?.some((sub) => sub.id === subId));
    return foundGroup ? foundGroup.maLoaiCongviec : null;
  },
};
