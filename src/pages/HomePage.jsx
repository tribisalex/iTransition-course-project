import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import SideBar from "../components/SideBar";
import CategoryReviews from "../components/CategoryReviews";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";
import TagsCloud from "../components/TagsCloud";
import {filterReview, setCategoryName, setReview, setReviews} from "../store/state/reviews/actions";
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "../store/state/category/actions";

const HomePage = () => {
  const reviews = useSelector(state => state.review.reviews)
  const categoryName = useSelector(state => state.review.categoryName);
  const reviewsCollectionRef = collection(db, 'reviews');
  const q1 = query(reviewsCollectionRef, orderBy('createdAt', 'desc'));
  const q2 = query(reviewsCollectionRef, where('category', "==", categoryName), orderBy('createdAt', 'desc'));
  const [starRating, setStarRating] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(q1);
      dispatch (setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getReviews();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(q2);
      dispatch (setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getReviews();
  }, [categoryName]);

  // useEffect(() => {
  //   const getReviews = async () => {
  //     const data = await getDocs(q1);
  //     setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //   };
  //   getReviews();
  // }, []);
  //
  // useEffect(() => {
  //   const getReviews = async () => {
  //     const data = await getDocs(q2);
  //     setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //   };
  //   getReviews();
  // }, [categoryName]);

  const handleViewReviewPage = async (id) => {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setReview(docSnap.data()));
    } else {
      console.log("No such document!");
    }
  }

  const handleClickCategory = (category) => {
    dispatch(setCategoryName(category))
  }

  return (
    <Container style={{width: '100%'}}>
      <Row>
        <Col sm style={{border: '2px solid red'}}>
          <CategoryReviews handleClickCategory={handleClickCategory}/>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col sm  style={{border: '2px solid green', textAlign: 'center'}}><TagsCloud/></Col>
      </Row>
      <Row>
        <Col xs={12} md={10}
             style={{border: '2px solid yellow'}}
             className='d-flex flex-row flex-wrap justify-content-around'>
          {reviews.map((review, key) => {
            return (
              <Link key={key} to={`review`} style={{textDecoration: 'none', color: 'black'}}>
              <div onClick={() => handleViewReviewPage(review.id)}
                   className='p-3'
                   style={{textAlign: 'center'}}>
                <img src={review.imageurl} alt='review' style={{width: 200}}/>
                <h3>{review.reviewname}</h3>
                <StarRatings
                rating={Number(review.rating)}
                starRatedColor='blue'
                numberOfStars={5}
                name='rating'
                />
              </div>
              </Link>
            );
          })}
        </Col>
        <Col xs={4} md={2}  style={{backgroundColor: 'pink', border: '2px solid blue'}}><SideBar/></Col>
      </Row>
    </Container>
  )
};

export default HomePage;