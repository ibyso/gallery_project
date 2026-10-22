import axios from "axios";
import axiosInstance from "./axios";
import type { UserSignUp, UserLogin, UserSearchParams } from "../types/users";

const SERVER_URL = "http://localhost:8000/admin";

// 회원정보
export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/me`);
  return response.data;
};

// 회원가입
export const signup = async (data: UserSignUp) => {
  const response = await axios.post(`${SERVER_URL}/signup`, data);
  return response.data;
};

// 로그인
export const signin = async (data: UserLogin) => {
  const response = await axios.post(`${SERVER_URL}/signin`, data);
  return response.data;
};

// 관리자 목록
export const getAdminLists = async (data: UserSearchParams) => {
  const response = await axiosInstance.get(`${SERVER_URL}/`, { params: data });
  return response.data;
};

// 관리자 권한 변경
export const patchAdminAllows = async (key: string, user_id: number) => {
  const response = await axiosInstance.patch(`${SERVER_URL}/${user_id}/${key}`);
  return response.data;
};
