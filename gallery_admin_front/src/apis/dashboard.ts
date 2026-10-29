import axiosInstance from "./axios";

const SERVER_URL = "http://localhost:8000/admin/dashboard";

// 관리 항목
export const getManagementCounts = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/management`);
  return response.data;
};

// 핵심 지표
export const getOverviewMetrics = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/overview`);
  return response.data;
};

// 사용자 활동 추이
export const getDailyActivity = async () => {
  const response = await axiosInstance.get(`${SERVER_URL}/daily`);
  return response.data;
};

// 인기 게시글
export const getPopularPost = async (data: string) => {
  console.log("data : ", data);
  const response = await axiosInstance.get(`${SERVER_URL}/popular`, { params: { data: data } });
  console.log("response", response);
  return response.data;
};
