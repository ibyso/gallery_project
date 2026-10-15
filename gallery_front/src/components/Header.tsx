import { Link } from "react-router-dom";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

function Header({ search, setSearch, setCurrentPage }: HeaderProps) {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <h1 className="text-xl font-bold">▣ HOME</h1>

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

        <Link
          to="/users/signin"
          className="rounded-full bg-[#edf0e9] px-5 py-2 text-sm hover:bg-[#dfe5d8]"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}

export default Header;
