/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";
// import checkList from "../../icons/checklist.svg";
// import admin from "../../icons/admin.svg";
// import payment from "../../icons/payment.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListCategories,
  fetchListEvents,
  fetchListTalents,
} from "../../redux/lists/actions";
import Cards from "./cards";

const DashboardPage = () => {
  const dispacth = useDispatch();
  const [menuCart, setMenuCart] = useState({
    categories: null,
    events: null,
    talents: null,
  });
  // REDUX
  const lists = useSelector((state) => state.lists);

  const listMenu = () => {
    const menuCart = { categories: 0, events: 0, talents: 0 };
    Object.keys(menuCart).forEach((key) => {
      if (lists[key].indexOf(key)) {
        menuCart[key] = lists[key];
      }
    });
    setMenuCart(menuCart);
  };

  useEffect(() => {
    listMenu();
  }, []);

  useEffect(() => {
    dispacth(fetchListCategories());
    dispacth(fetchListEvents());
    dispacth(fetchListTalents());
  }, [dispacth]);

  return (
    <>
      <Container className="mt-5">
        <SBreadcrumb />
        <h1 className="mb-5">Dashboard</h1>
        <Row>
          {Object.keys(menuCart).map((key, index) => (
            <Cards count={key.length} title={key} key={index} />
          ))}
        </Row>
        {/* <Row>
          <Col className="d-inline-flex p-2 justify-content-evenly mb-3 card-dashboard">
            <img
              style={{ margin: "1rem" }}
              src={admin}
              height={100}
              width={100}
            />
            <Card style={{ width: "15rem", margin: "1rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>Admins</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>45</h3>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col className="d-inline-flex p-2 justify-content-evenly mb-3 card-dashboard">
            <img
              style={{ margin: "1rem" }}
              src={checkList}
              height={100}
              width={100}
            />
            <Card style={{ width: "15rem", margin: "1rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>Orders</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>45</h3>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col className="d-inline-flex p-2 justify-content-evenly mb-3 card-dashboard">
            <img
              style={{ margin: "1rem" }}
              src={payment}
              height={100}
              width={100}
            />
            <Card style={{ width: "15rem", margin: "1rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>Payments</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>45</h3>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default DashboardPage;
