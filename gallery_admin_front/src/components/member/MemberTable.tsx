import { useNavigate } from "react-router-dom";
import { type UserRespoonse } from "../../types/users";

interface MemberListProps {
  members: UserRespoonse[];
  total_count: number;
  onHandleAllow: (key: string, user_id: number) => void;
}

const MemberTable = ({ members, total_count, onHandleAllow }: MemberListProps) => {
  const navigate = useNavigate();

  const navigateComment = (user_id: number) => {
    navigate(`/comment?criteria=user_id&keyword=${user_id}`);
  };
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* 테이블 제목 */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          회원 목록
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
              <th className="px-6 py-4 font-semibold">나이</th>
              <th className="px-6 py-4 font-semibold">성별</th>
              <th className="px-6 py-4 font-semibold">가입일</th>
              <th className="px-6 py-4 font-semibold">계정 상태</th>
              <th className="px-6 py-4 font-semibold">작성 댓글</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.user_id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{member.user_id}</td>

                  <td className="px-6 py-4 text-slate-700">{member.name}</td>

                  <td className="px-6 py-4 text-slate-500">{member.email}</td>

                  <td className="px-6 py-4 text-slate-500">{member.age}</td>

                  <td className="px-6 py-4 text-slate-500">{member.gender}</td>

                  <td className="px-6 py-4 text-slate-500">{member.joined_at?.split("T")[0]}</td>

                  <td className="px-6 py-4 text-slate-500">
                    <select
                      value={String(member.allow)}
                      onChange={(e) => onHandleAllow(e.target.value, member.user_id)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Pending">활성</option>
                      <option value="Rejected">정지</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigateComment(member.user_id)}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        조회
                      </button>
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
export default MemberTable;
