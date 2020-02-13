import React, { Component } from "react";
import {View, 
        Text, 
        Button, 
        TextInput, 
        StyleSheet, 
        TouchableOpacity, 
        Platform, 
        Dimensions, 
        ToastAndroid, 
        ImageBackground} from "react-native";
import { goToMainLayout } from "../navigation";
import { Navigation } from "react-native-navigation";
import { Auth } from "aws-amplify";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Feather";

export default class SignIn extends Component {

    static get options() {
        return {
            bottomTabs : {
                ...Platform.select({android : {drawBehind : false}}),
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
                .then(async () => {
                    this.setState({isSubmit : false}, () => goToMainLayout());
                    await AsyncStorage.setItem("@auth_status", "true")
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
            <ImageBackground source = {require("../assets/popcorn.jpg")} style = {{width : "100%", height : "100%"}}>
                <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                    <View style = {styles.apertureContainer}>
                        <Icon name = "aperture" size = {styles.logoSize} color = "orange"/>
                    </View>
                    <View style = {{flex : 2, justifyContent : "flex-start", alignItems : "center", padding : 7}}>
                        <TextInput maxLength = {30} placeholder = "kullanıcı adı" style = {styles.textInput} onChangeText = {(value) => this.getInput("username", value)}/>
                        <TextInput secureTextEntry = {true} maxLength = {10} placeholder = "parola" style = {styles.textInput} onChangeText = {(value) => this.getInput("password", value)}/>
                        <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} onPress = {() => {
                            this.setState({isSubmit : true}, () => {
                                this.signIn()
                            });
                        }}>
                            <Text style = {styles.buttonText}>Giriş</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 0.5, 
                            flexDirection : "column", 
                            justifyContent : "space-evenly",
                            alignItems : "center"}}>
                        <TouchableOpacity style = {{backgroundColor : "transparent"}} onPress = {() => {
                            Navigation.mergeOptions(this.props.componentId, {
                                bottomTabs : {
                                    currentTabId : "signUpId"
                                }
                            });
                        }}>
                            <Text style = {{color : "darkblue", fontWeight : "bold"}}>Hala kayıt olmadınız mı?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{backgroundColor : "transparent"}} onPress = {() => {
                            Navigation.showModal({
                                component : {
                                    name : "ForgotPassword"
                                }
                            });
                        }}>
                            <Text style = {{color : "darkblue", fontWeight : "bold"}}>Şifremi unuttum</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
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
        flex : 1.6,
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