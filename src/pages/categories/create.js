import React, { useState } from "react";
import { Container } from "react-bootstrap";
import From from "./form";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../configs";
import SNavbar from "../../components/Navbar";

const CategoryCreate = () => {
  const token = localStorage.getItem("token");
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
      await axios.post(
        `${config.api_host_dev}/cms/categories`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    <>
      <SNavbar />
      <Container className="mt-5">
        <SBreadcrumb
          textSecound={"Categories"}
          urlSecound={"/categories"}
          textThird={"Create"}
        />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <From
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default CategoryCreate;
