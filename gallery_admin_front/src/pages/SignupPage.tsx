import React, { useState } from "react";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

const SignupPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

          <h1 className="text-2xl font-bold text-slate-800">회원가입</h1>

          <p className="mt-2 text-sm text-slate-500">그룹웨어 관리자 시스템</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* 아이디 */}
          <InputField
            label="아이디"
            id="userId"
            name="userId"
            type="text"
            value={userId}
            icon={FiUser}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />

          {/* 이메일 */}
          <InputField
            label="이메일"
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />

          {/* 이름 */}
          <InputField
            label="이름"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />

          {/* 비밀번호 */}
          <InputField
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          {/* 비밀번호 확인 */}
          <InputField
            label="비밀번호"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />

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
            이미 계정이 있으신가요?
            <Link to="/login" className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              로그인하러 가기
            </Link>
          </p>
        </div>

        {/* 하단 저작권 */}
        <p className="mt-8 text-center text-xs text-slate-400">© 2026 FestivalAdmin. All rights reserved.</p>
      </div>
    </div>
  );
};

export default SignupPage;
