/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accessAdmin } from "../../const/access";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import Table from "../../components/TableWithAction";
import fetchAdmins from "../../redux/admins/actions";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";

const AdminsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  // REDUX
  const admin = useSelector((state) => state.admins);
  const notif = useSelector((state) => state.notif);

  // access for authenticate
  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // init access
    const access = { tambah: false, hapus: false, edit: false };
    // convert to aaray
    Object.keys(accessAdmin).map((key) => {
      // cek jika role accessnya sama maka akan mendapatkan access
      if (accessAdmin[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  useEffect(() => {
    checkAccess();
  }, []);

  // HANDLER
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
        const res = await deleteData(`/cms/users/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfully delete admin ${res.data.data.name}`
          )
        );

        dispatch(fetchAdmins());
      }
    });
  };
  return (
    <Container className="mt-5">
      <SBreadcrumb textSecound={"Admin"} />
      {access.tambah && (
        <SButton className={"mb-3"} action={() => navigate("/admin/create")}>
          Tambah
        </SButton>
      )}
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        thead={["Name", "Email", "Aksi"]}
        tbody={["name", "email"]}
        status={admin.status}
        data={admin.data}
        editUrl={access.edit ? "/admin/edit" : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
};

export default AdminsPage;
