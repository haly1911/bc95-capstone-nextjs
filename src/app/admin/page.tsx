import { categoryService } from "@/services/category.service";
import { gigService } from "@/services/gig.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { ApiCategory, ApiSubcategory, ApiSubcategoryItem } from "@/types/category";
import { ApiGig } from "@/types/gig";
import Image from "next/image";
import Link from "next/link";

const AdminOverviewPage = async () => {
  const [gigRes, topGigsRes, usersRes, categoriesData, ordersRes] = await Promise.all([
    gigService.getGigList(),
    gigService.getTopGigs(),
    userService.getUserList(),
    categoryService.getCategoryWithDetailGroups(),
    orderService.getAllOrders(),
  ]);

  const totalGigs = gigRes.content;
  const topGigs = topGigsRes.content.slice(0, 5);
  const totalUsers = usersRes.content;
  const totalCategories = categoriesData.categories;
  const totalOrders = ordersRes.content;
  const subcategories = categoriesData.subcategories;

  const categoryStats = totalCategories.map((cat: ApiCategory) => {
    const matchingGroups = subcategories.filter((group: ApiSubcategory) => group.maLoaiCongviec === cat.id);
    const subDetailIds = matchingGroups.flatMap(
      (group: ApiSubcategory) => group.dsChiTietLoai?.map((sub: ApiSubcategoryItem) => sub.id) || [],
    );
    const count = totalGigs.filter(
      (gig: ApiGig) => gig.maChiTietLoaiCongViec === cat.id || subDetailIds.includes(gig.maChiTietLoaiCongViec),
    ).length;

    return {
      name: cat.tenLoaiCongViec,
      count,
    };
  });
  const categoryPercentages = categoryStats
    .map((item: any) => ({
      name: item.name,
      percentage: Math.round((item.count / totalGigs.length) * 100),
      count: item.count,
    }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Marketplace Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Live health metrics and system summary across Skillora.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Users</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">{totalUsers.length}</p>
            <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">Database</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Gigs</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">{totalGigs.length}</p>
            <span className="text-xs text-chart-2 font-semibold bg-chart-2/10 px-2 py-0.5 rounded-full">Published</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Categories</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">{totalCategories.length}</p>
            <span className="text-xs text-chart-1 font-semibold bg-chart-1/10 px-2 py-0.5 rounded-full">Catalog</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total Orders</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-foreground">{totalOrders.length}</p>
            <span className="text-xs text-chart-4 font-semibold bg-chart-4/10 px-2 py-0.5 rounded-full">
              Transactions
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">Most Popular Gigs</h3>
              <Link href="/admin/gigs" className="text-xs font-semibold text-accent hover:underline">
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Gig Title</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {topGigs.map((gig) => (
                    <tr key={gig.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 flex items-center gap-3">
                        <div className="relative w-10 h-8 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
                          {gig.hinhAnh && (
                            <Image
                              src={gig.hinhAnh}
                              alt={gig.tenCongViec}
                              width={40}
                              height={30}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                        <span className="font-medium text-foreground line-clamp-1 max-w-xs" title={gig.tenCongViec}>
                          {gig.tenCongViec}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-accent">${gig.giaTien}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-semibold bg-accent/10 text-accent flex items-center w-fit gap-1">
                          ⭐ {gig.saoCongViec}{" "}
                          <span className="text-muted-foreground font-normal">({gig.danhGia})</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {topGigs.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-muted-foreground">
                        No gigs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-6 flex flex-col items-center justify-between">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs w-full h-full">
            <h3 className="text-sm font-bold">Top Categories Distribution</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {categoryPercentages.map((item: any) => (
                <li key={item.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">{item.name}</span>
                    <span className="font-bold">{item.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${item.percentage}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-linear-to-br from-primary to-accent p-4 text-primary-foreground shadow-lg shadow-accent/10 w-full h-full">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">System Notice</h3>
            <p className="mt-2 text-lg font-extrabold">Skillora Core V1.0</p>
            <p className="mt-1 text-xs opacity-90">
              Platform status is operating normally. All security measures are active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
