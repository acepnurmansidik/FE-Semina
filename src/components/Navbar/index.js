import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../Navlink";

export default function SNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate("/")}>Home</NavLink>
          <NavLink action={() => navigate("/categories")}>Categories</NavLink>
          <NavLink action={() => navigate("/talents")}>Talents</NavLink>
          <NavLink action={() => navigate("/events")}>Events</NavLink>
          <NavLink action={() => navigate("/participants")}>
            Participants
          </NavLink>
          <NavLink action={() => navigate("/transactions")}>
            Transactions
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
