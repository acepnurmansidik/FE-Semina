import React from "react";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SNavbar from "../../components/Navbar";
import TableWithAction from "../../components/TableWithAction";

function Categories() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/signin"} replace={true} />;
  return (
    <>
      <SNavbar />
      <Container className="mt-5">
        <SBreadcrumb textSecound="Categories" />
        <SButton
          action={() => navigate("/categories/create")}
          children={"Tambah"}
        />

        <TableWithAction />
      </Container>
    </>
  );
}

export default Categories;
