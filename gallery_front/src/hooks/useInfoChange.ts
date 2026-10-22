import { useState } from "react";
import type { SubmitEvent } from "react";
import { updateUser } from "../apis/userInfoChange";
import { validatePassword } from "../utils/validatePassword";

export const useInfoChange = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새 비밀번호를 입력한 경우에만 규칙 검사
    if (newPassword && !validatePassword(newPassword)) {
      alert(
        "비밀번호는 8~64자이며, 영문 대문자·소문자·숫자·특수문자(@!$*-)를 각각 포함해야 합니다.",
      );
      return;
    }

    // 새 비밀번호 일치 확인
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 현재 비밀번호만 입력한 경우
    if (currentPassword && !newPassword) {
      alert("변경할 새 비밀번호를 입력해주세요.");
      return;
    }

    // 새 비밀번호를 입력했지만 현재 비밀번호가 없는 경우
    if (newPassword && !currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    const updateData = {
      email: email.trim() !== "" ? email.trim() : null,
      name: name.trim() !== "" ? name.trim() : null,
      password: newPassword !== "" ? newPassword : null,
      current_password: newPassword !== "" ? currentPassword : null,
    };

    if (updateData.email === null && updateData.name === null && updateData.password === null) {
      alert("변경할 정보를 입력해주세요.");
      return;
    }

    const token = sessionStorage.getItem("access_token");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await updateUser(updateData);

      alert("회원정보가 성공적으로 변경되었습니다.");

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

  return {
    email,
    setEmail,
    name,
    setName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
