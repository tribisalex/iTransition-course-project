import {ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, GET_REVIEW, GET_REVIEWS, SAVE_REVIEW, SET_REVIEW_ID} from '../../types';

const initialState = {
  reviews: [],
  review: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
  reviewId: '',
};

const reviewReducer = (state = initialState, action) => {
  console.log('action:', action)
  switch (action.type) {

    case GET_REVIEWS:
      return {...state, reviews: action.reviews}

    case GET_REVIEW:
      return {...state, review: action.review}

    case ADD_REVIEW:
      return {
        ...state, reviews: [
          ...state.reviews,
          action.review
        ]
      }

    case EDIT_REVIEW:
      return {...state,
        reviews: state.reviews.map((review) => review.id === action.id
          ? {
            ...review,
            reviewname: action.name,
            tags: action.tags,
            imageurl: action.downloadUrl,
            category: action.category,
            reviewtext: action.reviewText,
            rating: action.rating
          }
          : review)
      };

    case SET_REVIEW_ID:
      return {...state, reviewId: action.reviewId}

    case DELETE_REVIEW: {
      return {...state, reviews: state.reviews.filter((review) => review.id !== action.id)
      }
    }

    default:
      return state;
  }
};

export default reviewReducer;