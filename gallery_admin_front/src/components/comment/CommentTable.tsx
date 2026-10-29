import type { CommentResponse } from "../../types/comments";

interface CommentslListProps {
  datas: CommentResponse[];
  total_count: number;
  onHandleDelete: (is_delete: string, content_id: number) => void;
}

const CommentTable = ({ datas, total_count, onHandleDelete }: CommentslListProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* 테이블 제목 */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          댓글 목록
          <span className="ml-2 text-sm font-normal text-blue-600">총 {total_count}건</span>
        </h2>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">번호</th>
              <th className="px-6 py-4 font-semibold">게시글</th>
              <th className="px-6 py-4 font-semibold">작성자</th>
              <th className="px-6 py-4 font-semibold">내용</th>
              <th className="px-6 py-4 font-semibold">작성일</th>
              <th className="px-6 py-4 font-semibold">수정일</th>
              <th className="px-6 py-4 font-semibold">삭제여부</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {datas.length > 0 ? (
              datas.map((data) => (
                <tr key={data.comment_id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{data.comment_id}</td>
                  <td className="px-6 py-4 text-slate-700">{data.festivals.title}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {data.user.name}({data.user.email})
                  </td>
                  <td className="px-6 py-4 text-slate-500">{data.body}</td>
                  <td className="px-6 py-4 text-slate-500">{data.created_at?.split("T")[0]}</td>
                  <td className="px-6 py-4 text-slate-500">{data.updated_at?.split("T")[0]}</td>
                  <td className="px-6 py-4 text-slate-500">
                    <select
                      value={data.is_delete}
                      onChange={(e) => onHandleDelete(e.target.value, data.comment_id)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="false">공개</option>
                      <option value="true">삭제</option>
                    </select>
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
export default CommentTable;
