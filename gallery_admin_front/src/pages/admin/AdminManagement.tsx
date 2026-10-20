import { useMemo, useState } from "react";

import AdminSearch from "../../components/admin/AdminSearch";
import AdminTable from "../../components/admin/AdminTable";

import type { AdminSearchFilters, Admin } from "../../types/admin";
import { initialAdminFilters } from "../../constants/admin";

// 임시 데이터
const mockAdmins: Admin[] = [
  {
    id: 1,
    userId: "admin01",
    name: "김관리",
    email: "admin01@example.com",
    createdAt: "2026-10-15",
    status: "active",
  },
  {
    id: 2,
    userId: "manager02",
    name: "이운영",
    email: "manager02@example.com",
    createdAt: "2026-10-10",
    status: "pending",
  },
  {
    id: 3,
    userId: "admin03",
    name: "박담당",
    email: "admin03@example.com",
    createdAt: "2026-09-28",
    status: "inactive",
  },
  {
    id: 4,
    userId: "manager04",
    name: "최관리",
    email: "manager04@example.com",
    createdAt: "2026-10-19",
    status: "active",
  },
];

const AdminManagement = () => {
  // 검색 버튼으로 적용한 조건
  const [searchFilters, setSearchFilters] = useState<AdminSearchFilters>({ ...initialAdminFilters });

  // 검색 실행
  const handleSearch = (filters: AdminSearchFilters) => {
    setSearchFilters(filters);
  };

  // 검색 초기화
  const handleReset = () => {
    setSearchFilters({ ...initialAdminFilters });
  };

  // 관리자 목록 필터링
  const filteredAdmins = useMemo(() => {
    return mockAdmins.filter((admin) => {
      const { category, keyword, startDate, endDate, status } = searchFilters;

      // 키워드 검색
      const matchesKeyword = !keyword || admin[category].toLowerCase().includes(keyword.toLowerCase());

      // 계정 상태 검색
      const matchesStatus = status === "all" || admin.status === status;

      // 시작일 검색
      const matchesStartDate = !startDate || admin.createdAt >= startDate;

      // 종료일 검색
      const matchesEndDate = !endDate || admin.createdAt <= endDate;

      return matchesKeyword && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [searchFilters]);

  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">관리자 관리</h1>

        <p className="mt-1 text-sm text-slate-500">관리자 계정을 조회하고 관리합니다.</p>
      </div>

      {/* 검색 컴포넌트 */}
      <AdminSearch onSearch={handleSearch} onReset={handleReset} />

      {/* 관리자 목록 컴포넌트 */}
      <AdminTable admins={filteredAdmins} />
    </div>
  );
};
export default AdminManagement;
