import GigComment from "@/components/gig/GigComment";
import GigDetail from "@/components/gig/GigDetail";
import { gigService } from "@/services/gig.service";

const GigDetailPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const gigId = Number(id);
  const gigRes = await gigService.getGigDetail(gigId);
  const gigDetail = gigRes.content;
  const commentRes = await gigService.getGigComment(gigId);
  const gigComments = commentRes.content;

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <GigDetail gig={gigDetail} />
        <GigComment gigComments={gigComments} />
      </div>
    </main>
  );
};

export default GigDetailPage;
