import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { loginForm, errorMessage, handleChange, handleSubmit } = useLogin();

  const { email, password } = loginForm;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf8] px-4">
      <Link
        to="/"
        className="fixed left-6 top-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        ▣ Festagram
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
