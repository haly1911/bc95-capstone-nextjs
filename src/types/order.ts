import { ApiGig } from "./gig";
import { ApiUser } from "./user";

export interface ApiOrder {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

export interface ApiOrderWithDetails extends ApiOrder {
  congViec?: ApiGig;
  buyer?: ApiUser;
}

export interface ApiOrderHistory {
  id: number;
  ngayThue: string;
  hoanThanh: boolean;
  congViec: ApiGig;
}
