import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";
import { goHome, goToAuth, goTosideMenuLayout, goToMainLayout } from "../navigation";
import { USER_KEY } from "../config";
import { Navigation } from "react-native-navigation";
import SplashScreen from "react-native-splash-screen";
import { Auth } from "aws-amplify";

class Initializing extends Component {
  
    componentDidMount = () => {
        if(Auth.currentAuthenticatedUser) {
            SplashScreen.hide();
            goToMainLayout();
        } else {
            goToAuth();
        }
    }

    render() {
        return(
            <View style = {{flex : 1, backgroundColor : "red", justifyContent : "center", alignItems : "center"}}>
                 <Text>this is Initializing screen</Text>
            </View>
        )
    }
}

export default Initializing