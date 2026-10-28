import ActivityChart from "../components/dashboard/ActivityChart";
import ManagementStats from "../components/dashboard/ManagementStats";
import OverviewStats from "../components/dashboard/OverviewStats";
import PopularPostsChart from "../components/dashboard/PopularPostsChart";
import { dashboardMock } from "../types/mockData";

// ⭐ 수정: 기존 stats 카드 하나에서 4개 영역으로 대시보드 확장
const Dashboard = () => {
  // ⭐ 추가: 추후 FastAPI에서 조회한 데이터로 교체할 부분
  const data = dashboardMock;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">대시보드</h1>
        <p className="mt-2 text-sm text-slate-500">사이트의 주요 운영 현황을 확인하세요.</p>
      </div>

      {/* ⭐ 추가: 1. 관리 항목 */}
      <ManagementStats data={data.management} />

      {/* ⭐ 추가: 2. 핵심 지표 */}
      <OverviewStats data={data.overview} />

      {/* ⭐ 추가: 3. 사용자 활동 추이 */}
      <ActivityChart data={data.activity} />

      {/* ⭐ 추가: 4. 인기 게시글 TOP 5 */}
      <PopularPostsChart data={data.popularPosts} />
    </div>
  );
};

export default Dashboard;
