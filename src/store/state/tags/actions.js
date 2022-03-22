import {
  GET_CATEGORIES,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  EDIT_CATEGORY, ADD_CATEGORY, SORT_CATEGORY, ADD_TAG, GET_TAGS
} from "../../types";

export const setTags = (tags) => ({type: GET_TAGS, tags});
// export const deleteCategory = (id) => ({type: DELETE_CATEGORY, id});
// export const editCategory = (id, text) => ({type: EDIT_CATEGORY, id, text});
export const addTag = (tag) => ({type: ADD_TAG, tag});
// export const sortCategory = (sortBy, sortOrder) => ({type: SORT_CATEGORY, sortBy, sortOrder});
