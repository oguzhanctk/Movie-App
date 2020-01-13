import { createStore, applyMiddleware } from "redux";
import HomeReducer from "./HomeReducer";
import thunk from "redux-thunk";

const store = createStore(HomeReducer, applyMiddleware(thunk));

export default store;