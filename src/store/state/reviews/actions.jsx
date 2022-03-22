import {ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, GET_REVIEW, GET_REVIEWS, SAVE_REVIEW, SET_REVIEW_ID} from '../../types';

export const addReview = (review) => ({type: ADD_REVIEW, review});
export const editReview = (id, name, tags, downloadUrl, category, reviewText, rating) => ({type: EDIT_REVIEW, id, name, tags, downloadUrl, category, reviewText, rating});
export const setReviewId = (reviewId) => ({type: SET_REVIEW_ID, reviewId});
export const setReview = (review) => ({type: GET_REVIEW, review});
export const setReviews = (reviews) => ({type: GET_REVIEWS, reviews});
export const deleteReview = (id) => ({type: DELETE_REVIEW, id});




