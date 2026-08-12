export interface BaseApiResponse<T> {
  statusCode: number;
  content: T;
  dateTime: string;
}

export interface PaginatedApiResponse<T> {
  statusCode: number;
  content: {
    pageIndex?: number;
    pageSize?: number;
    totalRow?: number;
    keyword?: string;
    data: T[];
  };
  dateTime: string;
}
