import axios from "axios";
import axiosInstance from "./axios";
import type { UserSignUp, UserLogin } from "../types/users";

const SERVER_URL = "http://localhost:8000/admin";

// 회원가입
export const signup = async (data: UserSignUp) => {
  console.log("Signup init : ", `${SERVER_URL}/signup`);
  console.log(data);
  const response = await axios.post(`${SERVER_URL}/signup`, data);
  console.log(response);
  return response.data;
};

// 로그인
export const signin = async (data: UserLogin) => {
  const response = await axios.post(`${SERVER_URL}/signin`, data);
  return response.data;
};

// 회원정보
export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/me`);
  return response.data;
};
