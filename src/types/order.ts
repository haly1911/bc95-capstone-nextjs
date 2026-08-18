import { ApiGig } from "./gig";

export interface ApiOrder {
  id: number;
  ngayThue: string;
  hoanThanh: boolean;
  congViec: ApiGig;
}
