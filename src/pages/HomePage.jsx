import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import SideBar from "../components/SideBar";
import CategoryReviews from "../components/CategoryReviews";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";
import TagsCloud from "../components/TagsCloud";
import {
  setCategoryName,
  setReview, setReviewId,
  setReviews, setTag
} from "../store/state/reviews/actions";
import {useDispatch, useSelector} from "react-redux";
import {REVIEW_ROUTE} from "../utils/const";
import UserRating from "../components/UserRating";

const HomePage = () => {
  const reviews = useSelector(state => state.review.reviews);
  const tag = useSelector(state => state.review.tag);
  const categoryName = useSelector(state => state.review.categoryName);
  const reviewId = useSelector(state => state.review.reviewId);
  const reviewsCollectionRef = collection(db, 'reviews');
  const q1 = query(reviewsCollectionRef, orderBy('createdAt', 'desc'));
  const q2 = query(reviewsCollectionRef, where('category', "==", categoryName), orderBy('createdAt', 'desc'));
  const q3 = query(reviewsCollectionRef, where('tags.value', "array-contains", tag), orderBy('createdAt', 'desc'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(q1);
      dispatch (setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getReviews();
  }, []);

  // useEffect(() => {
  //   const getReviews = async () => {
  //     const data = await getDocs(q3);
  //     dispatch (setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
  //   };
  //   getReviews();
  // }, [tag]);

  const handleViewReviewPage = async (id) => {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setReview(docSnap.data()));
      dispatch(setReviewId(id));
      console.log(reviewId);
    } else {
      console.log("No such document!");
    }
    navigate(REVIEW_ROUTE);
  }

  const handleClickCategory = (category) => {
    dispatch(setCategoryName(category));
    const getReviews = async () => {
      const data = await getDocs(q2);
      dispatch (setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getReviews();
  }

  const handleClickTag = (tag) => {
    dispatch(setTag(tag));
  }

  return (
    <Container>
      <Row lg={12}>
        <Col style={{backgroundColor: '#ffaf00', color: 'white'}}>
          <CategoryReviews handleClickCategory={handleClickCategory}/>
        </Col>
      </Row>
      <Row lg={12} className='d-flex justify-content-center align-items-center'>
        <Col sm  style={{backgroundColor: '#ffffff', textAlign: 'center'}}><TagsCloud handleClickTag={handleClickTag}/></Col>
      </Row>
      <Row lg={12} style={{}} className='d-flex'>
        <Col xs={12} md={8}  lg={8}
             className='d-flex flex-row flex-wrap align-self-start justify-content-center align-items-start'>
          {reviews.map((review, key) => {
            return (
              <div onClick={() => handleViewReviewPage(review.id)}
                   className='d-flex flex-column justify-content-start align-items-center mb-3'
                   style={{textAlign: 'center', cursor: 'pointer'}}>
                <img src={review.imageurl} alt='review' className='w-75' style={{borderRadius: '8px'}}/>
                <div className='d-flex align-items-center' style={{}}>
                  <div className='me-2' style={{fontSize: '18px', fontWeight: 'bolder'}}>{review.reviewname}</div>
                  <UserRating userRating={review.userRatingCount}/>
                </div>
              </div>
             );
          })}
        </Col>
        <Col xs={12} md={4} lg={4} style={{backgroundColor: '#ffaf00'}}>
          <SideBar/>
        </Col>
      </Row>
    </Container>
  )
};

export default HomePage;