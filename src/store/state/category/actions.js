import {
  GET_CATEGORIES,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  EDIT_CATEGORY, ADD_CATEGORY, SORT_CATEGORY
} from "../../types";

export const setCategories = (categories) => ({type: GET_CATEGORIES, categories});
export const deleteCategory = (id) => ({type: DELETE_CATEGORY, id});
export const editCategory = (id, text) => ({type: EDIT_CATEGORY, id, text});
export const addCategory = (category) => ({type: ADD_CATEGORY, category});
export const sortCategory = (sortBy, sortOrder) => ({type: SORT_CATEGORY, sortBy, sortOrder});
