"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { ApiCategory, ApiSubcategory } from "@/types/category";

interface PublicLayoutClientProps {
  children: React.ReactNode;
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
}

const PublicLayoutClient = ({ children, categories, subcategories }: PublicLayoutClientProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col relative">
      <Header
        categories={categories}
        subcategories={subcategories}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
      <MobileSidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />
    </div>
  );
};

export default PublicLayoutClient;
