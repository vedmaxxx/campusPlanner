import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Greeting from "../../pages/Greeting";
import ScheduleByGroup from "../../pages/ScheduleByGroup";
import FormByGroup from "../FormByGroup/FormByGroup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/greeting" replace />} />
      <Route path="/greeting" element={<Greeting />} />
      <Route path="/group" element={<FormByGroup />} />
      <Route path="/group/schedule" element={<ScheduleByGroup />} />
    </Routes>
  );
};

export default AppRouter;
