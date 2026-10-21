// 회원정보 조회 응답 데이터
export interface UserInfoResponse {
  user_id: number;
  email: string;
  name: string;
}

// 현재 로그인한 회원정보 조회 API
export const getMyInfo = async (token: string): Promise<UserInfoResponse> => {
  const response = await fetch("http://127.0.0.1:8000/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`회원정보 조회 실패 (${response.status})`);
  }

  return response.json();
};
