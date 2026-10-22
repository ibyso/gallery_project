import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser, logout as reduxLogout, restoreSession } from "../store/authSlice";
import { getCurrentUser } from "../apis/userApi";

export function useAuth() {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, isLoading, isInitialized } = useAppSelector((state) => state.auth);

  // 로그인 성공 후 토큰 전달
  const login = useCallback(
    async (token: string) => {
      sessionStorage.setItem("access_token", token);

      try {
        const user = await getCurrentUser();
        dispatch(setUser(user));
      } catch (error) {
        sessionStorage.removeItem("access_token");
        dispatch(reduxLogout());
        throw error;
      }
    },
    [dispatch],
  );

  // 로그아웃
  const logout = useCallback(() => {
    sessionStorage.removeItem("access_token");
    dispatch(reduxLogout());
  }, [dispatch]);

  // 새로고침 후 인증 복원
  const restoreAuth = useCallback(() => {
    return dispatch(restoreSession());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    logout,
    restoreAuth,
  };
}
