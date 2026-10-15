interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      {/* 이전 페이지 */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="rounded border px-4 py-2 disabled:opacity-30"
      >
        이전
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`rounded px-4 py-2 ${
            currentPage === index + 1 ? "bg-[#58654f] text-white" : "bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="rounded border px-4 py-2 disabled:opacity-30"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
