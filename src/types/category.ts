export interface ApiCategorySubDetailItem {
  id: number;
  tenChiTiet: string;
}

export interface ApiCategoryDetailGroup {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: ApiCategorySubDetailItem[];
}

export interface ApiCategory {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai?: ApiCategoryDetailGroup[];
}
