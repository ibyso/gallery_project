
// 회원정보 변경 요청 데이터
export interface UserUpdateRequest {
  email: string | null;
  name: string | null;
  password: string | null;
  current_password: string | null;
}

// 회원정보 변경 응답 데이터
export interface UserUpdateResponse {
  user_id: number;
  email: string;
  name: string;
}

// 회원정보 변경 API
export const updateUser = async (
  data: UserUpdateRequest,
  token: string
): Promise<UserUpdateResponse> => {
  const response = await fetch("http://127.0.0.1:8000/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      typeof errorData?.detail === "string"
        ? errorData.detail
        : `회원정보 변경 요청 실패 (${response.status})`
    );
  }

  return response.json();
};
