import CategoryDetailList from "@/components/category/CategoryDetailList";
import { categoryService } from "@/services/category.service";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryDetailPage = async ({ params }: CategoryPageProps) => {
  const resolvedParams = await params;
  const data = await categoryService.getCategoryDetails(resolvedParams.slug);
  if (!data) {
    return <div className="mt-20 text-center text-muted-foreground">Category not found</div>;
  }
  const { currentCategory, categoryGroups, gigs } = data;
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{currentCategory.tenLoaiCongViec}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore professional services in {currentCategory.tenLoaiCongViec}
        </p>
      </div>

      <CategoryDetailList groups={categoryGroups} gigList={gigs} />
    </main>
  );
};

export default CategoryDetailPage;
