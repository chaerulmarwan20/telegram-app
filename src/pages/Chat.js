import React from "react";

import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";

export default function Login() {
  return (
    <section className="chat py-5">
      <Container>
        <Row>
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <h1>Chat</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
