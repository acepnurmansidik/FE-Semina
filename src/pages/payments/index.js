/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import TableWithAction from "../../components/TableWithAction";
import { accessPayments } from "../../const/access";
import { setNotif } from "../../redux/notif/actions";
import { fetchPayments } from "../../redux/payments/actions";
import { deleteData } from "../../utils/fetch";

export default function Payments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // REDUX
  const notif = useSelector((state) => state.notif);
  const payments = useSelector((state) => state.payments);

  const [access, setAccess] = useState({
    lihat: false,
    tambah: false,
    edit: false,
  });

  // Access for authentication
  const checkAccess = () => {
    // check access from localstorage
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const access = { lihat: false, edit: false, tambah: false };
    // convert object to array
    Object.keys(accessPayments).map((key) => {
      if (accessPayments[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });

    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // hanlde function delete
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
        const res = await deleteData(`/cms/payments/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfuly delete payments ${res.data.data}`
          )
        );
        dispatch(fetchPayments());
      }
    });
  };

  return (
    <>
      <Container className="mt-5">
        <SBreadcrumb textSecound={"Payments"} />
        {access.tambah && (
          <SButton
            action={() => navigate("/payments/create")}
            children={"Tambah"}
            className={"mb-3"}
          />
        )}

        {notif.status && (
          <SAlert message={notif.message} type={notif.typeNotif} />
        )}

        <TableWithAction
          status={payments.status}
          thead={["Type", "Avatar", "Aksi"]}
          data={payments.data}
          tbody={["type", "avatar"]}
          editUrl={access.edit ? `/payments/edit` : null}
          deleteAction={access.hapus ? (id) => handleDelete(id) : null}
          withoutPagination
        />
      </Container>
    </>
  );
}
