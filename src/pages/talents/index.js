import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import { accessTalents } from "../../const/access";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SSearchInput from "../../components/SearchInput";
import Table from "../../components/TableWithAction";

export default function TalentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // REDUX
  const notif = useSelector((state) => state.notif);
  const talents = useSelector((state) => state.talents);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const access = { tambah: false, edit: false, hapus: false };
    Object.keys(accessTalents).forEach((key) => {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't revert these change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfuly delete speaker ${res.data.data.name}`
          )
        );
        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className="mt-5">
      <SBreadcrumb textSecound={"Talents"} />
      {access.tambah && (
        <div className="mb-3">
          <SButton action={() => navigate("/talents/create")}>Tambah</SButton>
        </div>
      )}
      <SSearchInput
        className={"mb-3"}
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={talents.status}
        thead={["Nama", "Role", "Avatar", "Aksi"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
