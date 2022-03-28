import React, {useState} from 'react';
import {Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../firebase";
import {addComment} from "../../store/state/comments/actions";

const CommentsForm = () => {
  const [commentText, setCommentText] = useState('');
  const reviewId = useSelector(state => state.review.reviewId);
  const dispatch = useDispatch();
  const commentsCollectionRef = collection(db, "comments");
  const {user} = useSelector(state => state.userMy.user);

  const handleAddComment = async () => {
    const comment = await addDoc(commentsCollectionRef, {
      commentText: commentText,
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      reviewId: reviewId,
      createdAt: serverTimestamp(),
    });
    dispatch(addComment({
      id: comment.id,
      commentText: commentText,
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      reviewId: reviewId,
      createdAt: serverTimestamp()}));
    setCommentText('')
  };

  return (
    <Container>
        <Form className='d-flex justify-content-center align-items-center'>
          <FloatingLabel controlId="floatingInput"
                         className='m-2'
                         label="Comments..."
          style={{width: '100%'}}>
            <Form.Control as="textarea"
                          rows={3}
                          placeholder='Comments...'
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}/>
          </FloatingLabel>
          <Button variant={"outline-primary"}
                  className='m-2'
          onClick={handleAddComment}>Send</Button>
        </Form>
    </Container>
  );
};

export default CommentsForm;