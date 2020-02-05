import React, { Component } from 'react'
import { Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import { Auth } from "aws-amplify";
import { Navigation } from 'react-native-navigation';

export default class ForgotPassword extends Component {
    state = {
        username : "",
        code : "",
        newPass : "",
        stage : 0
    }

    getUserInput = (key, value) => {
        this.setState({[key] : value});
    }

    forgotPassword = async () => {
        const {username} = this.state;
        if(username === "") {
            ToastAndroid.show("Lütfen kullanıcı adınızı girin", ToastAndroid.SHORT);
        } else {
            try {
                await Auth.forgotPassword(username)
                .then(data => {
                    this.setState({stage : 1});
                    console.log(data);
                })
                .catch(err => console.log(err))
            } catch (error) {
                console.log("Hata forgotPassword", err);
            }
        }
    }

    forgotPasswordSubmit = async () => {
        const {username, code, newPass} = this.state;
        if(code === "" || newPass === "") {
            ToastAndroid.show("Lütfen tüm alanları doldurun", ToastAndroid.SHORT);
        } else {
            try {
                Auth.forgotPasswordSubmit(username, code, newPass)
                .then(() => {
                    setTimeout(() => {
                        Navigation.dismissModal(this.props.componentId);
                        ToastAndroid.show("Şifre başarıyla değiştirildi", ToastAndroid.SHORT);
                    }, 1000);
                })
                .catch(err => console.log(err));
            } catch (error) {
                console.log("Hata forgotPasswordSubmit", err)
            }
        }
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", paddingHorizontal : 7, backgroundColor : "#ddd"}}>
                {
                    this.state.stage === Number(0) &&
                        (<View>
                            <TextInput style = {{borderWidth : 0.45, 
                                paddingHorizontal : 13, 
                                marginBottom : 7,
                                backgroundColor : "white" }} 
                                placeholder = "kullanıcı adı"
                                onChangeText = {(value) => this.getUserInput("username", value)}/>
                            <Button title = "Şifreyi yenile" onPress = {() => {
                                this.forgotPassword();
                            }}/>
                        </View>)
                }

                {
                    this.state.stage === Number(1) &&
                        (<View>
                            <TextInput style = {{borderWidth : 0.45, 
                                paddingHorizontal : 13, 
                                marginBottom : 7,
                                backgroundColor : "white" }} 
                                placeholder = "doğrulama kodu"
                                onChangeText = {(value) => this.getUserInput("code", value)}/>
                            <TextInput style = {{borderWidth : 0.45, 
                                paddingHorizontal : 13, 
                                marginBottom : 7,
                                backgroundColor : "white" }} 
                                placeholder = "yeni parola"
                                secureTextEntry
                                onChangeText = {(value) => this.getUserInput("newPass", value)}/>
                            <Button title = "Şifreyi yenile" onPress = {() => {
                                this.forgotPasswordSubmit();
                            }}/>
                        </View>)
                }

            </View>
        )
    }
}