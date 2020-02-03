import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform, Dimensions, ToastAndroid} from "react-native";
import { goToMainLayout } from "../navigation";
import { Navigation } from "react-native-navigation";
import { Auth } from "aws-amplify";

export default class SignIn extends Component {

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
        isSubmit : false,
    }

    getInput = (key, value) => {
        this.setState({[key] : value});
    }

    signIn = async () => {
        const {username, password} = this.state;
        if(username === "" || password === "") {
            this.setState({isSubmit : false}, () => {
                ToastAndroid.show("Lütfen tüm alanları doldurun", ToastAndroid.SHORT)
            });
        } else {
            try {
                await Auth.signIn(username, password)
                .then(() => {
                    this.setState({isSubmit : false}, () => goToMainLayout());
                    console.log("succesful sign in");
                }) 
                .catch(err => {
                    this.setState({isSubmit : false}, () => {
                        ToastAndroid.show("Kullanıcı adı ya da parola yanlış", ToastAndroid.SHORT)
                    });
                    console.log(err);
                });
            } catch (err) {
                console.log("error while signing up...", err);
            }
        }
    }

    componentWillUnmount = () => {
        this.setState({isSubmit : false});
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                <View style = {{flex : 1, justifyContent : "center"}}>
                    <Text style = {{fontSize : 37, color : "orange", fontWeight : "bold"}}>Sign In</Text>
                </View>
                <View style = {{flex : 3, justifyContent : "flex-start", padding : 7}}>
                    <TextInput maxLength = {30} placeholder = "kullanıcı adı" style = {styles.textInput} onChangeText = {(value) => this.getInput("username", value)}/>
                    <TextInput secureTextEntry = {true} maxLength = {10} placeholder = "parola" style = {styles.textInput} onChangeText = {(value) => this.getInput("password", value)}/>
                    <Button title = "Sign in" disabled = {this.state.isSubmit} onPress = {() => {
                        this.setState({isSubmit : true}, () => {
                            this.signIn()
                        });
                    }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput : {
        backgroundColor : "#e1f0e8",
        borderRadius : 3,
        borderWidth : 0.25,
        borderColor : "gray",
        padding : 7,
        width : (Dimensions.get("window").width * 4) / 5,
        margin : 7,
        color : "black",        
    }
})