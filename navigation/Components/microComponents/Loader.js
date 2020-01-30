import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { View, Text, ActivityIndicator } from "react-native";

export const Loader = () => {

    return(
        <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
            <ActivityIndicator size = "large" color = "blue"/>
        </View>
    )
}
