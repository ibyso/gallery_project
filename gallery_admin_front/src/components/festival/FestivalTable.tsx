import type { FestivalRespoonse } from "../../types/festivals";

interface FestivalListProps {
  datas: FestivalRespoonse[];
  onHandleAllow: (key: string, user_id: number) => void;
}

const FestivalTable = ({ datas, onHandleAllow }: FestivalListProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* 테이블 제목 */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          관리자 목록
          <span className="ml-2 text-sm font-normal text-blue-600">총 {datas.length}건</span>
        </h2>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">번호</th>
              <th className="px-6 py-4 font-semibold">제목</th>
              <th className="px-6 py-4 font-semibold">주소</th>
              <th className="px-6 py-4 font-semibold">진행일</th>
              <th className="px-6 py-4 font-semibold">전화번호</th>
              <th className="px-6 py-4 font-semibold">행사시간</th>
              <th className="px-6 py-4 font-semibold">행사장소</th>
              <th className="px-6 py-4 font-semibold">댓글수</th>
              <th className="px-6 py-4 font-semibold">공개여부</th>
              <th className="px-6 py-4 font-semibold">삭제여부</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {datas.length > 0 ? (
              datas.map((data) => (
                <tr key={data.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{data.id}</td>
                  <td className="px-6 py-4 text-slate-700">{data.title}</td>
                  <td className="px-6 py-4 text-slate-500">
                    ({data.zipcode}) {data.addr1} - {data.addr2}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {data.startdate?.split("T")[0]} ~ {data.enddate?.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{data.tel}</td>
                  <td className="px-6 py-4 text-slate-500">{data.playtime}</td>
                  <td className="px-6 py-4 text-slate-500">{data.eventplace}</td>
                  <td className="px-6 py-4 text-slate-500">{data.comments ? data.comments.length : 0}</td>
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
export default FestivalTable;
