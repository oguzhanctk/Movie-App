import { Navigation } from "react-native-navigation";
import HomeActions from "../actions/HomeActions";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Screen2 from "./Screen2";
import Initializing from "./Initializing";
import Test from "./test";
import SideMenuTest from "./sideMenuTest";
import { Provider } from "react-redux";
import store from "../reducers/index";

export const registerScreens = () => {
    Navigation.registerComponentWithRedux("Home", () => HomeActions, Provider, store);
    Navigation.registerComponent("SignIn", () => SignIn);
    Navigation.registerComponent("SignUp", () => SignUp);
    Navigation.registerComponent("Screen2", () => Screen2);
    Navigation.registerComponent("Initializing", () => Initializing);
    Navigation.registerComponent("Test", () => Test);
    Navigation.registerComponent("SideMenuTest", () => SideMenuTest);

}