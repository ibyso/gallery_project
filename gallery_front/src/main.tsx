import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthProvider from "./common/AuthProvider";
import "./index.css";
import MyPage from "./pages/MyPage";
import InfoChange from "./pages/InfoChange";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users/signin" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="/users/mypage" element={<MyPage />} />
          <Route path="/users/infochange" element={<InfoChange />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
