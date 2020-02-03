import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ToastAndroid } from "react-native";
import { goToMainLayout } from "../navigation";
import { Auth } from "aws-amplify";

export default class SignUp extends Component {

    state = {
        username : "",
        email : "",
        password : "",
        phone_number : "",
        confCode : "",
        stage : 0
    }

    getInput = (key, val) => {
        this.setState({[key] : val});
    }

    signUp = async () => {
        const {username, email, password, phone_number} = this.state;
        if(username === "" || email === "" || password === "" || phone_number === "") {
            ToastAndroid.show("Lütfen tüm alanları doldurun", ToastAndroid.SHORT);
        } else {
            try {
                await Auth.signUp({username, password, attributes : {email}});
                console.log("succesfull signup");
                this.setState({stage : 1});
        } catch (error) {
            ToastAndroid.show(`Kayıt sırasında hata oluştu, ${error.message}`, ToastAndroid.LONG);
            console.log("error signing up...", error);
            }
        }
    }

    confirmSignUp = async () => {
        const {username, confCode} = this.state;
        if(username === "" || confCode === "") {
            ToastAndroid.show("Lütfen tüm alanları doldurun", ToastAndroid.SHORT);
        } else {
            try {
                await Auth.confirmSignUp(username, confCode)
                .then(() => {
                    console.log("confirm signup succesfull");
                    goToMainLayout();
                });
            } catch (error) {
                ToastAndroid.show("Doğrulama sırasında hata", ToastAndroid.SHORT);
                console.log("error while confirmsignup...", error);
            }
        }
    }
    
    resendConfCode = async () => {
        const {username} = this.state;
        try {
            await Auth.resendSignUp(username)
            .then(() => {
                console.log("kod başarıyla gönderildi");
                ToastAndroid.show("Kod tekrar gönderildi", ToastAndroid.SHORT);
            })
        } catch (error) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                {
                    this.state.stage === Number(0) && (
                        <React.Fragment>
                            <View style = {{flex : 1, justifyContent : "center"}}>
                                <Text style = {{fontSize : 37, color : "orange", fontWeight : "bold"}}>Sign Up</Text>
                            </View>
                            <View style = {{flex : 3, justifyContent : "flex-start", padding : 7}}>
                                <TextInput maxLength = {30} placeholder = "isim" style = {styles.textInput} onChangeText = {(value) => this.getInput("username", value)}/>
                                <TextInput maxLength = {30} placeholder = "e-mail" style = {styles.textInput} onChangeText = {(value) => this.getInput("email", value)}/>
                                <TextInput maxLength = {12} placeholder = "telefon numarası" style = {styles.textInput} onChangeText = {(value) => this.getInput("phone_number", value)}/>
                                <TextInput secureTextEntry = {true} maxLength = {10} placeholder = "parola" style = {styles.textInput} onChangeText = {(value) => this.getInput("password", value)}/>
                                <Button title = "Sign up" onPress = {() => {
                                    this.signUp();
                                }}/>
                            </View>
                        </React.Fragment>)
                }

                {
                    this.state.stage === Number(1) && (
                        <View style = {{flex : 1}}>
                            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                                <Text style = {{fontSize : 26}}>Devam etmek için e-mail adresinize gelen 6 haneli kodu girin.</Text>
                            </View>
                            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                                <TextInput maxLength = {30} placeholder = "doğrulama kodu" style = {styles.textInput} onChangeText = {(value) => this.getInput("confCode", value)}/>
                                <Button title = "Doğrula" onPress = {() => {
                                    this.confirmSignUp();
                                }}/>
                                <Button title = "Kodu tekrar gönder" onPress = {() => {
                                    this.resendConfCode();
                                }}/>
                                <Button title = "kayıt ekranına geri dön" onPress = {() => {
                                    this.setState({stage : 0});
                                }}/>
                            </View>
                        </View>
                    )
                }
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
