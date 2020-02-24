import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { goToAuth, goToMainLayout } from "../navigation";
import SplashScreen from "react-native-splash-screen";
import { Loader } from "./microComponents/Loader";

class Initializing extends Component {
  
    componentDidMount = async () => {
        const status = await this.getAuthStatus(); 
        if(status === "true") {
            SplashScreen.hide();
            goToMainLayout();
        } else {
            SplashScreen.hide();
            goToAuth();
        }
    }

    getAuthStatus = async () => {
        const status = await AsyncStorage.getItem("@auth_status");
        return status;
    }

    render() {
        return(
            <View style = {{flex : 1, backgroundColor : "white", justifyContent : "center", alignItems : "center"}}>
                <Loader/>
            </View>
        )
    }
}

export default Initializing