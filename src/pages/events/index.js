import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  setKeyword,
  setCategory,
  setTalent,
} from "../../redux/events/actions";
import { deleteData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/actions";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SelectBox from "../../components/SelectBox";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import STable from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";

const EventPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/events/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfuly delete speaker ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure, Change status",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === "Published" ? "Draft" : "Published",
        };
        const res = await putData(`/cms/events/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            "success",
            `Successfuly change status event ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container className="mt-5">
      <SBreadCrumb textSecound={"Events"} />
      <SButton className={"mb-3"} action={() => navigate("/events/create")}>
        Tambah
      </SButton>
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Search by category"}
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Search by talents"}
            name="talents"
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => dispatch(setTalent(e))}
          />
        </Col>
      </Row>
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <STable
        status={events.status}
        thead={[
          "Title",
          "Date",
          "Venue",
          "Status",
          "Category",
          "Speaker",
          "Action",
        ]}
        data={events.data}
        tbody={[
          "title",
          "date",
          "venueName",
          "statusEvent",
          "categoryName",
          "talentName",
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        customAction={(id, status = "") => {
          return (
            <SButton
              className={"mx-2"}
              variant="primary"
              size={"sm"}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </SButton>
          );
        }}
        withoutPagination
      />
    </Container>
  );
};

export default EventPage;
