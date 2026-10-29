import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const { signupForm, errorMessage, handleChange, handleSubmit } = useSignup();

  const { email, name, password, passwordCheck, age, gender } = signupForm;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf8] px-4 py-10">
      {/* 왼쪽 상단 HOME 버튼 */}
      <Link
        to="/"
        className="fixed left-6 top-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        ▣ Festagram
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">회원가입</h1>

        <p className="mb-8 text-sm text-gray-500">여백 계정을 만들어보세요.</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 이메일 */}
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

          {/* 이름 */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              이름
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="이름을 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
            />
          </div>

          {/* 나이 */}
          <div>
            <label htmlFor="age" className="mb-1 block text-sm font-medium">
              나이
            </label>

            <input
              id="age"
              type="number"
              name="age"
              value={age}
              onChange={handleChange}
              required
              min={0}
              max={120}
              step={1}
              placeholder="나이를 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
            />
          </div>

          {/* 성별 */}
          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-medium">
              성별
            </label>

            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#58654f]"
            >
              <option value="" disabled>
                성별을 선택하세요
              </option>
              <option value="Male">남성</option>
              <option value="Female">여성</option>
            </select>
          </div>

          {/* 비밀번호 */}
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
            <p className="mt-2 text-xs text-gray-500">
              비밀번호는 8~64자이며, 영문 대문자·소문자·숫자·특수문자(@!$*-)를 각각 1개 이상
              포함해야 합니다.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="passwordCheck" className="mb-1 block text-sm font-medium">
              비밀번호 확인
            </label>

            <input
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              onChange={handleChange}
              required
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
            />
          </div>

          {/* 오류 메시지 */}
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#58654f] py-3 font-semibold text-white hover:bg-[#45513e]"
          >
            회원가입
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link to="/users/signin" className="font-medium text-[#58654f] hover:underline">
            로그인
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

export default SignupPage;
