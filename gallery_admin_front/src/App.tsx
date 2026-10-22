import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./common/AppLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminManagement from "./pages/admin/AdminManagement";
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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
