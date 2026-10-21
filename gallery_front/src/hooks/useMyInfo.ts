import { useEffect, useState } from "react";
import { getCurrentUser } from "../apis/userApi";

export const useMyInfo = () => {
  // 로그인한 사용자의 이름
  const [nickname, setNickname] = useState("회원님");

  // 회원정보 조회
  useEffect(() => {
    const fetchMyInfo = async () => {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        return;
      }

      try {
        const user = await getCurrentUser();

        // DB의 name을 닉네임으로 사용
        setNickname(user.name);
      } catch (error) {
        console.error("회원정보 조회 실패:", error);
      }
    };

    fetchMyInfo();
  }, []);

  return {
    nickname,
  };
};
