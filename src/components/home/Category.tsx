import { categoryService } from "@/services/category.service";
import { getCategoryIcon } from "@/utils/iconMap";
import { createSlug } from "@/utils/slugify";
import Link from "next/link";

const Category = async () => {
  const response = await categoryService.getCategories();
  const categories = response.content || [];
  if (!categories || categories.length === 0) return null;

  return (
    <section className="wrapper py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Browse categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">Explore our most popular service categories.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => {
          const slug = createSlug(c.tenLoaiCongViec);
          const IconComponent = getCategoryIcon(c.tenLoaiCongViec);
          return (
            <Link
              key={c.id}
              href={`/categories/${slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="text-3xl group-hover:text-accent">
                <IconComponent />
              </div>
              <h3 className="mt-4 text-sm font-semibold group-hover:text-accent">{c.tenLoaiCongViec}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
