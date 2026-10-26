import { useState, type SubmitEvent } from "react";
import { FiSearch, FiChevronDown, FiChevronUp, FiRefreshCw } from "react-icons/fi";

import type { FestivalSearchFilters, SearchCategory } from "../../types/festivals";

interface SearchProps {
  searchParams: URLSearchParams;
  onSearch: (filters: FestivalSearchFilters) => void;
  onReset: () => void;
}

// 초기 검색 조건
export const initialFilters: FestivalSearchFilters = {
  criteria: "",
  keyword: "",
  start_date: "",
  end_date: "",
  is_public: "",
  is_delete: "",
};

const FestivalSearch = ({ searchParams, onSearch, onReset }: SearchProps) => {
  const [filters, setFilters] = useState<FestivalSearchFilters>({
    ...initialFilters,
    criteria: searchParams.get("criteria") === "addr" ? "addr" : "title",
    keyword: searchParams.get("keyword") ?? "",
    start_date: searchParams.get("start_date") ?? "",
    end_date: searchParams.get("end_date") ?? "",
    is_public: searchParams.get("is_public") ?? "",
    is_delete: searchParams.get("is_delete") ?? "",
  });
  const [showDetail, setShowDetail] = useState(
    Boolean(
      searchParams.get("start_date") ||
      searchParams.get("end_date") ||
      searchParams.get("is_public") ||
      searchParams.get("is_delete"),
    ),
  );
  const [error, setError] = useState("");

  // 검색 조건 변경
  const updateFilter = <K extends keyof FestivalSearchFilters>(key: K, value: FestivalSearchFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setError("");
  };

  // 검색 실행
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showDetail && filters.start_date && filters.end_date && filters.start_date > filters.end_date) {
      setError("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    setError("");

    onSearch({
      ...filters,
      criteria: filters.criteria,
      keyword: filters.keyword ? filters.keyword.trim() : "",
      start_date: showDetail ? filters.start_date : "",
      end_date: showDetail ? filters.end_date : "",
      is_public: showDetail ? filters.is_public : "",
      is_delete: showDetail ? filters.is_delete : "",
    });
  };

  // 검색 초기화
  const handleReset = () => {
    setFilters({ ...initialFilters });
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
            value={filters.criteria}
            onChange={(e) => updateFilter("criteria", e.target.value as SearchCategory)}
            className={`${inputClass} w-32`}
          >
            <option value="">전체</option>
            <option value="title">제목</option>
            <option value="addr">주소</option>
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

          {/* 검색 조건 초기화 */}
          <button
            type="button"
            onClick={handleReset}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <FiRefreshCw size={16} />
            초기화
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
                <label htmlFor="StartDate" className="text-sm font-medium text-slate-600">
                  시작일
                </label>

                <input
                  id="StartDate"
                  type="date"
                  value={filters.start_date}
                  max={filters.end_date || undefined}
                  onChange={(e) => updateFilter("start_date", e.target.value)}
                  className={inputClass}
                />
              </div>

              <span className="pb-3 text-sm text-slate-400">~</span>

              {/* 종료일 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="EndDate" className="text-sm font-medium text-slate-600">
                  종료일
                </label>

                <input
                  id="EndDate"
                  type="date"
                  value={filters.end_date}
                  min={filters.start_date || undefined}
                  onChange={(e) => updateFilter("end_date", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* 계정 상태 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="festival_isPublic" className="text-sm font-medium text-slate-600">
                  계정 상태
                </label>

                <select
                  id="festival_isPublic"
                  value={filters.is_public}
                  onChange={(e) => updateFilter("is_public", e.target.value)}
                  className={`${inputClass} min-w-36`}
                >
                  <option value="">전체</option>
                  <option value="true">공개</option>
                  <option value="false">비공개</option>
                </select>
              </div>
            </div>

            {/* 유효성 검사 메시지 */}
            {error && (
              <p role="alert" className="mt-4 text-center text-sm text-red-500">
                {error}
              </p>
            )}
          </div>
        )}
      </form>
    </section>
  );
};

export default FestivalSearch;
