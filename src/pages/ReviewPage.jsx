import React, {useState} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import UserRating from "../components/UserRating";
import CommentsForm from "../components/comments/CommentsForm";
import {useAuth} from "../hooks/use-auth";
import CommentsList from "../components/comments/CommentsList";
import {FormattedMessage} from 'react-intl';
import ReactMarkdown from 'react-markdown';
import Button from "react-bootstrap/Button";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import {getAuth} from "firebase/auth";
import {editUserRatingCount} from "../store/state/reviews/actions";

const ReviewPage = () => {
  const {isAuth} = useAuth();
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [userRatingNew, setUserRatingNew] = useState();
  const dispatch = useDispatch();
  const review = useSelector(state => state.review.review);
  const reviewId = useSelector(state => state.review.reviewId);

  if (review.createdAt) {
    const dateAt = review.createdAt.seconds;
    let unix_timestamp = dateAt;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getMonth() + 1;
    var minutes = "0" + date.getDate();
    var seconds = "0" + date.getFullYear();
    var formattedTime = hours + '/' + minutes.substr(-2) + '/' + seconds.substr(-2);
  }

  const handleUserRatingChange = async (id, userRating) => {
    const userRatingSet = Number((Number(userRating) + Number(userRatingNew)) / 2);
    const reviewDoc = doc(db, 'reviews', id);
    const newUserRating = { userRatingCount: userRatingSet};
    await updateDoc(reviewDoc, newUserRating);
    dispatch(editUserRatingCount(id, Number(userRatingSet)));
    setUserRatingNew(0);
  }

  const tags = [];
  {review.tags.map((tag) => tags.push(tag.value, ' | '));}

  const scores = [0,1,2,3,4,5]

  return (
    <Container>
          <Row>
            <Col className='d-flex flex-column flex-wrap justify-content-start align-items-center' lg={12} md={12}>
              <Row  style={{width: '100%'}}>
                <div className='d-flex justify-content-center align-items-center'>
                  <h1 className='me-2'>{review.reviewname}</h1>
                  <UserRating userRating={review.userRatingCount} />
                </div>
              </Row>
              <Row className='mt-2 mb-2 d-flex flex-wrap justify-content-center align-items-center' style={{width: '100%'}}>
                <Col className='d-flex justify-content-center align-items-center' sm={12} md={6}>
                  <img src={review.imageurl} alt='review'  style={{borderRadius: '5px'}}/>
                </Col>
                <Col className='d-flex flex-column justify-content-center align-items-md-start align-items-center'
                     style={{fontWeight: 'bold', fontSize: 20}}>
                  <div className='d-flex'>
                    <div className='d-flex justify-content-start mb-2 me-2' lg={6} md={12} style={{}}><FormattedMessage id='date_of_creation'/>:</div>
                    <div className='d-flex justify-content-start mb-2' lg={6} md={12} style={{fontWeight: 'bolder', color: 'blue'}}>{formattedTime}</div>
                  </div>
                  <div className='d-flex'>
                    <div className='d-flex justify-content-start mb-2 me-2' lg={6} md={12} style={{}}><FormattedMessage id='category'/>:</div>
                    <div className='d-flex justify-content-start mb-2' lg={6} md={12} style={{fontWeight: 'bolder', color: 'blue'}}>{review.category}</div>
                  </div>
                  <div className='d-flex'>
                    <div className='d-flex justify-content-start mb-2 me-2' lg={6} md={12} style={{}}><FormattedMessage id='tags'/>:</div>
                    <div className='d-flex justify-content-start mb-2' lg={6} md={12} style={{fontWeight: 'bolder', color: 'blue'}}>{tags}</div>
                  </div>
                  <div className='d-flex'>
                    <div className='d-flex justify-content-start mb-2 me-2' lg={6} md={12} style={{}}><FormattedMessage id='author_rating'/>:</div>
                    <div className='d-flex justify-content-start mb-2' lg={6} md={12} style={{fontWeight: 'bolder', color: 'blue'}}>{review.rating}</div>
                  </div>
                  <div className='d-flex'>
                    <div className='d-flex justify-content-start mb-2 me-2' lg={6} md={12} style={{}}><FormattedMessage id='user_rating'/>:</div>
                    <div className='d-flex justify-content-start mb-2' lg={6} md={12} style={{fontWeight: 'bolder', color: 'blue'}}>{review.userRatingCount}</div>
                  </div>
                  {
                    isAuth
                    ? <div className='d-flex align-items-center'>
                        <div className='mb-2 me-2'style={{}}>
                          <FormattedMessage id='rate_the_review'/>:
                        </div>
                        <div className='d-flex justify-content-start mb-2' style={{fontWeight: 'bolder', color: 'blue'}}>
                          <Form.Select className='mt-2 me-2'
                                       aria-label="select"
                                       value={userRatingNew}
                                       onChange={(e) => setUserRatingNew(e.target.value)}>
                            {scores.map((score, key) => {
                              return (
                                <option key={key} value={score}>{score}</option>
                              )
                            })}
                          </Form.Select>
                        </div>
                        <Button variant={"outline-primary"}
                                className=''
                                onClick={() => handleUserRatingChange(reviewId, review.userRatingCount)}>
                          <FormattedMessage id='rate'/>
                        </Button>
                      </div>
                      : null
                  }

                </Col>
              </Row>
              <Row className='w-100 m-2'>
                 <ReactMarkdown children={review.reviewtext}/>
              </Row>
              {
                isAuth
                  ?
                  <Row style={{width: '100%'}}>
                    <Card  style={{backgroundColor: '#ffaf00'}}>
                      <div>

                      </div>
                      <div style={{fontSize: '18px', textAlign: 'center', fontWeight: 'bold', color: '#ffffff'}}
                           className='mb-2 mt-2'>Comments</div>
                      <CommentsList />
                      <CommentsForm/>
                    </Card>
                  </Row>
                  : null
              }
            </Col>
          </Row>
    </Container>
  );
};

export default ReviewPage;