import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import TableWithAction from "../../components/TableWithAction";

function Categories() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/signin"} replace={true} />;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Semina</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/talent">Talents</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <SBreadcrumb textSecound="Categories" />
        <SButton children={"Tambah"} />

        <TableWithAction />
      </Container>
    </>
  );
}

export default Categories;
