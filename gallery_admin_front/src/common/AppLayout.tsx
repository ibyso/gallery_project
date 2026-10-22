import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "./Header";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-50 text-slate-900">
      {/* Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Content */}
      <div className="flex min-h-0 flex-1">
        {/* 좌측 사이드바 */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* 페이지 콘텐츠 */}
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
          {/* Footer */}
          <footer className="shrink-0 border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-6 py-4 text-center text-sm text-slate-400">
              © 2026 FestivalAdmin. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
