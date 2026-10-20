import { useState, type SubmitEvent } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

import type { AdminSearchFilters, SearchCategory } from "../../types/admin";
import { initialAdminFilters } from "../../constants/admin";

interface AdminSearchProps {
  onSearch: (filters: AdminSearchFilters) => void;
  onReset: () => void;
}

const AdminSearch = ({ onSearch, onReset }: AdminSearchProps) => {
  const [filters, setFilters] = useState<AdminSearchFilters>({
    ...initialAdminFilters,
  });
  const [showDetail, setShowDetail] = useState(false);
  const [error, setError] = useState("");

  // 검색 조건 변경
  const updateFilter = <K extends keyof AdminSearchFilters>(key: K, value: AdminSearchFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setError("");
  };

  // 검색 실행
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showDetail && filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      setError("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    setError("");

    onSearch({
      ...filters,
      keyword: filters.keyword.trim(),
      startDate: showDetail ? filters.startDate : "",
      endDate: showDetail ? filters.endDate : "",
      status: showDetail ? filters.status : "all",
    });
  };

  // 검색 초기화
  const handleReset = () => {
    setFilters({ ...initialAdminFilters });
    setError("");
    onReset();
  };

  const inputClass =
    "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        {/* 기본 검색 */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* 카테고리 선택 */}
          <select
            aria-label="검색 카테고리"
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value as SearchCategory)}
            className={`${inputClass} w-32`}
          >
            <option value="name">이름</option>
            <option value="userId">아이디</option>
            <option value="email">이메일</option>
          </select>

          {/* 검색 키워드 */}
          <input
            type="text"
            aria-label="검색어"
            value={filters.keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            placeholder="검색어를 입력하세요"
            className={`${inputClass} min-w-0 flex-1 sm:max-w-sm`}
          />

          {/* 검색 및 상세검색 토글 */}
          <button
            type="submit"
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <FiSearch size={16} />
            검색
          </button>
        </div>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            aria-expanded={showDetail}
            onClick={() => setShowDetail((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600"
          >
            상세검색
            {showDetail ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        </div>

        {/* 상세검색 */}
        {showDetail && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="flex flex-wrap items-end justify-center gap-4">
              {/* 시작일 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="adminStartDate" className="text-sm font-medium text-slate-600">
                  시작일
                </label>

                <input
                  id="adminStartDate"
                  type="date"
                  value={filters.startDate}
                  max={filters.endDate || undefined}
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                  className={inputClass}
                />
              </div>

              <span className="pb-3 text-sm text-slate-400">~</span>

              {/* 종료일 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="adminEndDate" className="text-sm font-medium text-slate-600">
                  종료일
                </label>

                <input
                  id="adminEndDate"
                  type="date"
                  value={filters.endDate}
                  min={filters.startDate || undefined}
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* 계정 상태 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="adminAccountStatus" className="text-sm font-medium text-slate-600">
                  계정 상태
                </label>

                <select
                  id="adminAccountStatus"
                  value={filters.status}
                  onChange={(e) => updateFilter("status", e.target.value as AdminSearchFilters["status"])}
                  className={`${inputClass} min-w-36`}
                >
                  <option value="all">전체</option>
                  <option value="active">활성</option>
                  <option value="pending">승인 대기</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </div>

            {/* 유효성 검사 메시지 */}
            {error && (
              <p role="alert" className="mt-4 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            {/* 검색 조건 초기화 */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                검색 조건 초기화
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default AdminSearch;
