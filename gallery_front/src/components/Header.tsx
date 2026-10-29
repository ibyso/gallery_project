import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

function Header({ search, setSearch, setCurrentPage }: HeaderProps) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <Link to="/" aria-label="페스타그램 홈" className="inline-flex shrink-0 items-center gap-2">
          <img src="/festagram-mark.png" alt="" className="h-12 w-12 object-contain" />
          <span className="text-xl font-bold text-[#292c28]">Festagram</span>
        </Link>

        <input
          type="text"
          placeholder="장소, 장면, 키워드로 검색"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-gray-400"
        />

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/users/mypage"
                className="rounded-full bg-[#edf0e9] px-5 py-2 text-sm hover:bg-[#dfe5d8]"
              >
                마이페이지
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer rounded-full border border-gray-200 px-5 py-2 text-sm hover:bg-gray-100"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/users/signin"
              className="rounded-full bg-[#edf0e9] px-5 py-2 text-sm hover:bg-[#dfe5d8]"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
