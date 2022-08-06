import React from "react";
import { Form } from "react-bootstrap";
import TextInput from "../TextInput";

const TextInputWithLabel = ({
  name,
  value,
  type,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <TextInput
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default TextInputWithLabel;
