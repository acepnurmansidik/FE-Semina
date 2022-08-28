import React from "react";
import { Route, Routes } from "react-router-dom";
import Organizer from "../pages/organizers";

export default function OrganizersRoute() {
  return (
    <Routes>
      <Route path="/" element={<Organizer />} />
    </Routes>
  );
}
