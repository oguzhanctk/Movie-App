import { createStore, applyMiddleware, combineReducers } from "redux";
import HomePageReducer from "./HomeReducer";
import MovieDetailReducer from "./MovieDetailReducer";
import DiscoverReducer from "./DiscoverReducer";
import GenreReducer from "./GenreReducer";
import thunk from "redux-thunk";

const Rootreducers = combineReducers({
    HomePageReducer,
    MovieDetailReducer,
    DiscoverReducer,
    GenreReducer
});

const store = createStore(Rootreducers, applyMiddleware(thunk));

export default store;