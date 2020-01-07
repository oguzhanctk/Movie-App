import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { View, Text, ActivityIndicator } from "react-native";

//test comment
//comment1

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