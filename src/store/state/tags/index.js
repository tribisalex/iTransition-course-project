import {
  ADD_CATEGORY, ADD_TAG,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES, GET_TAGS, SET_TAG_COUNT, SORT_CATEGORY
} from "../../types";

const initState = {
  tags: [],
  sortBy: 'categoryname',
  sortOrder: 'desc'
}

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {...state, tags: action.tags }

    case ADD_TAG:
      return {...state, tags: [
        ...state.tags,
          action.tag
        ]}

    case SET_TAG_COUNT:
      return {...state, tags: state.tags.map((tag) => tag.id === action.id ? {...tag, count: action.count} : tag) }

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

export default tagReducer;