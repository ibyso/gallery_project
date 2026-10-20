import { useEffect } from "react"; // ⭐ 추가
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { UserRole } from "../store/authSlice";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const navigate = useNavigate(); // ⭐ 추가

  const { user, isAuthenticated, isLoading, isInitialized } = useAppSelector((state) => state.auth);

  // ⭐ 추가: 권한 검사 결과
  const isReady = !isLoading && isInitialized;
  const isUnauthorized = isReady && !isAuthenticated;

  const isForbidden = isReady && isAuthenticated && !!allowedRoles && (!user || !allowedRoles.includes(user.role));

  // ⭐ 추가: 접근 거부 시 안내 후 이동
  useEffect(() => {
    if (isUnauthorized) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    } else if (isForbidden) {
      alert("해당 페이지에 접근할 권한이 없습니다.");
      navigate("/login", { replace: true });
    }
  }, [isUnauthorized, isForbidden, navigate, location]);

  // 인증 상태 복원 중
  if (!isReady) {
    return <div>인증 확인 중...</div>;
  }

  // ⭐ 수정: 접근 거부 시 하위 페이지 렌더링 방지
  if (isUnauthorized || isForbidden) {
    return null;
  }

  return <Outlet />;
}
