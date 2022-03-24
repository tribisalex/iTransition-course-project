import {
  ADD_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW,
  GET_REVIEW,
  GET_REVIEWS, GET_REVIEWS_POPULAR, SET_CATEGORY_NAME,
  SET_REVIEW_ID, SORT_REVIEW
} from '../../types';

export const addReview = (review) => ({type: ADD_REVIEW, review});
export const editReview = (id, name, tags, downloadUrl, category, reviewText, rating) => ({type: EDIT_REVIEW, id, name, tags, downloadUrl, category, reviewText, rating});
export const setReviewId = (reviewId) => ({type: SET_REVIEW_ID, reviewId});
export const setCategoryName = (categoryName) => ({type: SET_CATEGORY_NAME, categoryName});
export const setReview = (review) => ({type: GET_REVIEW, review});
export const setReviews = (reviews) => ({type: GET_REVIEWS, reviews});
export const setReviewsPopular = (reviewsPopular) => ({type: GET_REVIEWS_POPULAR, reviewsPopular});
export const deleteReview = (id) => ({type: DELETE_REVIEW, id});
export const sortReviews = (sortBy, sortOrder) => ({type: SORT_REVIEW, sortBy, sortOrder});




