import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Greeting from "../../pages/Greeting";
import ScheduleByStore from "../../pages/ScheduleByStore";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/greeting" replace />} />
      <Route path="/greeting" element={<Greeting />} />

      <Route path="/schedule/group" element={<ScheduleByStore />} />
      <Route path="/schedule/teacher" element={<ScheduleByStore />} />
      <Route path="/schedule/auditorium" element={<ScheduleByStore />} />
    </Routes>
  );
};

export default AppRouter;
