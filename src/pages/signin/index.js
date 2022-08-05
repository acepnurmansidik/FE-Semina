import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

function PageSignin() {
  const [alert, setAlert] = useState(false);

  return (
    <Container className="my-5" md={12}>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert && (
          <Alert variant={"danger"}>This is a alert—check it out!</Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default PageSignin;
