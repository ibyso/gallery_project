import { useMemo, useState } from "react";
import { FiAward } from "react-icons/fi";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PopularPost } from "../../types/dashboard";

interface PopularPostsChartProps {
  data: PopularPost[];
  onHandleChange: (data: string) => void;
}

type RankField = "views" | "likes" | "comments";

const rankOptions: { value: RankField; label: string; unit: string }[] = [
  { value: "views", label: "조회수 순", unit: "회" },
  { value: "likes", label: "좋아요 순", unit: "개" },
  { value: "comments", label: "댓글 순", unit: "개" },
];

const PopularPostsChart = ({ data, onHandleChange }: PopularPostsChartProps) => {
  const [rankField, setRankField] = useState<RankField>("views");

  const rankedPosts = useMemo(
    () => [...data].sort((a, b) => b[rankField] - a[rankField]).slice(0, 5),
    [data, rankField],
  );

  // 긴 게시글 제목은 그래프에서 줄여 표시하고, 아래 목록에는 전체 제목을 표시
  const chartData = rankedPosts.map((post, index) => ({
    ...post,
    barLabel: `${index + 1}위 ${post.title.length > 7 ? `${post.title.slice(0, 7)}…` : post.title}`,
  }));
  const selectedOption = rankOptions.find((option) => option.value === rankField)!;

  const sortChange = (data: RankField) => {
    onHandleChange(data);
    setRankField(data);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <FiAward className="text-slate-500" aria-hidden="true" />
          인기 게시글 TOP 5
        </h2>
        <select
          aria-label="인기 게시글 정렬 기준"
          value={rankField}
          onChange={(event) => sortChange(event.target.value as RankField)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {rankOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-1 text-xs text-slate-500">{selectedOption.label} · 상위 5개 게시글</p>

      {rankedPosts.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-400">표시할 게시글이 없습니다.</div>
      ) : (
        <>
          <div className="mt-5 h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={chartData} margin={{ top: 8, right: 22, bottom: 4, left: 0 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="barLabel"
                  width={118}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar
                  dataKey={rankField}
                  name={selectedOption.label.replace(" 순", "")}
                  fill="#2563eb"
                  radius={[0, 6, 6, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
            {rankedPosts.map((post, index) => (
              <div key={post.id} className="flex min-w-0 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-700" title={post.title}>
                    {post.title}
                  </span>
                </div>
                <span className="shrink-0 text-sm tabular-nums text-slate-500">
                  {post[rankField].toLocaleString()}
                  {selectedOption.unit}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PopularPostsChart;
