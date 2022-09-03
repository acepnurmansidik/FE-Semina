import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

const AdminForm = ({ form, handleChange, handleSubmit, isLoading, edit }) => {
  return (
    <Form className="mb-2">
      <TextInputWithLabel
        placeholder={"Masukan nama admin"}
        label={"Nama admin"}
        name={"name"}
        value={form.name}
        type={"text"}
        onChange={handleChange}
        controlId="formName"
      />
      <TextInputWithLabel
        placeholder={"Masukan email admin"}
        label={"Email admin"}
        name={"email"}
        value={form.email}
        type={"email"}
        onChange={handleChange}
        controlId="formEmail"
      />
      <TextInputWithLabel
        placeholder={"Masukan password admin"}
        label={"Password admin"}
        name={"password"}
        value={form.password}
        type={"password"}
        onChange={handleChange}
        controlId="formPassword"
      />
      <TextInputWithLabel
        placeholder={"Masukan confirm password admin"}
        label={"Confirm password admin"}
        name={"confirmPassword"}
        value={form.confirmPassword}
        type={"password"}
        onChange={handleChange}
        controlId="formconfirmPassword"
      />
      <SButton variant={"primary"} action={handleSubmit} loading={isLoading}>
        {edit ? "Edit" : "Simpan"}
      </SButton>
    </Form>
  );
};

export default AdminForm;
