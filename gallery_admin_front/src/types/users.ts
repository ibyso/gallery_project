export type AccountStatus = "Approved" | "Pending" | "Rejected";

export type SearchCategory = "name" | "email" | "";

export type AdminSearchFilters = {
  criteria?: SearchCategory;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  isAllow?: AccountStatus | "";
};

export type UserLogin = {
  email: string;
  password: string;
};

export type User = {
  user_id: number;
  email: string;
  name: string;
  role: "Admin" | "Manager";
  allow: AccountStatus;
};

export type UserSignUp = UserLogin & { name: string };

export type UserSearchParams = AdminSearchFilters & { page?: number; size?: number };

export type UserRespoonse = {
  user_id: number;
  name: string;
  email: string;
  gender?: string;
  joined_at?: string;
  updated_at?: string;
  role?: string;
  allow?: AccountStatus;
};

export type UserPageRespoonse = {
  items: UserRespoonse[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  criteria?: string;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  isAllow?: AccountStatus | "";
};
