export interface LikedFestival {
  user_id: number;
  festival_id: number;
  title: string;
}

// 로그인한 사용자의 좋아요 목록 조회
export const getMyLikes = async (token: string): Promise<LikedFestival[]> => {
  const response = await fetch("http://127.0.0.1:8000/users/me/likes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`좋아요 목록 조회 실패 (${response.status})`);
  }

  return response.json();
};
