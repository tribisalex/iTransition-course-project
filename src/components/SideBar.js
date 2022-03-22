import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const SideBar = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 65}}>
      <Row>
        <Col>
          SideBar
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;