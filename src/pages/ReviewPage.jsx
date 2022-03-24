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
                <Col className='d-flex flex-column justify-content-center' style={{fontWeight: 'bold', fontSize: 20}}>
                  <div className='d-flex' style={{width: '100%'}}>
                    <div className='d-flex justify-content-start mb-2' style={{width: '40%'}}>Date of creation:</div>
                    <div className='d-flex justify-content-start mb-2' style={{width: '60%'}}>{formattedTime}</div>
                  </div>
                  <div className='d-flex' style={{width: '100%'}}>
                    <div className='d-flex justify-content-start mb-2' style={{width: '40%'}}>Category:</div>
                    <div className='d-flex justify-content-start mb-2' style={{width: '60%'}}>{review.category}</div>
                  </div>
                  <div className='d-flex' style={{width: '100%'}}>
                    <div className='d-flex justify-content-start mb-2' style={{width: '40%'}}>TagS:</div>
                    <div className='d-flex justify-content-start mb-2' style={{width: '60%'}}>{tags}</div>
                  </div>
                  <div className='d-flex' style={{width: '100%'}}>
                    <div className='d-flex justify-content-start mb-2' style={{width: '40%'}}>Author rating:</div>
                    <div className='d-flex justify-content-start mb-2' style={{width: '60%'}}>{review.rating}</div>
                  </div>
                </Col>
              </Row>
              <Row className='mt-2 mb-2' style={{textAlign: "justify"}}>
                <div>
                  {review.reviewtext}
                </div>
              </Row>
            </Col>
            <Col md={3}>
              123
            </Col>
          </Row>
    </Container>
  );
};

export default ReviewPage;