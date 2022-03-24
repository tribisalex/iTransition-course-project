import {ADD_TAG, GET_TAGS, SET_TAG_COUNT} from "../../types";

export const setTags = (tags) => ({type: GET_TAGS, tags});
export const setTagCount = (id, count) => ({type: SET_TAG_COUNT, id, count});
export const addTag = (tag) => ({type: ADD_TAG, tag});