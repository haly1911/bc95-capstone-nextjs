export interface ApiUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill?: string[];
  certification?: string[];
  bookingJob?: string[];
}
