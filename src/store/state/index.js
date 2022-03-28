import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import reviewReducer from "./reviews";
import categoryReducer from "./category";
import userReducer from "../slices/userSlice";
import usersReducer from "./users";
import tagReducer from "./tags";
import commentsReducer from "./comments";

const reducers = combineReducers({
    review: reviewReducer,
    category: categoryReducer,
    tags: tagReducer,
    comments: commentsReducer,
    form: formReducer,
    user: userReducer,
    userMy: usersReducer
    });

export default reducers;