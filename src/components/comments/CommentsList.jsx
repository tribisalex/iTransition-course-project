import React, {useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../firebase";
import {setComments} from "../../store/state/comments/actions";

const CommentsList = () => {
  const comments = useSelector(state => state.comments.comments);
  const reviewId = useSelector(state => state.review.reviewId);
  const dispatch = useDispatch();
  const commentsCollectionRef = collection(db, "comments");
  const q = query(commentsCollectionRef, where('reviewId', '==', reviewId), orderBy('createdAt', 'asc'));

  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(q);
      if (data) {
        dispatch(setComments(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
      }
    };
    getComments();
  }, []);

  return (
    <Container>
      <Row>
        {
          comments.map((comment, key) => {
              return (
                <div key={key} className='d-flex flex-column mb-2 mt-2'>
                  <div style={{color: 'red', fontWeight: 'bold'}}>{comment.userEmail}</div>
                  <div style={{color: '#ffffff'}}>{comment.commentText}</div>
                </div>
              )
            }
          )
        }
      </Row>
    </Container>
  );
};

export default CommentsList;