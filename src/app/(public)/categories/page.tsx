import { categoryService } from "@/services/category.service";
import { getCategoryIcon } from "@/utils/iconMap";
import { createSlug } from "@/utils/slugify";
import Link from "next/link";

const CategoriesPage = async () => {
  const response = await categoryService.getCategories();
  const categories = response.content || [];

  return (
    <main className="wrapper py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">All Categories</h1>
        <p className="mt-2 text-sm text-muted-foreground">Browse all available service categories.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => {
          const slug = createSlug(c.tenLoaiCongViec);
          const IconComponent = getCategoryIcon(c.tenLoaiCongViec);
          return (
            <Link
              key={c.id}
              href={`/categories/${slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="text-3xl group-hover:text-accent">
                <IconComponent />
              </div>
              <h3 className="mt-4 text-sm font-semibold group-hover:text-accent">{c.tenLoaiCongViec}</h3>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default CategoriesPage;
