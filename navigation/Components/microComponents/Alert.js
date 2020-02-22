import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const Alert = () => {
    return (
        <View style = {styles.alertContainer}>
            <Text>adsadsad</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    alertContainer : {
        justifyContent : "center",
        alignContent : "center",
        backgroundColor : "red",
        elevation : 20,
        position : "absolute",
        top : 0,
        width : Dimensions.get("window").width,
    },
})

export default Alert;