import {
  ADD_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW, EDIT_USER_RATING_REVIEW, FILTER_REVIEW_CATEGORY,
  GET_REVIEW,
  GET_REVIEWS, GET_REVIEWS_POPULAR, SET_CATEGORY_NAME,
  SET_REVIEW_ID, SET_TAG, SORT_REVIEW
} from '../../types';

export const addReview = (review) => ({type: ADD_REVIEW, review});
export const editReview = (id, name, tags, downloadUrl, category, reviewText, rating) => ({type: EDIT_REVIEW, id, name, tags, downloadUrl, category, reviewText, rating});
export const setReviewId = (reviewId) => ({type: SET_REVIEW_ID, reviewId});
export const setCategoryName = (categoryName) => ({type: SET_CATEGORY_NAME, categoryName});
export const setReview = (review) => ({type: GET_REVIEW, review});
export const setReviews = (reviews) => ({type: GET_REVIEWS, reviews});
export const setReviewsPopular = (reviewsPopular) => ({type: GET_REVIEWS_POPULAR, reviewsPopular});
export const deleteReview = (id) => ({type: DELETE_REVIEW, id});
export const filterReviewCategory = (category) => ({type: FILTER_REVIEW_CATEGORY, category});
export const sortReviews = (sortBy, sortOrder) => ({type: SORT_REVIEW, sortBy, sortOrder});
export const setTag = (tag) => ({type: SET_TAG, tag});
export const editUserRatingCount = (id, userRatingCount) => ({type: EDIT_USER_RATING_REVIEW, id, userRatingCount});




