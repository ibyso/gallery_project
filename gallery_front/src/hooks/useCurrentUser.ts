import { useEffect, useState } from "react";
import { getCurrentUser } from "../apis/userApi";

const useCurrentUser = (accessToken: string | null) => {
  const [user, setUser] = useState<{
    token: string;
    userId: number;
  } | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    let ignore = false;

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();

        if (!ignore) {
          setUser({
            token: accessToken,
            userId: user.user_id,
          });
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      }
    };

    fetchUser();

    return () => {
      ignore = true;
    };
  }, [accessToken]);

  // 로그아웃하거나 토큰이 바뀌면 이전 사용자 ID를 반환하지 않음
  const currentUserId =
    accessToken && user?.token === accessToken ? user.userId : null;

  return { currentUserId };
};

export default useCurrentUser;
