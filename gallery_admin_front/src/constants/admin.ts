import type { AdminSearchFilters, AccountStatus } from "../types/users";

// 초기 검색 조건
export const initialAdminFilters: AdminSearchFilters = {
  criteria: "",
  keyword: "",
  start_date: "",
  end_date: "",
  isAllow: "",
};

// 계정 상태별 표시 이름
export const adminStatusLabels: Record<AccountStatus, string> = {
  Approved: "승인됨",
  Pending: "승인 대기",
  Rejected: "비활성",
};

// 계정 상태별 스타일
export const adminStatusStyles: Record<AccountStatus, string> = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  Rejected: "bg-slate-100 text-slate-600",
};
