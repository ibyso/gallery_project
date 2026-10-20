import { useState, type ReactNode } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 저장된 JWT 토큰으로 초기 로그인 상태 확인
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    sessionStorage.getItem("access_token"),
  );
  const { currentUserId } = useCurrentUser(accessToken);

  // 로그인 성공 시 실행
  const login = (token: string) => {
    sessionStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  // 로그아웃 시 실행
  const logout = () => {
    sessionStorage.removeItem("access_token");
    setAccessToken(null);
  };

  const value = {
    isLoggedIn: accessToken !== null,
    currentUserId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
