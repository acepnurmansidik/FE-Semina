import React, { useState } from "react";
import { Container } from "react-bootstrap";
import From from "./form";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../configs";

const CategoryEdit = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${config.api_host_dev}/cms/categories`,
        { ...form }
      );
      setIsLoading(false);
      navigate("/categories");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };
  return (
    <Container>
      <SBreadcrumb
        textSecound={"Categories"}
        urlSecound={"/categories"}
        textThird={"Edit"}
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <From
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CategoryEdit;
