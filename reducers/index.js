import { createStore, applyMiddleware, combineReducers } from "redux";
import HomeReducer from "./HomeReducer";
import MovieDetailReducer from "./MovieDetailReducer";
import DiscoverReducer from "./DiscoverReducer";
import thunk from "redux-thunk";

const Rootreducers = combineReducers({
    HomeReducer,
    MovieDetailReducer,
    DiscoverReducer
});

const store = createStore(Rootreducers, applyMiddleware(thunk));

export default store;