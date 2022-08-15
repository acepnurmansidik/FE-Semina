import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import From from "./form";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
// import { setNotif } from "../../redux/notif/actions";

const CategoryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [form, setForm] = useState({
    name: "",
  });

  const fetchOneCategories = async () => {
    const response = await getData(`/cms/categories/${categoryId}`);

    setForm({ ...form, name: response.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const response = await putData(`/cms/category/${categoryId}`, form);

      // dispatch(
      //   setNotif(
      //     true,
      //     "success",
      //     `Successfulyl edit category ${response.data.data.name}`
      //   )
      // );
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
