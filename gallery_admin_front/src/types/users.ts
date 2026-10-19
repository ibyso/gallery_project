export type UserLogin = {
  email: string;
  password: string;
};

export type User = {
  user_id: number;
  email: string;
  name: string;
  role: "Admin" | "Manager";
  allow: boolean;
};

export type UserSignUp = UserLogin & { name: string };
