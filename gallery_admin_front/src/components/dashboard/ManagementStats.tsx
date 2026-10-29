import { FiEyeOff, FiMessageSquare, FiShield, FiUserCheck, FiUserX } from "react-icons/fi";
import type { ManagementCounts } from "../../types/dashboard";

interface ManagementStatsProps {
  data: ManagementCounts;
}

const ManagementStats = ({ data }: ManagementStatsProps) => {
  const items = [
    { title: "승인 대기", value: data.pendingApprovals, unit: "건", icon: FiUserCheck },
    { title: "비공개 게시글", value: data.privatePosts, unit: "건", icon: FiEyeOff },
    { title: "삭제된 댓글", value: data.deletedComments, unit: "건", icon: FiMessageSquare },
    { title: "차단 이용자", value: data.blockedUsers, unit: "명", icon: FiUserX },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <FiShield className="text-slate-500" aria-hidden="true" />
          관리 항목
        </h2>
        <span className="text-xs text-slate-400"></span>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {items.map(({ title, value, unit, icon: Icon }) => (
          <div
            key={title}
            className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-4 text-center"
          >
            <Icon className="text-xl text-slate-500" aria-hidden="true" />
            <p className="text-xs text-slate-500 sm:text-sm">{title}</p>
            <p className="text-2xl font-bold text-slate-800">
              {value.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManagementStats;
