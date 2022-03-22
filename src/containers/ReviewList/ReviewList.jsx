import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import AddReviewPage from "../../pages/AddReviewPage";
import {addReviewAC} from "../../store/state/reviews/actions";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {MYPAGE_ROUTE} from "../../utils/const";
import {db} from "../../firebase";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const mapStateToProps = (state) => (
    {
        reviews: state.ReviewList.reviews,
        newReviewText: state.ReviewList.newReviewText
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        // deleteReview: (id) => dispatch(deleteReviewActionCreator(id)),
        // editReview: (id) => dispatch(editReviewActionCreator(id)),
        // saveReview: (id, message) => dispatch(saveReviewActionCreator(id, message)),
        addReview: (userid, reviewname, tags, imageurl, category, reviewtext, rating, createdAt) => dispatch(addReviewAC(userid, reviewname, tags, imageurl, category, reviewtext, rating, createdAt))
    }
)

const ReviewList = ({addReview}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [tags, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const reviewsCollectionRef = collection(db, "reviews");
  const createdAt = serverTimestamp();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeTag = useCallback((e) => {
    setTag(e.target.value);
  }, []);

  const handleChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    console.log(category);
    }, []);

  const handleChangeReviewText = useCallback((e) => {
    setReviewText(e.target.value);
  }, []);

  const handleChangeRating = useCallback((e) => {
    setRating(e.target.value);
  }, []);

  const handleAddReview = async (e) => {
    await addDoc(reviewsCollectionRef, {
      userid: userId,
      reviewname: name,
      tags: tags,
      imageurl: downloadUrl,
      category: category,
      reviewtext: reviewText,
      rating: Number(rating),
      createdAt: createdAt,
    });
    // addReview(userId, name, tags, downloadUrl, category, reviewText, rating, createdAt);
    navigate(MYPAGE_ROUTE)
  };

   // const handleSaveTask = (e) => {
   //      e.preventDefault();
   //      saveTask(Number(e.target.id), value);
   //      console.log(Number(e.target.id));
   //      setValue('');
   //  }
   //
   // const onTaskMarked = (id) => {
   //      taskMarked(id);
   //  }
   //
   // const onDeleteTask = (id) => {
   //      deleteTask(id);
   //  }
   //
   // const onEditTask = (id, message) => {
   //     setValue(message);
   //     editTask(id);
   //  }

  return (
    <div>
      <AddReviewPage handleChangeName={handleChangeName}
                     handleChangeTag={handleChangeTag}
                     handleChangeCategory={handleChangeCategory}
                     handleChangeReviewText={handleChangeReviewText}
                     handleChangeRating={handleChangeRating}
                     handleAddReview={handleAddReview}
                     name={name}
                     tags={tags}
                     downloadUrl={downloadUrl}
                     category={category}
                     reviewText={reviewText}
                     rating={rating}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);