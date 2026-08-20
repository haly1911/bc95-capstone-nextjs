import { ApiGig } from "@/types/gig";
import { ApiOrder, ApiOrderWithDetails } from "@/types/order";
import { ApiUser } from "@/types/user";

export const attachDetailsToOrder = (orders: ApiOrder[], gigs: ApiGig[], users: ApiUser[]): ApiOrderWithDetails[] => {
  return orders.map((order) => {
    const gig = gigs.find((g) => g.id === order.maCongViec);
    const buyer = users.find((u) => u.id === order.maNguoiThue);

    return {
      ...order,
      congViec: gig,
      buyer: buyer,
    };
  });
};
