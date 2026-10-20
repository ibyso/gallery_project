import type { Admin } from "../../types/admin";
import { adminStatusLabels, adminStatusStyles } from "../../constants/admin";

interface AdminTableProps {
  admins: Admin[];
}

const AdminTable = ({ admins }: AdminTableProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* 테이블 제목 */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          관리자 목록
          <span className="ml-2 text-sm font-normal text-blue-600">총 {admins.length}건</span>
        </h2>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">번호</th>
              <th className="px-6 py-4 font-semibold">아이디</th>
              <th className="px-6 py-4 font-semibold">이름</th>
              <th className="px-6 py-4 font-semibold">이메일</th>
              <th className="px-6 py-4 font-semibold">가입일</th>
              <th className="px-6 py-4 font-semibold">계정 상태</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={admin.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-slate-800">{admin.userId}</td>

                  <td className="px-6 py-4 text-slate-700">{admin.name}</td>

                  <td className="px-6 py-4 text-slate-500">{admin.email}</td>

                  <td className="px-6 py-4 text-slate-500">{admin.createdAt}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${adminStatusStyles[admin.status]}`}
                    >
                      {adminStatusLabels[admin.status]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default AdminTable;
