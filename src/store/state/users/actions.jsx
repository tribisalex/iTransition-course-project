import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
  GET_USERS,
  SET_CURRENT_LOCALE,
  SET_USER_LOCALE,
  SET_USER_THEME
} from '../../types';

export const addUser = (user) => ({type: ADD_USER, user});
export const editUser = (id, name, tags, downloadUrl, category, reviewText, rating) => ({type: EDIT_USER, id, name, tags, downloadUrl, category, reviewText, rating});
export const setUserLocale = (locale) => ({type: SET_USER_LOCALE, locale});
export const setCurrentLocale = (locale) => ({type: SET_CURRENT_LOCALE, locale});
export const setUserTheme = (theme) => ({type: SET_USER_THEME, theme});
export const setUserMy = (user) => ({type: GET_USER, user});
export const setUsers = (users) => ({type: GET_USERS, users});
export const deleteUser = (id) => ({type: DELETE_USER, id});







