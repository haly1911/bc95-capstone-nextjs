import GigList from "@/components/gig/GigList";
import { gigService } from "@/services/gig.service";

interface ExplorePageProps {
  searchParams: Promise<{ keyword?: string }>;
}

const ExplorePage = async ({ searchParams }: ExplorePageProps) => {
  const resolvedParams = await searchParams;
  const keyword = resolvedParams?.keyword?.toLowerCase().trim() || "";

  const response = await gigService.getGigList();
  const allGigs = response.content;

  const filteredGigs = keyword
    ? allGigs.filter(
        (gig) =>
          gig.tenCongViec?.toLowerCase().includes(keyword) ||
          gig.moTa?.toLowerCase().includes(keyword) ||
          gig.moTaNgan?.toLowerCase().includes(keyword),
      )
    : allGigs;

  return (
    <main>
      <div className="wrapper pt-10">
        <GigList gigList={filteredGigs} searchKeyword={keyword} />
      </div>
    </main>
  );
};

export default ExplorePage;
