import React from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SNavbar from "../../components/Navbar";
import TableWithAction from "../../components/TableWithAction";

function DashboardPage() {
  return (
    <>
      <SNavbar />

      <Container className="mt-5">
        <SBreadcrumb />
        <SButton children={"Tambah"} />

        <TableWithAction />
      </Container>
    </>
  );
}

export default DashboardPage;
