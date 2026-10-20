import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiLogIn, FiUser } from "react-icons/fi";
import React, { useState } from "react";
import { signin, getCurrentUser } from "../apis/userApi";
import InputField from "../components/InputField";
// import { useAuth } from "../common/AuthContext";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signin(loginForm);

      login(result.access_token);

      // 첫 페이지로 이동
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        const detail = error.response?.data.detail;
        if (Array.isArray(detail)) {
          setError(detail[0].msg ?? "회원가입에 실패했습니다.");
        } else {
          setError(detail ?? "회원가입에 실패했습니다.");
        }
      } else {
        setError(String(error));
      }
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

          <h1 className="text-2xl font-bold text-slate-800">로그인</h1>

          <p className="mt-2 text-sm text-slate-500">그룹웨어 관리자 시스템</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 이메일 */}
          <InputField
            label="이메일"
            id="email"
            name="email"
            type="text"
            value={email}
            icon={FiUser}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />

          {/* 비밀번호 */}
          <InputField
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            value={password}
            icon={FiLock}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
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
            아직 계정이 없으신가요?
            <Link to="/signup" className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline">
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
