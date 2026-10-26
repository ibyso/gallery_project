import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./common/AppLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminManagement from "./pages/admin/AdminManagement";
import MemberManagement from "./pages/member/MemberManagement";
import FestivalManagement from "./pages/festival/FestivalManagement";
import ProtectedRoute from "./components/ProtectedRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute allowedRoles={["Admin", "Manager"]} />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin" element={<AdminManagement />} />
            <Route path="/member" element={<MemberManagement />} />
            <Route path="/festival" element={<FestivalManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
