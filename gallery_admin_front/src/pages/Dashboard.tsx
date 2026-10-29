import { useEffect, useState } from "react";
import ActivityChart from "../components/dashboard/ActivityChart";
import ManagementStats from "../components/dashboard/ManagementStats";
import OverviewStats from "../components/dashboard/OverviewStats";
import PopularPostsChart from "../components/dashboard/PopularPostsChart";
import { dashboardMock } from "../types/mockData";
import type { DashboardData } from "../types/dashboard";
import { getDailyActivity, getManagementCounts, getOverviewMetrics, getPopularPost } from "../apis/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData>(dashboardMock);

  const fetchData = async () => {
    try {
      const management = await getManagementCounts();
      const overview = await getOverviewMetrics();
      const activity = await getDailyActivity();
      const popularPosts = await getPopularPost("views");
      setDashboard({
        management: management,
        overview: overview,
        activity: activity,
        popularPosts: popularPosts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onHandleChange = async (data: string) => {
    const popularPosts = await getPopularPost(data);
    setDashboard({ ...dashboard, popularPosts: popularPosts });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">대시보드</h1>
        <p className="mt-2 text-sm text-slate-500">사이트의 주요 운영 현황을 확인하세요.</p>
      </div>

      {/* 1. 관리 항목 */}
      <ManagementStats data={dashboard.management} />

      {/* 2. 핵심 지표 */}
      <OverviewStats data={dashboard.overview} />

      {/* 3. 사용자 활동 추이 */}
      <ActivityChart data={dashboard.activity} />

      {/* 인기 게시글 TOP 5 */}
      <PopularPostsChart data={dashboard.popularPosts} onHandleChange={onHandleChange} />
    </div>
  );
};

export default Dashboard;
