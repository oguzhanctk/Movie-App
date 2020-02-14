import React, { Component } from 'react'
import { Text, View, TextInput, Button, ToastAndroid, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Auth } from "aws-amplify";
import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/Feather";

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
                .catch(err => {
                    if(err.code === "UserNotFoundException")
                        ToastAndroid.show("Kullanıcı bulunamadı", ToastAndroid.SHORT);
                    console.log(err)
                });
            } catch (error) {
                console.log("Hata forgotPassword...", error);
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
                .catch(err => {
                    if(err.code === "CodeMismatchException")
                        ToastAndroid.show("Doğrulama kodu yanlış", ToastAndroid.SHORT);
                    if(err.code === "InvalidParameterException")
                        ToastAndroid.show("Şifre uzunluğu yeterli değil", ToastAndroid.SHORT);
                    console.log(err)
                });
            } catch (error) {
                console.log("Hata forgotPasswordSubmit...", error)
            }
        }
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", paddingHorizontal : 7, backgroundColor : "white"}}>
                {
                    this.state.stage === Number(0) &&
                        (
                        <React.Fragment>
                            <View style = {styles.apertureContainer}>
                                <Icon name = "aperture" size = {styles.logoSize} color = "orange"/>
                            </View>
                            <View style = {{alignItems : "center", flex : 1}}>
                                <TextInput style = {styles.textInput} 
                                    placeholder = "kullanıcı adı"
                                    onChangeText = {(value) => this.getUserInput("username", value)}/>
                                <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} onPress = {() => {
                                    this.forgotPassword();
                                }}>
                                    <Text style = {styles.buttonText}>Devam</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>)
                }

                {
                    this.state.stage === Number(1) &&
                        (<View style = {{flex : 1, alignItems : "center"}}>
                            <View style = {styles.apertureContainer}>
                                <Icon name = "aperture" size = {styles.logoSize} color = "orange"/>
                            </View>
                            <View style = {{flex : 1, alignItems : "center", justifyContent : "flex-start"}}>
                                <TextInput style = {styles.textInput} 
                                    placeholder = "doğrulama kodu"
                                    onChangeText = {(value) => this.getUserInput("code", value)}/>
                                <TextInput style = {styles.textInput} 
                                    placeholder = "yeni parola"
                                    secureTextEntry
                                    onChangeText = {(value) => this.getUserInput("newPass", value)}/>
                                <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} onPress = {() => {
                                    this.forgotPasswordSubmit()
                                }}>
                                    <Text style = {styles.buttonText}>Yenile</Text>
                                </TouchableOpacity>
                                {/* <Button title = "Şifreyi yenile" onPress = {() => {
                                    this.forgotPasswordSubmit();
                                }}/> */}
                            </View>
                        </View>)
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
    },
    apertureContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    logoSize : Dimensions.get("window").height / 3.5,
    button : {
        backgroundColor : "orange",
        opacity : 0.8,
        width : Dimensions.get("window").width / 2,
        justifyContent : "center",
        alignItems : "center",
        padding : 7,
        borderRadius : 3
    },
    buttonText : {
        fontSize : 14,
        fontWeight : "bold",
        letterSpacing : 1
    } 
})