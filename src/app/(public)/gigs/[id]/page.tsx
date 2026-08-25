import GigComment from "@/components/gig/GigComment";
import GigDetail from "@/components/gig/GigDetail";
import { commentService } from "@/services/comment.service";
import { gigService } from "@/services/gig.service";

const GigDetailPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const gigId = Number(id);
  const gigRes = await gigService.getGigDetail(gigId);
  const gigDetail = gigRes.content;
  const commentRes = await commentService.getCommentsByGig(gigId);
  const gigComments = commentRes.content;

  return (
    <main>
      <div className="wrapper pt-10">
        <GigDetail gig={gigDetail} />
        <GigComment gigComments={gigComments} gigId={gigId} gigCreatorId={gigDetail.nguoiTao} />
      </div>
    </main>
  );
};

export default GigDetailPage;
