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
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";

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

  // Access for authenctication
  const checkAccess = () => {
    // chekc access from localstorage "auth"
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // init access
    const access = { tambah: false, hapus: false, delete: false };
    // convert object to array
    // eslint-disable-next-line array-callback-return
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

  //handle function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot revert these changes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/categories/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfuly delete category ${res.data.data.name}`
          )
        );
        dispatch(fetchCategories());
      }
    });
  };
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

        {notif.status && (
          <SAlert message={notif.message} type={notif.typeNotif} />
        )}

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
