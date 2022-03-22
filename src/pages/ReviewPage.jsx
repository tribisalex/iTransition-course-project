import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import SideBar from "../components/SideBar";
import { useSelector} from "react-redux";


const ReviewPage = () => {
  const review = useSelector(state => state.review.review);

  if (review.createdAt) {
    const dateAt = review.createdAt.seconds;
    let unix_timestamp = dateAt;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getMonth() + 1;
    var minutes = "0" + date.getDate();
    var seconds = "0" + date.getFullYear();
    var formattedTime = hours + '/' + minutes.substr(-2) + '/' + seconds.substr(-2);
  }

  const tags = [];
  {review.tags.map((tag) => tags.push(tag.value));}

  return (
    <Container>
          <Row>
            <Col className='d-flex flex-column justify-content-center align-items-center'md={9}>
              <Row>
                <h1>{review.reviewname}</h1>
              </Row>
              <Row className='mt-2 mb-2 d-flex justify-content-center align-items-center' style={{width: '100%'}}>
                <Col className='d-flex justify-content-center align-items-center'>
                  <img src={review.imageurl} alt='review' style={{width: 300}}/>
                </Col>
                <Col>
                  <div>Date: {formattedTime}</div>
                  <div>Category: {review.category}</div>
                  <div className='d-flex'>TagS: {tags}</div>
                  <div>Author rating: {review.rating}</div>
                </Col>
              </Row>
              <Row className='mt-2 mb-2' style={{textAlign: "justify"}}>
                <div>
                  {review.reviewtext}
                </div>
              </Row>
            </Col>
            <Col md={3}>
              <SideBar/>
            </Col>
          </Row>
    </Container>
  );
};

export default ReviewPage;