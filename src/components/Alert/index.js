import React from "react";
import { Alert } from "react-bootstrap";

const SAlert = ({ message, type }) => {
  return <Alert variant={type}>{message}</Alert>;
};

export default SAlert;
