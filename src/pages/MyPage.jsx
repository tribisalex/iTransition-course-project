import React, {useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import del from '../assets/img/delete.png';
import edit from '../assets/img/edit.png';
import viewing from '../assets/img/viewing.png';
import {useNavigate} from "react-router-dom";
import {ADDREVIEWPAGE_ROUTE, CATEGORIES_ROUTE, REVIEW_ROUTE} from "../utils/const";
import Table from "react-bootstrap/Table";
import {getAuth} from "firebase/auth";
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {deleteReview, setReview, setReviewId, setReviews} from "../store/state/reviews/actions";
import {FormattedMessage} from 'react-intl'

const MyPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews)
  const userId = auth.currentUser.uid;
  const reviewId = useSelector(state => state.review.reviewId)

  const reviewsCollectionRef = collection(db, 'reviews');
  const q = query(reviewsCollectionRef, where('userid', "==", userId), orderBy('createdAt', 'desc'));

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(q);
        dispatch(setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    };
    getReviews();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "reviews", reviewId ? reviewId : '1');
    const getReview = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setReview({...docSnap.data()}));
      } else {
        console.log("No such document!");
      }
    }
    getReview();
  },[reviewId]);

  const handleViewReviewPage = async (id) => {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setReview(docSnap.data()));
    } else {
      console.log("No such document!");
    }
    navigate(REVIEW_ROUTE);
  };

  const handleDeleteReview = async (id) => {
    const reviewDoc = doc(db, 'reviews', id);
    await deleteDoc(reviewDoc);
    dispatch(deleteReview(id));
  };

  const handleChangeReviewId = async (id) => {
    dispatch(setReviewId(id));
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setReview({...docSnap.data()}));
    }
    navigate(ADDREVIEWPAGE_ROUTE);
  }

  const changeAddReviewPage = () => {
    dispatch(setReviewId(''));
    navigate(ADDREVIEWPAGE_ROUTE);
  }

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center' lg>
      <Row>
        <Col style={{textAlign: 'center'}} className='m-1'>
          <h1><FormattedMessage id='my_page'/></h1>

        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: 'center'}} className='m-1'>
          <Button variant="outline-primary" onClick={changeAddReviewPage}><FormattedMessage id='add_review'/></Button>
        </Col>
      </Row>
      <Row style={{width: '100%'}}>
        <Table responsive="md" hover style={{textAlign: 'center'}}>
          <thead>
          <tr>
            <th><FormattedMessage id='name_review'/></th>
            <th><FormattedMessage id='date'/></th>
            <th><FormattedMessage id='category'/></th>
            <th><FormattedMessage id='edit'/></th>
            <th><FormattedMessage id='del'/></th>
            <th><FormattedMessage id='View'/></th>
          </tr>
          </thead>
          <tbody>
          {reviews.map((review) => {

            if (review.createdAt) {
              const dateAt = review.createdAt.seconds;
              let unix_timestamp = dateAt;
              var date = new Date(unix_timestamp * 1000);
              var hours = date.getMonth() + 1;
              var minutes = "0" + date.getDate();
              var seconds = "0" + date.getFullYear();
              var formattedTime = hours + '/' + minutes.substr(-2) + '/' + seconds.substr(-2);
            }
            const reviewId = review.id;
            return (
              <tr key={reviewId}>
                <td style={{width: '30%', textAlign: 'left'}}>{review.reviewname}</td>
                <td style={{width: '10%'}}>{formattedTime}</td>
                <td style={{width: '20%'}}>{review.category}</td>
                <td style={{width: '5%'}}><img src={edit}
                                               alt='edit-review'
                                               style={{width: 20, cursor: 'pointer'}}
                                               onClick={() => handleChangeReviewId(review.id)}/></td>
                <td style={{width: '5%'}}><img src={del}
                                               alt='delete-review'
                                               style={{width: 20, cursor: 'pointer'}}
                                               onClick={() => handleDeleteReview(review.id)}/></td>
                <td style={{width: '5%'}}><img src={viewing}
                                               alt='viewing-review'
                                               style={{width: 20, cursor: 'pointer'}}
                                               onClick={() => handleViewReviewPage(review.id)}/>
                </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
      </Row>
      {/*<Card className="p-2" >*/}
      {/*  <Form className='d-flex justify-content-center align-items-center'>*/}
      {/*    <FloatingLabel controlId="floatingInput" label="Name category">*/}
      {/*      <Form.Control*/}
      {/*        placeholder='Name category'*/}
      {/*        value={category}*/}
      {/*        onChange={e => setCategory(e.target.value)}*/}
      {/*      />*/}
      {/*    </FloatingLabel>*/}
      {/*    <Button variant={"outline-primary"} className='m-2' onClick={addCategory}>Add category</Button>*/}
      {/*  </Form>*/}
      {/*</Card>*/}
          <Button variant={"outline-primary"}
                  className='m-2'
                  onClick={() => navigate(CATEGORIES_ROUTE)}>
            <FormattedMessage id='add_category'/>
          </Button>
    </Container>
  );
};

export default MyPage;