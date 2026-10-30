import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { signup } from "../apis/userApi";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const SignupPage = () => {
  const { login, isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const { email, name, password, passwordCheck } = form;
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!$*-]).{8,64}$/;
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      setError("비밀번호는 대소문자와 숫자, 특수문자(@!$*-)를 각 1자 이상 포함한 8자리 이상이어야 합니다.");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }
    try {
      setIsLoading(true);
      const result = await signup({
        email: email,
        name: name,
        password: password,
      });
      alert(`${result.user_id}님 환영합니다.`);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

  if (!isInitialized) {
    return <div>인증 확인 중...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 이메일 */}
          <InputField
            label="이메일"
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />

          {/* 이름 */}
          <InputField
            label="이름"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />

          {/* 비밀번호 */}
          <InputField
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />

          {/* 비밀번호 확인 */}
          <InputField
            label="비밀번호"
            id="passwordCheck"
            name="passwordCheck"
            type="password"
            value={passwordCheck}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />

          {/* 오류 메시지 */}
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogIn size={17} />
            {isLoading ? "가입 중..." : "회원가입"}
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
