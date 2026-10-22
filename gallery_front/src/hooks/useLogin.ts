import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../apis/userApi";
import { useAuth } from "../common/AuthContext";
import type { UserLogin } from "../types/user";
import axios from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // 이메일, 비밀번호 입력값 변경
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // 로그인 버튼 클릭 시 실행
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const result = await signin(loginForm);

      // JWT 토큰 저장 및 로그인 상태 변경
      login(result.access_token);

      alert("로그인에 성공했습니다.");

      // 로그인 성공 후 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setErrorMessage("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return {
    loginForm,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};
