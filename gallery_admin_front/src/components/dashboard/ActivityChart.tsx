import { FiActivity } from "react-icons/fi";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyActivity } from "../../types/dashboard";

interface ActivityChartProps {
  data: DailyActivity[];
}

// ⭐ 추가: 7일간 신규 회원 + 작성 댓글 추이
const ActivityChart = ({ data }: ActivityChartProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <FiActivity className="text-slate-500" aria-hidden="true" />
          사용자 활동 추이
        </h2>
        <span className="text-xs text-slate-400">최근 7일</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">일별 신규 회원 및 작성 댓글 수</p>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-400">
          표시할 활동 데이터가 없습니다.
        </div>
      ) : (
        <div className="mt-5 h-72 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 15, bottom: 4, left: -15 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="newMembers"
                name="신규 회원"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="newComments"
                name="작성 댓글"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default ActivityChart;
