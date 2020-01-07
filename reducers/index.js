import { createStore } from "redux";
import HomeReducer from "./HomeReducer";

const store = createStore(HomeReducer);

export default store;