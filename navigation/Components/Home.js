import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import CustomAnimation from "../../animation_Components/animations";
import { MovieApi } from "../../api/fetch_movies";
import { MovieCard } from "./microComponents/MovieCard";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    // navigationButtonPressed = ({buttonId}) => {
    //     const { componentId } = this.props;

    //     if(buttonId == "leftSide") {
    //         console.log("sideMenu button pressed");
    //         Navigation.mergeOptions(componentId, {
    //             sideMenu : {
    //                 left : {
    //                     visible : true
    //                 }
    //             }
    //         })
    //     }
    // }

    
    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "#ccc", flex : 1}}>     
                <View style = {{
                        width : Dimensions.get("window").width, 
                        flexDirection : "row"}}>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    fab : {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:55,
        height:55,  
        borderRadius:100,
        backgroundColor : "lightblue"
    }
})