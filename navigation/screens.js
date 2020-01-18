import { Navigation } from "react-native-navigation";
import HomeActions from "../actions/HomeActions";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Library from "./Components/Library";
import Initializing from "./Components/Initializing";
import SideMenuTest from "./Components/sideMenuTest";
import { Provider } from "react-redux";
import store from "../reducers/index";
import DiscoverActions from "../actions/DiscoverActions";
import MovieDetailActions from "../actions/MovieDetailActions";

export const registerScreens = () => {
    Navigation.registerComponentWithRedux("Home", () => HomeActions, Provider, store);
    Navigation.registerComponent("SignIn", () => SignIn);
    Navigation.registerComponent("SignUp", () => SignUp);
    Navigation.registerComponent("Library", () => Library);
    Navigation.registerComponent("Initializing", () => Initializing);
    Navigation.registerComponentWithRedux("Discover", () => DiscoverActions, Provider, store);
    Navigation.registerComponent("SideMenuTest", () => SideMenuTest);
    Navigation.registerComponentWithRedux("MovieDetail", () => MovieDetailActions, Provider, store);

}