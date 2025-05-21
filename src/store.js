import { createStore } from "redux";
import booksReducer from "./booksReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(booksReducer, applyMiddleware(thunk));
export default store;
