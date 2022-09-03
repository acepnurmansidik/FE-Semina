/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import categories from "../../icons/category.svg";
import talents from "../../icons/evaluation.svg";
import events from "../../icons/event.svg";

const Cards = ({ count, title }) => {
  return (
    <Col className="d-inline-flex p-2 justify-content-evenly mb-3 card-dashboard">
      <img
        style={{ margin: "1rem" }}
        src={
          title === "categories"
            ? categories
            : title === "talents"
            ? talents
            : title === "events"
            ? events
            : null
        }
        height={100}
        width={100}
      />
      <Card style={{ width: "15rem", margin: "1rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h6>
              {title.replace(/\w\S*/g, function (t) {
                return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
              })}
            </h6>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>{count}</h3>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default Cards;
