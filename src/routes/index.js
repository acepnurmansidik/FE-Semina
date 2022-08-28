import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SNavbar from "../components/Navbar";
import HomeRoute from "./HomeRoute";
import CategoriesRoute from "./CategoriesRoute";
import GuardRoute from "../components/GuardRoute";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/signin";
import TalentsRoute from "./TalentRoute";
import PaymentsRoute from "./PaymentsRoute";
import EventsRoute from "./EventsRoute";
import OrdersRoute from "./OrdersRoute";
import OrganizersRoute from "./Organizers";

const AppRoutes = () => {
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
        <Route path="talents/*" element={<TalentsRoute />} />
        <Route path="payments/*" element={<PaymentsRoute />} />
        <Route path="events/*" element={<EventsRoute />} />
        <Route path="orders/*" element={<OrdersRoute />} />
        <Route path="organizers/*" element={<OrganizersRoute />} />
        <Route
          path=""
          element={<Navigate to={"/dashboard"} replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
