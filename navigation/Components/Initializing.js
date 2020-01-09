import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";
import { goHome, goToAuth, goTosideMenuLayout, goToMainLayout } from "../navigation";
import { USER_KEY } from "../config";
import { Navigation } from "react-native-navigation";
import SplashScreen from "react-native-splash-screen";

export default class Initializing extends Component {
  
    componentDidMount = async () => {
        
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            .then(res => JSON.parse(res));
            console.log("user : ", user.username);
            if(user) {
                goToMainLayout();  
            } else {
                goToAuth();    
                
            }
        } catch (error) {
            console.log(error);
            goToAuth();
        }
        SplashScreen.hide();
    }

    

    render() {
        return(
            <View style = {{flex : 1}}>
                
            </View>
        )
    }
}