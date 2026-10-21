export type UserResponse = {
  user_id: number;
  name: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSignup = {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
  age: string;
  gender: "Male" | "Female" | "";
};

export type UserSignupRequest = {
  email: string;
  name: string;
  password: string;
  age: number;
  gender: "Male" | "Female";
};

export type UserSignupResponse = {
  user_id: number;
  email: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
};

export type UserLoginResponse = {
  access_token: string;
  token_type: string;
};

export type UserUpdateRequest = {
  email: string | null;
  name: string | null;
  password: string | null;
  current_password: string | null;
};

export type UserUpdateResponse = {
  user_id: number;
  email: string;
  name: string;
};
