import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Review from "./Review";
import {REVIEW_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";

const Reviews = (review) => {
  const navigate = useNavigate();

  return (
      <Container>
        <Row className='d-flex flex-row'>
          <Col onClick={()=> navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
          <Col onClick={() => navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
          <Col onClick={() => navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
          <Col onClick={() => navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
          <Col onClick={() => navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
          <Col onClick={() => navigate(REVIEW_ROUTE)}>
            <Review/>
          </Col>
        </Row>
      </Container>
  );
};

export default Reviews;