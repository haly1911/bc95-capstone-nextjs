"use client";

import { useCategoryStore } from "@/store/useCategoryStore";
import { ApiCategory, ApiCategoryDetailGroup } from "@/types/category";
import { createSlug } from "@/utils/slugify";
import Link from "next/link";
import { useState } from "react";

interface CategoryDropdownProps {
  categories: ApiCategory[];
  subcategories: ApiCategoryDetailGroup[];
}

const CategoryDropdown = ({ categories, subcategories }: CategoryDropdownProps) => {
  const { setSelectedSubId } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState<ApiCategory | null>(null);
  const activeGroups = activeCategory
    ? subcategories.filter((group) => group.maLoaiCongviec === activeCategory.id)
    : [];
  return (
    <div className="border-t border-border/60 relative" onMouseLeave={() => setActiveCategory(null)}>
      <div className="wrapper flex items-center justify-between gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-accent py-2 text-xs font-medium text-muted-foreground">
        {categories.map((c) => {
          const slug = createSlug(c.tenLoaiCongViec);
          return (
            <div key={c.id} onMouseEnter={() => setActiveCategory(c)} className="cursor-pointer">
              <Link
                href={`/categories/${slug}`}
                onClick={() => setSelectedSubId("all")}
                className="whitespace-nowrap hover:text-accent py-1 block"
              >
                {c.tenLoaiCongViec}
              </Link>
            </div>
          );
        })}
      </div>
      {activeCategory && activeGroups.length > 0 && (
        <div
          className="absolute top-full left-0 w-full bg-background border-b border-border shadow-xl py-6 transition-all z-50"
          onMouseEnter={() => setActiveCategory(activeCategory)}
        >
          <div className="wrapper grid grid-cols-2 lg:grid-cols-4 gap-6">
            {activeGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">{group.tenNhom}</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {group.dsChiTietLoai?.map((sub: any) => {
                    const categorySlug = createSlug(activeCategory.tenLoaiCongViec);
                    return (
                      <li key={sub.id}>
                        <Link
                          href={`/categories/${categorySlug}`}
                          className="hover:text-accent transition-colors block"
                          onClick={() => {
                            setSelectedSubId(sub.id);
                            setActiveCategory(null);
                          }}
                        >
                          {sub.tenChiTiet}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
