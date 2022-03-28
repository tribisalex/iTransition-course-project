import {
  ADD_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW, EDIT_USER_RATING_REVIEW, FILTER_REVIEW_CATEGORY,
  GET_REVIEW,
  GET_REVIEWS,
  GET_REVIEWS_POPULAR,
  SET_CATEGORY_NAME,
  SET_REVIEW_ID, SET_TAG,
  SORT_REVIEW
} from '../../types';

const initialState = {
  reviews: [],
  reviewsPopular: [],
  review: [
    {
      id: 'Xmw7oy2hwsWfdKDv0nbT',
      category: "Movies",
      createdAt: 'March 23, 2022 at 8:15:25 PM UTC+3',
      imageurl: "https://firebasestorage.googleapis.com/v0/b/itransition-cource-687b2.appspot.com/o/images%2Fsvoya-voyna-56-1633974389.png?alt=media&token=2ad6e37a-6376-47ef-9a64-bc758a0f5f4d",
      rating: 4,
      reviewname: "Своя война",
      reviewtext: "123 123 123 123 123 123 123 1233 123",
      tags: [
        {id: '3gTOLYZLXrFIW8IRXhJu', count: 0, label: "Новинка", value: "Новинка"},
        {id: '8iGZR6g5I7h3k9FPkqNH', count: 2, label: "Hi", value: "Hi"}
        ]
    }
  ],
  sortBy: 'createdAt',
  sortOrder: 'desc',
  reviewId: 'Xmw7oy2hwsWfdKDv0nbT',
  categoryName: '',
  tag: '',
};

const reviewReducer = (state = initialState, action) => {
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

    case EDIT_USER_RATING_REVIEW:
      return {...state,
        reviews: state.reviews.map((review) => review.id === action.id
          ? {
            ...review,
            userRatingCount: action.userRatingCount
          }
          : review)
      };

    case SET_TAG:
      return {
        ...state, tag: action.tag
      }

    case SET_REVIEW_ID:
      return {...state, reviewId: action.reviewId}

    case SET_CATEGORY_NAME:
      return {...state, categoryName: action.categoryName}

    case FILTER_REVIEW_CATEGORY:
      return {
        ...state, reviews: state.reviews.filter((review) => review.category === action.category)
      }

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