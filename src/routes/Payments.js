import React from "react";
import { Route, Routes } from "react-router-dom";
import Payments from "../pages/payments";

export default function PaymentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
      {/* <Route path="/create" element={<Payments />} /> */}
      {/* <Route path="/edit/:paymentId" element={<Payments />} /> */}
    </Routes>
  );
}
