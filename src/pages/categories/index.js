import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import Table from "../../components/TableWithAction";
import { accessCategories } from "../../const/access";
import { fetchCategories } from "../../redux/categories/actions";

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  // Get value from redux
  const categories = useSelector((state) => state.categories);
  const notif = useSelector((state) => state.notif);
  // END GET VALUE FROM REDUX

  //handle function
  const handleDelete = () => {};

  // Access for authenctication
  const checkAccess = () => {
    // chekc access from localstorage "auth"
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // init access
    const access = { tambah: false, hapus: false, delete: false };
    // convert object to array
    Object.keys(accessCategories).map((key) => {
      // cek jika role accessnya sama maka akan mendapatkan access
      if (accessCategories[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });

    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <Container className="mt-5">
        <SBreadcrumb textSecound={"Categories"} />
        {access.tambah && (
          <SButton
            action={() => navigate("/categories/create")}
            children={"Tambah"}
            className={"mb-3"}
          />
        )}

        {/* {notif.status && (
          <SAlert message={notif.message} type={notif.typeNotif} />
        )} */}

        <Table
          status={categories.status}
          thead={["Nama", "Aksi"]}
          data={categories.data}
          tbody={["name"]}
          editUrl={access.edit ? `/categories/edit` : null}
          deleteAction={access.hapus ? (id) => handleDelete(id) : null}
          withoutPagination
        />
      </Container>
    </>
  );
}

export default Categories;
