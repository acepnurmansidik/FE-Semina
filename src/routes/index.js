import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SNavbar from "../components/Navbar";
import HomeRoute from "./HomeRoute";
import CategoriesRoute from "./CategoriesRoute";
import GuardRoute from "../components/GuardRoute";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/signin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="signin"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <SNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
        <Route path="categories/*" element={<CategoriesRoute />} />
        <Route
          path=""
          element={<Navigate to={"/dashboard"} replace={true} />}
        />
      </Route>
    </Routes>
  );
}
