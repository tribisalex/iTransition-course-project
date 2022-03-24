import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";
import {useDispatch, useSelector} from "react-redux";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {setReviews} from "../store/state/reviews/actions";

const SideBar = () => {
  const reviews = useSelector(state => state.review.reviews);
  console.log('Sidebar Review: ', reviews)
  const reviewsCollectionRef = collection(db, 'reviews');
  const [starRating, setStarRating] = useState();
  const dispatch = useDispatch();

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center' style={{}}>
      <Row style={{textAlign: 'center'}}>
        <Col >
          <h4>Popular reviews</h4>
        </Col>
      </Row>

      <Row >
        <Col xs={12} md={10}
             style={{width: '100%'}}
             className='d-flex flex-column justify-content-center'>
          {reviews.map((review, key) => {
            return (
              <Link key={key} to={`review`} style={{textDecoration: 'none', color: 'black'}} >
                <div className='d-flex flex-column align-items-center' style={{}}>
                  <img src={review.imageurl} alt='review' style={{width: 150}}/>
                  <h4 style={{textAlign: 'center'}}>{review.reviewname}</h4>
                </div>
              </Link>
            );
          })}
        </Col>
      </Row>

    </Container>
  );
};

export default SideBar;