import {ADD_USER, DELETE_USER, EDIT_USER, GET_USER, GET_USERS, SET_CURRENT_LOCALE, SET_USER_LOCALE} from '../../types';

const initialState = {
  users: [],
  user: [],
  currentLocale: 'en-US',
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}

    case GET_USER:
      return {...state, user: action.user}

    case ADD_USER:
      return {
        ...state, users: [
          ...state.users,
          action.user
        ]
      }

    case SET_CURRENT_LOCALE:
      return {...state, currentLocale: action.locale}

    case SET_USER_LOCALE:
      return {...state,
        users: state.users.map((user) => user.id === action.id
          ? {
            ...user, locale: action.locale
          }
          : user)
      };

    case EDIT_USER:
      return {...state,
        users: state.users.map((user) => user.id === action.id
          ? {
            ...user,
            reviewname: action.name,
            tags: action.tags,
            imageurl: action.downloadUrl,
            category: action.category,
            reviewtext: action.reviewText,
            rating: action.rating
          }
          : user)
      };

    case DELETE_USER: {
      return {...state, users: state.users.filter((user) => user.id !== action.id)
      }
    }

    default:
      return state;
  }
};

export default usersReducer;