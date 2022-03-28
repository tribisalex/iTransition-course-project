import {ADD_COMMENT, GET_COMMENTS} from "../../types";

export const setComments = (comments) => ({type: GET_COMMENTS, comments});
export const addComment = (comment) => ({type: ADD_COMMENT, comment});
