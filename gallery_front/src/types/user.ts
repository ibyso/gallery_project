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
