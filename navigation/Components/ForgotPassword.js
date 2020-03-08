import React, { Component } from 'react'
import {Text, 
        View, 
        TextInput,
        ToastAndroid,
        StyleSheet,
        Dimensions,
        TouchableOpacity,
        Keyboard} from 'react-native'
import { Auth } from "aws-amplify";
import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-community/async-storage';

export default class ForgotPassword extends Component {
    state = {
        username : "",
        code : "",
        newPass : "",
        stage : 0,
        isKeyboardOpen : false,
        isSecureText : true
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
                })
                .catch(err => {
                    switch (err.code) {
                        case "NetworkError":
                            ToastAndroid.show("İnternet bağlantısı yok", ToastAndroid.SHORT);
                            break;
                        case "UserNotFoundException":
                            ToastAndroid.show("Kullanıcı bulunamadı", ToastAndroid.SHORT);
                            break;
                        case "InvalidParameterException":
                            ToastAndroid.show("Kullanıcı için e-mail adresi doğrulanmamış", ToastAndroid.SHORT);
                            break;
                        case "LimitExceededException":
                            ToastAndroid.show("İstek limiti aşıldı", ToastAndroid.SHORT);
                            break;
                        default:
                            break;
                        };
                    console.log(err);
                });
                await AsyncStorage.setItem("@password_stage", JSON.stringify({stage : 1, username : this.state.username}));
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
                    switch (err.code) {
                        case "NetworkError":
                            ToastAndroid.show("İnternet bağlantısı yok", ToastAndroid.SHORT);
                            break;
                        case "InvalidPasswordException":
                            ToastAndroid.show("Parola uzunluğu en az 8 karakter olmalıdır", ToastAndroid.SHORT);
                            break;
                        case "CodeMismatchException":
                            ToastAndroid.show("Doğrulama kodu yanlış", ToastAndroid.SHORT);
                            break;
                        case "InvalidParameterException":
                            ToastAndroid.show("Şifre uzunluğu yeterli değil", ToastAndroid.SHORT);
                            break;
                        default:
                            ToastAndroid.show("Bu kullanıcı için e-mail adresi doğrulanmamış", ToastAndroid.SHORT);
                            break;
                    }
                });
                await AsyncStorage.setItem("@password_stage", JSON.stringify({stage : 0, username : ""}));
            } catch (error) {
                console.log("Hata forgotPasswordSubmit...", error)
            }
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
            const stage = await AsyncStorage.getItem("@password_stage").then(res => JSON.parse(res)) || {stage : 0, username : ""};
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
            <View style = {{flex : 1, alignItems : "center", paddingHorizontal : 7, backgroundColor : "white"}}>
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
                                <TouchableOpacity style = {styles.button} disabled = {this.state.isSubmit} onPress = {async () => {
                                    await this.forgotPassword();
                                }}>
                                    <Text style = {styles.buttonText}>Devam</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>)
                }

                {
                    this.state.stage === Number(1) &&
                        (<View style = {{flex : 0.7, alignItems : "center"}}>
                            <View style = {{...styles.apertureContainer, flex : (this.state.isKeyboardOpen === true) ? 0.5 : 1}}>
                                <Icon name = "aperture" size = {(this.state.isKeyboardOpen === true) ? Dimensions.get("window").height / 10 : Dimensions.get("window").height / 3.5} color = "orange"/>
                            </View>
                            <View style = {{flex : 1, alignItems : "center", justifyContent : "flex-start"}}>
                                <TextInput style = {styles.textInput} 
                                    placeholder = "doğrulama kodu"
                                    onChangeText = {(value) => this.getUserInput("code", value)}/>
                                <View style = {styles.textInputWithIconContainer}>
                                    <TextInput secureTextEntry = {this.state.isSecureText} maxLength = {10} placeholder = "yeni parola" style = {{...styles.textInputWithIcon}} onChangeText = {(value) => this.getUserInput("newPass", value)}/>
                                    <TouchableOpacity onPress = {() => this.setState({isSecureText : !this.state.isSecureText})}>
                                        <Icon name = {(this.state.isSecureText) ? "eye" : "eye-off"} size = {23} style = {{padding : 7, backgroundColor : "transparent"}}/>
                                    </TouchableOpacity> 
                                </View>
                                <TouchableOpacity style = {{...styles.button, marginVertical : 7}} disabled = {this.state.isSubmit} onPress = {async () => {
                                    await this.forgotPasswordSubmit();
                                }}>
                                    <Text style = {styles.buttonText}>Yenile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.button} onPress = {async () => {
                                    this.setState({stage : 0});
                                    await AsyncStorage.setItem("@password_stage", JSON.stringify({stage : 0, username : ""}));

                                }}>
                                    <Text style = {styles.buttonText}>Geri dön</Text>
                                </TouchableOpacity>
                                
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
    textInputWithIcon : {
        flex : 1,
        backgroundColor : "#e1f0e8",
        padding : 7,
        color : "black",
    },
    textInputWithIconContainer : {
        flexDirection : "row", 
        alignItems : "center", 
        width : Dimensions.get("window").width * 0.8, 
        backgroundColor : "#e1f0e8", 
        borderRadius : 3, 
        borderWidth : 0.25, 
        borderColor : "gray",
        marginVertical : 2

    },
    logoSize : Dimensions.get("window").height / 3.5,
    apertureContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        padding : 5
    },
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