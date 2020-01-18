import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Badge = (props) => {
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{props.textContent}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderWidth : 0.3,
        backgroundColor : "#ccc",
        borderRadius :13,
        padding : 5,
        marginRight : 4  
    },
    text : {
        fontWeight : "700",
        color : "black",
        fontSize : 11 
    }
})
