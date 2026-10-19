import type { IconType } from "react-icons";
import { FiLayers, FiGrid, FiUsers, FiFileText, FiClock, FiBell, FiSettings, FiBarChart2 } from "react-icons/fi";

export interface AdminMenuItem {
  title: string;
  path: string;
  icon: IconType;
}

export interface AdminMenuGroup {
  title: string;
  icon: IconType;
  children: AdminMenuItem[];
}

export const adminMenus: AdminMenuGroup[] = [
  {
    title: "WORKSPACE",
    icon: FiLayers,
    children: [
      {
        title: "대시보드",
        path: "/",
        icon: FiGrid,
      },
      {
        title: "관리자 관리",
        path: "/employees",
        icon: FiUsers,
      },
      {
        title: "회원 관리",
        path: "/notices",
        icon: FiBell,
      },
      {
        title: "게시글 관리",
        path: "/notices",
        icon: FiBell,
      },
    ],
  },
  {
    title: "SYSTEM",
    icon: FiSettings,
    children: [
      {
        title: "통계 및 보고서",
        path: "/reports",
        icon: FiBarChart2,
      },
      {
        title: "시스템 설정",
        path: "/settings",
        icon: FiSettings,
      },
    ],
  },
];
