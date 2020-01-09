import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-community/async-storage";

export default class SignIn extends Component {

    state = {
        user : {},
        username : "",
        email : "",
        password : "",
        phone_number : "",
    }

    handleText = (key, val) => {
        this.setState({[key] : val});
    }

    waitForAssign = async () => {
        await AsyncStorage.setItem("@item", JSON.stringify(this.state.user))
    }

    signIn = async () => {
        this.setState({user : Object.assign({}, 
            {"username" : this.state.username,
            "email" : this.state.email,
            "password" : this.state.password,
            "phone_number" : this.state.phone_number})},
            () => { this.waitForAssign(); }
        );
        
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>{JSON.stringify(this.state.user)}</Text>
                <Text>username : </Text>
                <TextInput placeholder = "enter something" 
                onChangeText = {val => this.handleText("username", val)}
                style = {styles.textInput}
                placeholderTextColor = "white"/>
                <Text>email : </Text>
                <TextInput placeholder = "enter something" 
                onChangeText = {val => this.handleText("email", val)}
                style = {styles.textInput}
                placeholderTextColor = "white"/>
                <Text>password : </Text>
                <TextInput placeholder = "enter something" 
                onChangeText = {val => this.handleText("password", val)}
                style = {styles.textInput}
                placeholderTextColor = "white"/>
                <Text>phone_number : </Text>
                <TextInput placeholder = "enter something" 
                onChangeText = {val => this.handleText("phone_number", val)}
                style = {styles.textInput}
                placeholderTextColor = "white"/>
                <Button title = "Sign up" onPress = {() => {
                    this.signIn()
                    }
                }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    textInput : {
        backgroundColor : "gray",
        borderRadius : 7,
        padding : 7,
        width : 300,
        margin : 7,
    }
})

