const stats = [
  {
    title: "전체 직원",
    value: 248,
    unit: "명",
  },
  {
    title: "오늘 출근",
    value: 231,
    unit: "명",
  },
  {
    title: "결재 대기",
    value: 18,
    unit: "건",
  },
  {
    title: "휴가 인원",
    value: 12,
    unit: "명",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">대시보드</h1>

        <p className="mt-2 text-sm text-slate-500">조직의 주요 현황을 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{stat.title}</p>

            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-slate-800">{stat.value.toLocaleString()}</span>

              <span className="mb-1 text-sm text-slate-500">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
