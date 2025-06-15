import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ScholarshipPage from "../pages/ScholarshipPage";
import ProgramPage from "../pages/ProgramPage";
import NoticePage from "../pages/NoticePage";
import MyPage from "../pages/MyPage";

const AppRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/scholarships" element={<ScholarshipPage />} />
      <Route path="/programs" element={<ProgramPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;