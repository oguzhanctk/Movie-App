import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loader = (props) => {

    return(
        <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
            <ActivityIndicator size = "large" color = {props.indicatorColor}/>
        </View>
    )
}
