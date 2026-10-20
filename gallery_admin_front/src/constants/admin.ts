import type { AccountStatus, AdminSearchFilters } from "../types/admin";

// 초기 검색 조건
export const initialAdminFilters: AdminSearchFilters = {
  category: "name",
  keyword: "",
  startDate: "",
  endDate: "",
  status: "all",
};

// 계정 상태별 표시 이름
export const adminStatusLabels: Record<AccountStatus, string> = {
  active: "활성",
  pending: "승인 대기",
  inactive: "비활성",
};

// 계정 상태별 스타일
export const adminStatusStyles: Record<AccountStatus, string> = {
  active: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  inactive: "bg-slate-100 text-slate-600",
};
