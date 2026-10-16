import { useState } from "react";
import { Link } from "react-router-dom";
import type { ChangeEvent, SubmitEvent } from "react";
import { signin } from "../apis/userApi";

interface UserLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = loginForm;

  // 이메일, 비밀번호 입력값 변경
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // 로그인 버튼 클릭
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    console.log("로그인 버튼 클릭 확인");

    try {
      // FastAPI 로그인 요청
      const result = await signin({
        email,
        password,
      });

      // 로그인 성공 여부 확인
      console.log("로그인 성공:", result.token_type);

      alert("로그인에 성공했습니다.");
    } catch (error) {
      console.error("로그인 오류:", error);

      if (error instanceof Error && error.message.includes("401")) {
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setErrorMessage("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf8] px-4">
      <Link
        to="/"
        className="fixed left-6 top-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        HOME
      </Link>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">로그인</h1>

        <p className="mb-8 text-sm text-gray-500">여백에 로그인하세요.</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              이메일
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="비밀번호"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
            />
          </div>
          {/* 로그인 오류 메시지 */}
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#58654f] py-3 font-semibold text-white hover:bg-[#45513e]"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <Link to="/users/signup" className="font-medium text-[#58654f] hover:underline">
            회원가입
          </Link>
        </p>

        <div className="mt-5 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:underline">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
