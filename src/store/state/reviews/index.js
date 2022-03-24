import {
  ADD_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW,
  GET_REVIEW,
  GET_REVIEWS, GET_REVIEWS_POPULAR,
  SET_CATEGORY_NAME,
  SET_REVIEW_ID,
  SORT_REVIEW
} from '../../types';

const initialState = {
  reviews: [],
  reviewsPopular: [],
  review: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
  reviewId: '',
  categoryName: '%',
};

const reviewReducer = (state = initialState, action) => {
  console.log('action:', action)
  switch (action.type) {

    case GET_REVIEWS:
      return {...state, reviews: action.reviews}

    case GET_REVIEW:
      return {...state, review: action.review}

    case GET_REVIEWS_POPULAR:
      return {...state, reviewsPopular: action.reviewsPopular}

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

    case SET_CATEGORY_NAME:
      return {...state, categoryName: action.categoryName}

    case DELETE_REVIEW: {
      return {...state, reviews: state.reviews.filter((review) => review.id !== action.id)
      }
    }

    case SORT_REVIEW:
      return {...state, sortBy: action.sortBy, sortOrder: action.sortOrder}

    default:
      return state;
  }
};

export default reviewReducer;