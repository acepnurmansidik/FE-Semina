import axios from "axios";
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import SForm from "./form";
import SAlert from "../../components/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import { config } from "../../configs";

const PageSignin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        {
          ...form,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      setIsLoading(true);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Internal server error",
        type: "danger",
      });
    }
  };

  if (token) return <Navigate to={"/"} replace={true} />;
  return (
    <Container className="my-5" md={12}>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>

      <Card>
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleOnChange}
            isLoading={isLoading}
            handleSubmit={handleOnSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PageSignin;
