import { createStore, applyMiddleware, combineReducers } from "redux";
import HomeReducer from "./HomeReducer";
import MovieDetailReducer from "./MovieDetailReducer";
import thunk from "redux-thunk";

const Rootreducers = combineReducers({
    HomeReducer,
    MovieDetailReducer
});

const store = createStore(Rootreducers, applyMiddleware(thunk));

export default store;