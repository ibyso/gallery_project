import { adminStatusLabels, adminStatusStyles } from "../../constants/admin";
import { type UserRespoonse } from "../../types/users";

interface AdminListProps {
  admins: UserRespoonse[];
  total_count: number;
  onHandleAllow: (key: string, user_id: number) => void;
}

const AdminTable = ({ admins, total_count, onHandleAllow }: AdminListProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* 테이블 제목 */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          관리자 목록
          <span className="ml-2 text-sm font-normal text-blue-600">총 {total_count}건</span>
        </h2>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">번호</th>
              <th className="px-6 py-4 font-semibold">이름</th>
              <th className="px-6 py-4 font-semibold">이메일</th>
              <th className="px-6 py-4 font-semibold">가입일</th>
              <th className="px-6 py-4 font-semibold">계정 상태</th>
              <th className="px-6 py-4 font-semibold">계정 관리</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.user_id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{admin.user_id}</td>

                  <td className="px-6 py-4 text-slate-700">{admin.name}</td>

                  <td className="px-6 py-4 text-slate-500">{admin.email}</td>

                  <td className="px-6 py-4 text-slate-500">{admin.joined_at?.split("T")[0]}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${adminStatusStyles[admin.allow ?? "Pending"]}`}
                    >
                      {adminStatusLabels[admin.allow ?? "Pending"]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center justify-center gap-2">
                      {admin.allow !== "Approved" && (
                        <button
                          type="button"
                          onClick={() => onHandleAllow("Approved", admin.user_id)}
                          className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          승인
                        </button>
                      )}

                      {admin.allow !== "Pending" && (
                        <button
                          type="button"
                          onClick={() => onHandleAllow("Pending", admin.user_id)}
                          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
                        >
                          대기
                        </button>
                      )}

                      {admin.allow !== "Rejected" && (
                        <button
                          type="button"
                          onClick={() => onHandleAllow("Rejected", admin.user_id)}
                          className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                        >
                          거부
                        </button>
                      )}
                    </div>
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
