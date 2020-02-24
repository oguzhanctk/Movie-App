import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

export const Alert = (props) => {
    return (
        <View style = {{...styles.alertContainer, backgroundColor : props.color}}>
            <Text>{props.alertText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    alertContainer : {
        justifyContent : "center",
        alignItems : "center",
        elevation : 20,
        position : "absolute",
        top : 0,
        width : Dimensions.get("window").width,
    },
})
