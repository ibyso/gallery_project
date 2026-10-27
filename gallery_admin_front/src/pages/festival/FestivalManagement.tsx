import { patchFestivalPublic } from "../../apis/festivals";
import FestivalSearch from "../../components/festival/FestivalSearch";
import FestivalTable from "../../components/festival/FestivalTable";
import Pagination from "../../components/Pagination";
import useFestivals from "../../hooks/useFestivals";
import type { FestivalSearchFilters } from "../../types/festivals";

const FestivalManagement = () => {
  const { data, searchParams, setSearchParams, fetchData } = useFestivals();
  const startPage = Math.floor((data.page - 1) / data.size) * data.size + 1;
  const endPage = Math.min(startPage + data.size - 1, data.total_pages);

  // 검색 실행
  const handleSearch = (params: FestivalSearchFilters) => {
    const filters = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        filters.set(key, String(value));
      }
    });

    setSearchParams(filters);
  };

  // 검색 초기화
  const handleReset = () => {
    setSearchParams({});
  };

  // 페이지 변경
  const onPageChange = (page: number) => {
    // setSearchParams((prev) => ({ ...prev, page: page }));
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(page));
      return params;
    });
  };

  const onHandlePublic = async (key: string, id: number) => {
    if (!id) return;

    try {
      const result = await patchFestivalPublic(key, id);
      alert(result.message);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">게시글 관리</h1>

        <p className="mt-1 text-sm text-slate-500">게시글을 조회하고 관리합니다.</p>
      </div>

      {/* 검색 컴포넌트 */}
      <FestivalSearch searchParams={searchParams} onSearch={handleSearch} onReset={handleReset} />

      {/* 관리자 목록 컴포넌트 */}
      <FestivalTable datas={data.items} onHandlePublic={onHandlePublic} />
      <Pagination
        currentPage={data.page}
        totalPages={data.total_pages}
        onPageChange={onPageChange}
        start={startPage}
        end={endPage}
      />
    </div>
  );
};
export default FestivalManagement;
