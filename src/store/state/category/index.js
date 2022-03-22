import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES, SORT_CATEGORY
} from "../../types";

const initState = {
  categories: [],
  sortBy: 'categoryname',
  sortOrder: 'desc'
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {...state, categories: action.categories }

    case ADD_CATEGORY:
      return {...state, categories: [
        ...state.categories,
          action.category
        ]}

    case SORT_CATEGORY:
      return {...state, sortBy: action.sortBy, sortOrder: action.sortOrder}

    case DELETE_CATEGORY:
      return {...state, categories: state.categories.filter((category) => category.id !== action.id) }

    case EDIT_CATEGORY:
      return {...state, categories: state.categories.map((category) => category.id === action.id ? {...category, categoryname: action.text} : category) }

    default:
      return state;
  }
};

export default categoryReducer;