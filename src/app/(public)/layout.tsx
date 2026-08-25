import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React from "react";
import { categoryService } from "@/services/category.service";

export default async function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const categoryData = await categoryService.getCategoryWithDetailGroups();
  const categories = categoryData.categories || [];
  const subcategories = categoryData.subcategories || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={categories} subcategories={subcategories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
