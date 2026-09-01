import React from "react";
import { categoryService } from "@/services/category.service";
import PublicLayoutClient from "@/components/layout/PublicLayoutClient";

export default async function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const categoryData = await categoryService.getCategoryWithDetailGroups();
  const categories = categoryData.categories || [];
  const subcategories = categoryData.subcategories || [];

  return (
    <PublicLayoutClient categories={categories} subcategories={subcategories}>
      {children}
    </PublicLayoutClient>
  );
}
