import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { USER_KEY } from "../config";
import { goHome } from "../navigation";
import { Navigation } from "react-native-navigation";

export default class SignUp extends Component {

    static get options() {
        return {
            bottomTabs : {
                ...Platform.select({android : {drawBehind : true}}),
            }
        }
    }

    state = {
        username : "",
        password : "",
    }


 
    signIn = async () => {
        try {
            const validate = await AsyncStorage.getItem(USER_KEY)
            .then(res => JSON.parse(res));
            if(validate.username == this.state.username && validate.password == this.state.password) {
                goHome();
            }
        } catch (error) {
            console.log(error);
            
        }   
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                <Text>Username</Text>
                <TextInput style = {styles.textInput} onChangeText = {(val) => {
                    this.setState({username : val });
                }}/>
                <Text>Password</Text>
                <TextInput style = {styles.textInput} secureTextEntry = {true} onChangeText = {(val) => {
                    this.setState({password : val });
                }}/>  
                <Button title = "Sign in" onPress = {() => this.signIn()}/>
                <Button title = "hide bottom tabs" onPress = {() => {
                    Navigation.mergeOptions(this.props.componentId, {
                        bottomTabs : {
                            visible : false,
                            
                        }
                    })
                }}/>
                <Button title = "badge" onPress = {() => {
                    Navigation.mergeOptions(this.props.componentId, {
                        bottomTab : {
                            badge : "New",
                            badgeColor : "red"
                        }
                    })
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput : {
        backgroundColor : "gray",
        borderRadius : 7,
        padding : 7,
        width : 300,
        margin : 7,
        color : "white"
    }
})