import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotif } from "../../redux/notif/actions";
import SBreadcrumb from "../../components/Breadcrumb";
import Form from "./form";
import Alert from "../../components/Alert";

const AdminCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  // HANDLER FUNCTION
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await postData("/cms/users", form);

      dispatch(
        setNotif(
          true,
          "success",
          `Successfuly create new admin ${response.data.data.name}`
        )
      );
      setIsLoading(false);
      navigate("/admin");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        type: "danger",
        message: err?.response?.data?.msg,
      });
    }
  };
  return (
    <Container className="mt-5">
      <SBreadcrumb
        textSecound={"Admin"}
        urlSecound={"/admin"}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default AdminCreatePage;
