export type AccountStatus = "active" | "pending" | "inactive";

export type SearchCategory = "name" | "userId" | "email";

export interface Admin {
  id: number;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  status: AccountStatus;
}

export interface AdminSearchFilters {
  category: SearchCategory;
  keyword: string;
  startDate: string;
  endDate: string;
  status: AccountStatus | "all";
}
