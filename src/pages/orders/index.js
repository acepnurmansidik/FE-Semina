import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setPage, setDate } from "../../redux/orders/actions";
import formatDate from "../../utils/formatDate";
import DateRange from "../../components/InputDate";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import AlertMessage from "../../components/Alert";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // REDUX
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const orders = useSelector((state) => state.orders);

  const [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/signin");
    };
  });

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ""
  }${orders.date?.endDate ? " - " + formatDate(orders.date.endDate) : ""}`;

  return (
    <Container className="mt-5">
      <BreadCrumb textSecound={"orders"} />
      <Row className="mt-3 mb-2">
        <Col
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ""
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>

      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={orders.status}
        thead={["Name", "Email", "Title", "Event Date", "Order Date", "Venue"]}
        data={orders.data}
        tbody={["name", "email", "title", "date", "orderDate", "venueName"]}
        pages={orders.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
};

export default OrderPage;
