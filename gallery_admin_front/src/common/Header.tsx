import { FiGrid, FiLogIn, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { adminMenus } from "../constants/sidebarList";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  // 현재 경로에 해당하는 메뉴
  const currentMenu = adminMenus.flatMap((group) => group.children).find((item) => item.path === location.pathname);

  const pageTitle = currentMenu?.title ?? "관리자";

  return (
    <header className="relative z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-5">
        <button type="button" onClick={onMenuClick} aria-label="사이드바 열기" className="text-slate-600 lg:hidden">
          <FiMenu size={22} />
        </button>

        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <FiGrid size={19} />
          </div>

          <span className="hidden text-sm font-bold tracking-wide text-slate-800 sm:block">WORKSPACE</span>
        </NavLink>

        <div className="hidden border-l border-slate-200 pl-5 text-sm md:block">
          <span className="text-slate-400">관리자 /</span>

          <span className="ml-2 font-semibold text-slate-700">{pageTitle}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <FiUser size={18} />
              </div>

              <span className="hidden text-sm font-medium text-slate-700 sm:block">{user?.name ?? "회원"}</span>

              <button
                type="button"
                onClick={logout}
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-200"
              >
                <FiLogOut size={16} />
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <FiLogIn size={16} />
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
