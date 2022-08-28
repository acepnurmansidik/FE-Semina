import React from "react";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";

export default function OrganizerPage() {
  return (
    <Container className="mt-5">
      <SBreadcrumb textSecound={"Organizer"} />
    </Container>
  );
}
