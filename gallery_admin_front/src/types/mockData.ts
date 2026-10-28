import type { DashboardData } from "../types/dashboard";

// ⭐ 추가: 실제 API 연동 전 사용할 화면 확인용 예시 데이터
export const dashboardMock: DashboardData = {
  management: {
    pendingApprovals: 12,
    privatePosts: 24,
    deletedComments: 8,
    blockedUsers: 5,
  },
  overview: {
    members: { total: 1248, weeklyIncrease: 32 },
    views: { total: 12580, weeklyIncrease: 824 },
    comments: { total: 2154, weeklyIncrease: 87 },
    likes: { total: 5827, weeklyIncrease: 143 },
  },
  activity: [
    { date: "10/21", newMembers: 4, newComments: 12 },
    { date: "10/22", newMembers: 6, newComments: 10 },
    { date: "10/23", newMembers: 3, newComments: 15 },
    { date: "10/24", newMembers: 5, newComments: 9 },
    { date: "10/25", newMembers: 7, newComments: 17 },
    { date: "10/26", newMembers: 4, newComments: 11 },
    { date: "10/27", newMembers: 3, newComments: 13 },
  ],
  popularPosts: [
    { id: 1, title: "서울 가을 축제 안내", views: 1480, likes: 320, comments: 74 },
    { id: 2, title: "주말 추천 여행 코스", views: 1260, likes: 270, comments: 62 },
    { id: 3, title: "지역 문화 행사 정보", views: 990, likes: 220, comments: 58 },
    { id: 4, title: "겨울 축제 미리보기", views: 860, likes: 180, comments: 35 },
    { id: 5, title: "가족 나들이 추천", views: 720, likes: 130, comments: 24 },
  ],
};
