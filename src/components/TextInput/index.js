import React from "react";
import { Form } from "react-bootstrap";

const TextInput = ({ name, value, type, onChange, placeholder }) => {
  return (
    <Form.Control
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};
export default TextInput;
