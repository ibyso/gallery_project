import axiosInstance from "./axios";

const SERVER_URL = "http://localhost:8000/users";

export interface UserSignupRequest {
  email: string;
  name: string;
  password: string;
  age: number;
  gender: "Male" | "Female";
}

export interface UserSignupResponse {
  user_id: number;
  email: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
}

export const signup = async (
  data: UserSignupRequest,
): Promise<UserSignupResponse> => {
  const response = await fetch("http://127.0.0.1:8000/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`회원가입 요청 실패 (${response.status})`);
  }

  return response.json();
};

// 로그인 요청 데이터
export interface UserLoginRequest {
  email: string;
  password: string;
}

// 로그인 성공 응답 데이터
export interface UserLoginResponse {
  access_token: string;
  token_type: string;
}

// 로그인 API
export const signin = async (
  data: UserLoginRequest,
): Promise<UserLoginResponse> => {
  const response = await fetch("http://127.0.0.1:8000/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`로그인 요청 실패 (${response.status})`);
  }

  return response.json();
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/me`);
  return response.data;
};
