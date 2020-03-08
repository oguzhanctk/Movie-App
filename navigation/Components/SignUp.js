import React, { Component } from "react";
import {View, 
        Text, 
        TextInput, 
        StyleSheet, 
        Dimensions, 
        ToastAndroid,
        TouchableOpacity,
        ImageBackground,
        Keyboard} from "react-native";
import { goToAuth } from "../navigation";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";

export default class SignUp extends Component {

    state = {
        username : "",
        email : "",
        password : "",
        phone_number : "",
        confCode : "",
        stage : 0,
        isKeyboardOpen : false
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
                await AsyncStorage.setItem("@stage", JSON.stringify({stage : 1, username : this.state.username}));
            } catch (error) {
                if(error.message === "Invalid email address format.")
                    ToastAndroid.show("Lütfen geçerli bir e-mail adresi girin", ToastAndroid.SHORT);
                else {
                    switch (error.code) {
                        case "NetworkError":
                            ToastAndroid.show("İnternet bağlantısı yok", ToastAndroid.SHORT);
                            break;
                        case "InvalidParameterException":
                            ToastAndroid.show("Şifre uzunluğu en az 8 karakter olmalıdır.", ToastAndroid.SHORT);
                            break;
                        case "UsernameExistsException":
                            ToastAndroid.show("Bu kullanıcı adı daha önce alınmış", ToastAndroid.SHORT);
                            break;
                        case "InvalidPasswordException":
                            ToastAndroid.show("Şifre uzunluğu en az 8 karakter olmalıdır.", ToastAndroid.SHORT);
                            break;
                        default:
                            break;
                    }
                }
                console.log(error);
            }
        }
    }

    confirmSignUp = async () => {
        const {username, confCode} = this.state;
        if(username === "" || confCode === "") {
            ToastAndroid.show("Lütfen e-mail adresinize gelen kodu girin.", ToastAndroid.SHORT);
        } else {
            try {
                await Auth.confirmSignUp(username, confCode)
                .then(() => {
                    console.log("confirm signup succesfull");
                    ToastAndroid.show("Kayıt başarılı.", ToastAndroid.SHORT);
                    goToAuth();
                });
                await AsyncStorage.setItem("@stage", JSON.stringify({stage : 0, username : ""}));
            } catch (error) {
                switch (error.code) {
                    case "NetworkError":
                        ToastAndroid.show("İnternet bağlantısı yok", ToastAndroid.SHORT)
                        break;
                    case "CodeMismatchException":
                        ToastAndroid.show("Doğrulama kodu yanlış", ToastAndroid.SHORT);
                        break;
                    case "LimitExceededException":
                        ToastAndroid.show("Kod istek limiti aşıldı lütfen daha sonra tekrar deneyin.", ToastAndroid.SHORT);
                        break;
                    default:
                        break;
                }
                console.log("error while confirmsignup...", error);
            }
        }
    }
    
    resendConfCode = async () => {
        const username = this.state.username;
        try {
            await Auth.resendSignUp(username)
            .then(() => {
                console.log("kod başarıyla gönderildi");
                ToastAndroid.show("Kod tekrar gönderildi", ToastAndroid.SHORT);
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount = async () => {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            this.setState({isKeyboardOpen : true});
        });
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            this.setState({isKeyboardOpen : false});
        });
        try {
            const stage = await AsyncStorage.getItem("@stage").then(res => JSON.parse(res)) || {stage : 0, username : ""};
            this.setState({
                stage : stage.stage,
                username : stage.username    
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        return (
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                {
                    this.state.stage === Number(0) && (
                        <ImageBackground source = {require("../assets/popcorn.jpg")} style = {{width : "100%", height : "100%"}}>
                            <View style = {{...styles.apertureContainer, flex : (this.state.isKeyboardOpen === true) ? 1 : 2}}>
                                <Icon name = "aperture" size = {(this.state.isKeyboardOpen === true) ? Dimensions.get("window").height / 10 : Dimensions.get("window").height / 5} color = "orange"/>
                            </View>
                            <View style = {{flex : 4, justifyContent : "flex-start", alignItems : "center", padding : 7}}>
                                <TextInput maxLength = {30} placeholder = "isim" style = {styles.textInput} onChangeText = {(value) => this.getInput("username", value)}/>
                                <TextInput maxLength = {30} placeholder = "e-mail" style = {styles.textInput} onChangeText = {(value) => this.getInput("email", value)}/>
                                <TextInput maxLength = {12} placeholder = "telefon numarası (5xx)" style = {styles.textInput} onChangeText = {(value) => this.getInput("phone_number", value)}/>
                                <TextInput secureTextEntry = {true} maxLength = {10} placeholder = "parola" style = {{...styles.textInput, marginBottom : 13}} onChangeText = {(value) => this.getInput("password", value)}/>
                                <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} 
                                onPress = {async () => {
                                        await this.signUp();
                                }}>
                                    <Text style = {styles.buttonText}>Kaydol</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>)
                }

                {
                    this.state.stage === Number(1) && (
                        <View style = {{flex : 1}}>
                            <View style = {{...styles.apertureContainer, flex : (this.state.isKeyboardOpen === true) ? 0.5 : 1}}>
                                <Icon name = "aperture" size = {(this.state.isKeyboardOpen === true) ? Dimensions.get("window").height / 10 : Dimensions.get("window").height / 5} color = "orange"/>
                            </View>
                            <View style = {{flex : 0.5, justifyContent : "center", alignItems : "center", padding : 13}}>
                                <Text style = {{fontSize : 21}}>Devam etmek için e-mail adresinize gelen 6 haneli kodu girin.</Text>
                            </View>
                            <View style = {{flex : 1, justifyContent : "flex-start", alignItems : "center"}}>
                                <TextInput maxLength = {30} placeholder = "doğrulama kodu" style = {{...styles.textInput, marginBottom : 13}} onChangeText = {(value) => this.getInput("confCode", value)}/>
                                <TouchableOpacity style = {{...styles.button, marginBottom : 5}} disabled = {this.state.isSubmit} onPress = {async () => {
                                        await this.confirmSignUp();
                                }}>
                                    <Text style = {styles.buttonText}>Doğrula</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {{...styles.button, marginBottom : 5}} disabled = {this.state.isSubmit} onPress = {() => {
                                        this.resendConfCode();
                                }}>
                                    <Text style = {styles.buttonText}>Kodu tekrar al</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} onPress = {() => {
                                        this.setState({stage : 0});
                                }}>
                                    <Text style = {styles.buttonText}>Kayıt ekranına geri dön</Text>
                                </TouchableOpacity>
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
        width : Dimensions.get("window").width * 0.8,
        marginVertical : 3,
        color : "black",        
    },
    apertureContainer : {
        justifyContent : "flex-start",
        alignItems : "center",
    },
    logoSize : Dimensions.get("window").height / 3.5,
    button : {
        backgroundColor : "orange",
        opacity : 0.8,
        width : Dimensions.get("window").width * 0.8,
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
