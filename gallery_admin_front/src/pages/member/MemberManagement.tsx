import { patchMemberAllows } from "../../apis/memberApi";
import MemberSearch from "../../components/member/MemberSearch";
import MemberTable from "../../components/member/MemberTable";
import Pagination from "../../components/Pagination";
import useMembers from "../../hooks/useMembers";
import type { AdminSearchFilters } from "../../types/users";

const MemberManagement = () => {
  const { data, searchParams, setSearchParams, fetchData } = useMembers();
  const startPage = Math.floor((data.page - 1) / data.size) * data.size + 1;
  const endPage = Math.min(startPage + data.size - 1, data.total_pages);

  // 검색 실행
  const handleSearch = (params: AdminSearchFilters) => {
    setSearchParams(params);
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

  const onHandleAllow = async (key: string, user_id: number) => {
    if (!user_id) return;

    try {
      const result = await patchMemberAllows(key, user_id);
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
        <h1 className="text-2xl font-bold text-slate-800">회원 관리</h1>

        <p className="mt-1 text-sm text-slate-500">회원 계정을 조회하고 관리합니다.</p>
      </div>

      {/* 검색 컴포넌트 */}
      <MemberSearch searchParams={searchParams} onSearch={handleSearch} onReset={handleReset} />

      {/* 회원 목록 컴포넌트 */}
      <MemberTable members={data.items} total_count={data.total} onHandleAllow={onHandleAllow} />
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
export default MemberManagement;
