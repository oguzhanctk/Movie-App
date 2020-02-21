import { Navigation } from "react-native-navigation";
import { registerScreens } from "./navigation/screens";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root : {
      component : {
        name : "Initializing",
        options : {
          layout : {
            orientation : ["portrait"]
          }
        }
      },
    }
  });
});