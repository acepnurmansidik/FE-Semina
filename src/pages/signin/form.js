import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

const SForm = ({ form, handleChange, isLoading, handleSubmit }) => {
  return (
    <Form>
      <TextInputWithLabel
        label={"Email"}
        name="email"
        vallue={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Enter email"
      />

      <TextInputWithLabel
        label={"Password"}
        name="password"
        vallue={form.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <SButton
        loading={isLoading}
        disabled={isLoading}
        variant="primary"
        action={handleSubmit}
      >
        Submit
      </SButton>
    </Form>
  );
};

export default SForm;
