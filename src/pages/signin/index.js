import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import SForm from "./form";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

const PageSignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useDispatch = setiap kali kita mau ada perubahan di reduxnya

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
    setIsLoading(true);

    const response = await postData(`/cms/auth/signin`, form);
    if (response?.data?.data) {
      dispatch(
        userLogin(
          response.data.data.token,
          response.data.data.role,
          response.data.data.email,
          response.data.data.refreshToken
        )
      );
      navigate("/");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: response?.response?.data?.msg ?? "Internal server error",
        type: "danger",
      });
    }
  };

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
