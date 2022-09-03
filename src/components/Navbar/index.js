import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  accessOrders,
  accessOrganizers,
  accessCategories,
  accessEvents,
  // accessParticipant,
  accessPayments,
  accessTalents,
  accessAdmin,
} from "../../const/access";
import NavLink from "../NavAccess";

export default function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate("/")}
          >
            Home
          </NavLink>
          <NavLink
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate("/categories")}
          >
            Categories
          </NavLink>
          <NavLink
            role={role}
            roles={accessTalents.lihat}
            action={() => navigate("/talents")}
          >
            Talents
          </NavLink>
          <NavLink
            role={role}
            roles={accessPayments.lihat}
            action={() => navigate("/payments")}
          >
            Payments
          </NavLink>
          <NavLink
            role={role}
            roles={accessEvents.lihat}
            action={() => navigate("/events")}
          >
            Events
          </NavLink>
          {/* <NavLink
            role={role}
            roles={accessParticipant.lihat}
            action={() => navigate("/participants")}
          >
            Participants
          </NavLink> */}
          <NavLink
            role={role}
            roles={accessOrders.lihat}
            action={() => navigate("/orders")}
          >
            Orders
          </NavLink>
          <NavLink
            role={role}
            roles={accessOrganizers.lihat}
            action={() => navigate("/organizers")}
          >
            Organizer
          </NavLink>
          <NavLink
            role={role}
            roles={accessAdmin.lihat}
            action={() => navigate("/admin")}
          >
            Admin
          </NavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>SignOut</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
