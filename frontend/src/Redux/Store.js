import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";



export const store = legacy_createStore(applyMiddleware(thunk));