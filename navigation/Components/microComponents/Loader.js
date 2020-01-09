import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { View, Text, ActivityIndicator } from "react-native";

const Loader = () => {
    const { promiseInProgress } = usePromiseTracker(); 

    return(
        <View>
        {
            (promiseInProgress === true) 
            ? <ActivityIndicator size = "large" color = "blue"/>
            : null 
        }
        </View>
    )
}

export default Loader;