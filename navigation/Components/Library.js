import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Navigation } from "react-native-navigation";

export default class Library extends Component {

    render() {
        return(
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                <Button title = "go back"/>
            </View>
        )
    }
}