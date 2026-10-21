import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/userApi";
import type { UserSignup } from "../types/user";
import { validatePassword } from "../utils/validatePassword";
import axios from "axios";

export const useSignup = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState<UserSignup>({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
    age: "",
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // 입력값 변경
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSignupForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // 회원가입 버튼 클릭
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, name, password, passwordCheck, age, gender } = signupForm;

    // 비밀번호 조건 확인
    if (!validatePassword(password)) {
      setErrorMessage(
        "비밀번호는 8~64자이며 대문자, 소문자, 숫자, 특수문자(@!$*-)를 포함해야 합니다.",
      );
      return;
    }

    // 비밀번호 일치 확인
    if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 성별 선택 확인
    if (gender !== "Male" && gender !== "Female") {
      setErrorMessage("성별을 선택해주세요.");
      return;
    }

    setErrorMessage("");

    try {
      await signup({
        email,
        name,
        password,
        age: Number(age),
        gender,
      });

      alert("회원가입이 완료되었습니다.");
      navigate("/users/signin");
    } catch (error) {
      console.error("회원가입 오류:", error);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage("이미 가입된 이메일입니다.");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 입력값을 확인해주세요.");
      }
    }
  };

  return {
    signupForm,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};
