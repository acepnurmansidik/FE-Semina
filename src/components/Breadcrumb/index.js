import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SBreadcrumb({ textSecound, textThird, urlSecound }) {
  const navigate = useNavigate();
  return (
    <Breadcrumb className="my-2">
      <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
      {!textThird && <Breadcrumb.Item active>{textSecound}</Breadcrumb.Item>}
      {textThird && (
        <Breadcrumb.Item onClick={() => navigate(urlSecound)}>
          {textSecound}
        </Breadcrumb.Item>
      )}
      {textThird && <Breadcrumb.Item active>{textThird}</Breadcrumb.Item>}
    </Breadcrumb>
  );
}
