export interface ApiSubcategoryItem {
  id?: number;
  tenChiTiet: string;
}

export interface ApiSubcategory {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: ApiSubcategoryItem[];
}

export interface ApiCategory {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai?: ApiSubcategory[];
}
