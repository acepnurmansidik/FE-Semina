import React from "react";
import { Figure, Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { config } from "../../configs";

export default function SpeakersForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Insert speaker"}
        label={"Nama"}
        name={"name"}
        value={form.name}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Insert role"}
        label={"Role"}
        name={"role"}
        value={form.role}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Insert avatar"}
        label={"Avatar"}
        name={"avatar"}
        type="file"
        onChange={handleChange}
      />
      {form.avatar !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={`${config.api_image}/${form.avatar}`}
            />
            <Figure.Caption>
              <i>*Preview image avatar</i>
            </Figure.Caption>
          </Figure>
        </div>
      )}
      <SButton variant={"primary"} action={handleSubmit} loading={isLoading}>
        {edit ? "Edit" : "Simpan"}
      </SButton>
    </Form>
  );
}
