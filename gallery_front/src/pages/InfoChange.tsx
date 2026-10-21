import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../apis/userInfoChange";

const InfoChange = () => {
  const [originalEmail] = useState("");
  const [originalName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새 비밀번호 일치 확인
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 현재 비밀번호 확인
    if (newPassword && !currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    // 변경할 데이터 구성
    const updateData = {
      email: email.trim() !== "" && email.trim() !== originalEmail ? email.trim() : null,
      name: name.trim() !== "" && name.trim() !== originalName ? name.trim() : null,
      password: newPassword !== "" ? newPassword : null,
      current_password: newPassword !== "" ? currentPassword : null,
    };

    // 변경할 내용이 없는 경우
    if (updateData.email === null && updateData.name === null && updateData.password === null) {
      alert("변경할 정보를 입력해주세요.");
      return;
    }

    // 로그인 토큰 가져오기
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // FastAPI에 회원정보 변경 요청
    try {
      const result = await updateUser(updateData, token);

      console.log("회원정보 변경 성공:", result);
      alert("회원정보가 성공적으로 변경되었습니다.");

      // 입력값 초기화
      setEmail("");
      setName("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원정보 변경 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292c28]">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <span>EDIT PROFILE</span>

          <Link to="/users/mypage" className="text-sm text-gray-500 hover:text-[#58654f]">
            MY PAGE
          </Link>
        </header>

        <section className="mx-auto mt-12 max-w-xl pb-16">
          <h1 className="text-3xl font-bold">회원정보 변경</h1>
          <p className="mt-3 text-sm text-gray-500">변경하고 싶은 정보를 입력해주세요.</p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="새 이메일을 입력하세요"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
              />
            </div>

            {/* 이름 */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                이름
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="새 이름을 입력하세요"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-semibold">비밀번호 변경</h2>
              <p className="mt-1 text-xs text-gray-400">비밀번호를 변경하지 않으려면 비워두세요.</p>
            </div>

            {/* 현재 비밀번호 */}
            <div>
              <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium">
                현재 비밀번호
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
              />
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
                새 비밀번호
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
              />
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                새 비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 다시 입력"
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#58654f]"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-4">
              <Link
                to="/users/mypage"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-100 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                취소
              </Link>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#58654f] py-3 text-sm font-medium text-white hover:bg-[#475441]"
              >
                변경사항 저장
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default InfoChange;
