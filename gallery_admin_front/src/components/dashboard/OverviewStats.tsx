import { FiBarChart2, FiEye, FiHeart, FiMessageSquare, FiTrendingUp, FiUsers } from "react-icons/fi";
import type { OverviewMetrics } from "../../types/dashboard";

interface OverviewStatsProps {
  data: OverviewMetrics;
}

const OverviewStats = ({ data }: OverviewStatsProps) => {
  const items = [
    { title: "전체 회원 수", metric: data.members, unit: "명", icon: FiUsers },
    { title: "게시글 조회", metric: data.views, unit: "회", icon: FiEye },
    { title: "전체 댓글", metric: data.comments, unit: "개", icon: FiMessageSquare },
    { title: "전체 좋아요", metric: data.likes, unit: "개", icon: FiHeart },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800">
        <FiBarChart2 className="text-slate-500" aria-hidden="true" />
        핵심 지표
      </h2>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {items.map(({ title, metric, unit, icon: Icon }) => (
          <div key={title} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-slate-500 sm:text-sm">{title}</p>
              <Icon className="shrink-0 text-lg text-slate-400" aria-hidden="true" />
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-800 sm:text-3xl">{metric.total.toLocaleString()}</span>
              <span className="text-sm text-slate-500">{unit}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1 text-xs">
              <FiTrendingUp className="text-emerald-600" aria-hidden="true" />
              <span className="font-semibold text-emerald-600">
                +{metric.weeklyIncrease.toLocaleString()}
                {unit}
              </span>
              <span className="text-slate-400">최근 7일</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewStats;
