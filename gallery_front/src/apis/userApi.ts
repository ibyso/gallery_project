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

export const signup = async (data: UserSignupRequest): Promise<UserSignupResponse> => {
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
