import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import reviewImg from '../assets/img/reviews/betmen.png'

const Review = (reviewname, rating, imageurl) => {
  return (
    <div>
      <Container className='d-flex flex-column align-items-center justify-content-center'>
        <Row>
          <Col>
            <img src={reviewImg} alt='review-image' style={{width: 200}}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>{reviewname}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            {rating}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Review;