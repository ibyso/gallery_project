import { Link } from "react-router-dom";
import { useMyInfo } from "../hooks/useMyInfo";

const MyPage = () => {
  const { nickname } = useMyInfo();

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292c28]">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          MY PAGE
          <Link to="/" className="text-sm text-gray-500 hover:text-[#58654f]">
            HOME
          </Link>
        </header>

        {/* 프로필 */}
        <section className="mt-12 flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#dce5dc]">
            <svg
              className="h-9 w-9 text-[#58654f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7" />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-lg font-semibold">{nickname}</p>
            <p className="mt-1 text-sm text-gray-400">내 프로필</p>
          </div>

          <Link
            to="/users/infochange"
            className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-[#292c28] transition-colors hover:border-[#58654f] hover:text-[#58654f]"
          >
            회원정보 변경
          </Link>
        </section>

        {/* 환영 메시지 */}
        <section className="mt-12">
          <p className="mb-3 text-sm font-medium text-[#58654f]">반가워요</p>

          <h1 className="text-3xl font-bold leading-snug tracking-tight md:text-4xl">
            {nickname} 님,
            <br />
            오늘도 좋은 하루예요.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-gray-500">
            나만의 기록과 일정을 이곳에서 확인해 보세요.
          </p>
        </section>

        {/* 나의 메뉴 */}
        <section className="mt-24 pb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">나의 메뉴</h2>
            <span className="text-xs text-gray-400">2개의 메뉴</span>
          </div>

          <div className="space-y-4">
            {/* 좋아요 목록 */}
            <Link
              to="/users/likes"
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-[#58654f]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fde9e3]">
                <svg className="h-7 w-7 text-[#dc624b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-9-5.7-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.3-9 12-9 12Z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">좋아요 목록 보기</h3>
                <p className="mt-1 text-sm text-gray-400">저장해 둔 항목을 확인해요</p>
              </div>

              <span className="text-2xl text-gray-400">›</span>
            </Link>

            {/* 캘린더 */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e5eee8]">
                <svg
                  className="h-7 w-7 text-[#58654f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M7 3v4M17 3v4M3 10h18" />
                  <path d="M8 14h2M14 14h2M8 18h2" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">캘린더</h3>
                <p className="mt-1 text-sm text-gray-400">예정된 일정을 살펴봐요</p>
              </div>

              <span className="text-2xl text-gray-400">›</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
