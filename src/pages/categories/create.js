import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "./form";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
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
    const response = await postData("/cms/categories", form);
    if (response?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `Success create new category ${response.data.data.name}`
        )
      );
      setIsLoading(false);
      navigate("/categories");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        type: "danger",
        message: response?.response?.data?.msg.split(",")[0],
      });
    }
  };
  return (
    <>
      <Container className="mt-5">
        <SBreadcrumb
          textSecound={"Categories"}
          urlSecound={"/categories"}
          textThird={"Create"}
        />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <Form
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
