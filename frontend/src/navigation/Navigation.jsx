import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterLogin from "../pages/Auth/RegisterLogin";
import VerifyAccount from "../pages/Auth/VerifyAccount";
import CreateQuiz from "../pages/Quiz/CreateQuiz";
import QuizList from "../pages/Quiz/QuizList";
import UpdateQuiz from "../pages/Quiz/UpdateQuiz";
import ExamPlay from "../pages/Exam/ExamPlay";
import Reports from "../pages/Report/Reports";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import ChangeName from "../pages/Auth/ChangeName";
import ChangePassword from "../pages/Auth/ChangePassword";
import Deactivate from "../pages/Auth/Deactivate";
import PublishQuiz from "../pages/Quiz/PublishQuiz";
import Favorite from "../pages/Exam/Favorite";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registerlogin" />} />

      <Route path="/registerlogin" element={<RegisterLogin />} />
      <Route path="/verifyaccount" element={<VerifyAccount />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quizlist" element={<QuizList />} />
      <Route path="/updatequiz" element={<UpdateQuiz />} />
      <Route path="/examplay/:id" element={<ExamPlay />} />
      <Route path="/report/:reportId" element={<Reports />} />
      <Route path="/home" element={<Home />} />
      <Route path="/change-name" element={<ChangeName />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/deactivate" element={<Deactivate />} />
      <Route path="/publish-quiz" element={<PublishQuiz />} />
      <Route path="/favorite" element={<Favorite />} />
    </Routes>
  );
};

export default Navigation;
