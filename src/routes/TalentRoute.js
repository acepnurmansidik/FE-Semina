import React from "react";
import { Route, Routes } from "react-router-dom";
import Talents from "../pages/talents";

export default function TalentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Talents />} />
    </Routes>
  );
}
