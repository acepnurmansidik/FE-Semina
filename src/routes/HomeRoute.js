import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

export default function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
