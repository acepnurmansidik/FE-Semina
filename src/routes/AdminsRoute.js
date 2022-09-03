import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admins";
import Create from "../pages/admins/create";
import Edit from "../pages/admins/edit";

const AdminsRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:adminId" element={<Edit />} />
    </Routes>
  );
};

export default AdminsRoute;
