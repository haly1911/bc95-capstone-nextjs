"use client";

import { useCategoryStore } from "@/store/useCategoryStore";
import { ApiCategory } from "@/types/category";
import { createSlug } from "@/utils/slugify";
import Link from "next/link";

interface FooterCategoryListProps {
  categories: ApiCategory[];
}

const FooterCategoryList = ({ categories }: FooterCategoryListProps) => {
  const { setSelectedSubId } = useCategoryStore();
  return (
    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
      {categories.map((c) => {
        const slug = createSlug(c.tenLoaiCongViec);
        return (
          <li key={c.id}>
            <Link
              href={`/categories/${slug}`}
              onClick={() => setSelectedSubId("all")}
              className="hover:text-accent truncate block"
            >
              {c.tenLoaiCongViec}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterCategoryList;
