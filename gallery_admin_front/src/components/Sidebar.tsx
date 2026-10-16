import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiX } from "react-icons/fi";

import { adminMenus } from "../constants/sidebarList";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // 현재 경로가 속한 그룹 찾기
  const getActiveGroup = (pathname: string) => {
    return adminMenus.find((group) => group.children.some((item) => item.path === pathname))?.title;
  };

  // 펼쳐진 그룹 상태
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    const activeGroup = getActiveGroup(location.pathname);

    return activeGroup ? [activeGroup] : ["WORKSPACE"];
  });

  // 그룹 펼침/접힘
  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };

  return (
    <>
      {/* 모바일 오버레이 - 헤더 아래부터 표시 */}
      {isOpen && <div className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* 사이드바 */}
      <aside
        className={`
          fixed bottom-0 left-0 top-16 z-50
          flex w-60 flex-col
          bg-[#1d2d48] text-white
          transition-transform duration-300
          lg:static lg:h-full lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* 모바일 닫기 버튼 */}
        <div className="flex justify-end px-4 pt-4 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
            className="text-slate-300 hover:text-white"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* 메뉴 영역 */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {adminMenus.map((group) => {
            const GroupIcon = group.icon;
            const expanded = openGroups.includes(group.title);

            return (
              <div key={group.title} className="mb-3">
                {/* 중분류 */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-[#293c5c]"
                >
                  <span className="flex items-center gap-3">
                    <GroupIcon size={18} />
                    {group.title}
                  </span>

                  {expanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
                </button>

                {/* 하위 메뉴 */}
                {expanded && (
                  <div className="mt-1 space-y-1 pl-4">
                    {group.children.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === "/"}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `
                            flex items-center gap-3
                            rounded-lg px-3 py-2.5
                            text-sm transition-colors
                            ${
                              isActive
                                ? "bg-[#334b72] font-semibold text-white"
                                : "text-slate-400 hover:bg-[#293c5c] hover:text-white"
                            }
                            `
                          }
                        >
                          <ItemIcon size={16} />
                          <span>{item.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 하단 정보 */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <p className="text-center text-xs text-slate-500">Groupware Admin v1.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
