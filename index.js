/**
 * @format
 */


import { Navigation } from "react-native-navigation";
import { registerScreens } from "./navigation/screens";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root : {
      component : {
        name : "Initializing"
      }
    }
  });
});