import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiUser } from "react-icons/fi";
import React, { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 로그인 처리
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: FastAPI 로그인 API 연동
      // const response = await axios.post("/api/auth/login", {
      //   user_id: userId,
      //   password,
      // });

      // 임시 로그인 처리
      console.log("로그인 요청:", { userId });

      navigate("/admin", { replace: true });
    } catch {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
        {/* 상단 로고 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <FiLogIn size={26} />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">WORKSPACE</h1>

          <p className="mt-2 text-sm text-slate-500">그룹웨어 관리자 시스템</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* 아이디 */}
          <div>
            <label htmlFor="userId" className="mb-2 block text-sm font-medium text-slate-700">
              아이디
            </label>

            <div className="relative">
              <FiUser
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              비밀번호
            </label>

            <div className="relative">
              <FiLock
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* 비밀번호 표시/숨김 */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* 오류 메시지 */}
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogIn size={17} />
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 회원 신청 안내 */}
        <div className="mt-7 border-t border-slate-100 pt-6 text-center">
          <p className="text-xs text-slate-500">
            아직 계정이 없으신가요?
            <Link to="/register" className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              회원 신청하기
            </Link>
          </p>
        </div>

        {/* 하단 저작권 */}
        <p className="mt-8 text-center text-xs text-slate-400">© 2026 FestivalAdmin. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
