// import {configureStore} from "@reduxjs/toolkit";
import {createStore} from "redux";
import userReducer from './slices/userSlice';
import reducers from './state/index'

export const store = createStore(reducers)
