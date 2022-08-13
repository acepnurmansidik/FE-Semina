import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuardRoute({ children }) {
  let { token } = useSelector((state) => state.auth);

  console.log("children");
  console.log(children);

  if (!token) return <Navigate to={"/signin"} replace={true} />;
  return children || <Outlet />;
}
