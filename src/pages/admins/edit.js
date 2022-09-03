import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { getData, postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import SBreadcrumb from "../../components/Breadcrumb";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { setNotif } from "../../redux/notif/actions";

const AdminEditPage = () => {
  const { adminId } = useParams();
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

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  // HANDLER FUNCTION
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchOneUserAdmin = async () => {
    const result = await getData(`/cms/users/${adminId}`);
    setForm({
      ...form,
      name: result.data.data.name,
      email: result.data.data.email,
      password: result.data.data.password,
      confirmPassword: result.data.data.password,
    });
  };

  // STATE
  useState(() => {
    fetchOneUserAdmin();
  }, []);

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
        message: err?.message?.data?.msg,
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

export default AdminEditPage;
