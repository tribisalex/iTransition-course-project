import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {setReview, setReviewId, setReviewsPopular} from "../store/state/reviews/actions";
import {REVIEW_ROUTE} from "../utils/const";
import UserRating from "./UserRating";
import {FormattedMessage} from 'react-intl';

const SideBar = () => {
  const reviewsPopular = useSelector(state => state.review.reviewsPopular);
  const reviewsCollectionRef = collection(db, 'reviews');
  const q = query(reviewsCollectionRef, where('userRatingCount', ">=", 4), orderBy('userRatingCount', 'desc'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewsPopular = async () => {
      const data = await getDocs(q);
      dispatch (setReviewsPopular(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getReviewsPopular();
  }, []);

  const handleViewReviewPage = async (id) => {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setReview(docSnap.data()));
      dispatch(setReviewId(id));
    } else {
      console.log("No such document!");
    }
    navigate(REVIEW_ROUTE);
  }

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <Row className='m-3' style={{textAlign: 'center'}}>
        <Col >
          <h4 style={{color: '#ffffff'}}><FormattedMessage id='popular_reviews'/></h4>
        </Col>
      </Row>
      <Row >
        <Col className='d-flex flex-column justify-content-center'>
          {reviewsPopular.map((review, key) => {
            return (
                <div key={key}
                  onClick={() => handleViewReviewPage(review.id)}
                     className='d-flex mb-3 flex-column align-items-center'
                     style={{cursor: 'pointer', }}>
                  <img src={review.imageurl}
                       alt='review'
                       style={{width: '100%', borderRadius: '5px'}}/>
                  <div className='d-flex align-items-center'>
                    <div style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bolder', color: '#ffffff'}} className='me-2'>{review.reviewname} </div>
                    <UserRating  userRating={review.userRatingCount}/>
                  </div>
                </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;