import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { ApiUser } from "@/types/user";

export const attachUserToGig = (gigs: ApiGig[], users: ApiUser[]): ApiGigWithUser[] => {
  return gigs.map((gig) => {
    const creator = users.find((user) => user.id === gig.nguoiTao);
    return {
      ...gig,
      user: creator,
    };
  });
};
