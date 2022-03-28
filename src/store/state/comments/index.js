import {ADD_COMMENT, GET_COMMENTS} from "../../types";

const initState = {
  comments: [],
  sortBy: 'createdAt',
  sortOrder: 'desc'
}

const commentsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {...state, comments: action.comments }

    case ADD_COMMENT:
      return {...state, comments: [
        ...state.comments,
          action.comment
        ]}

    default:
      return state;
  }
};

export default commentsReducer;