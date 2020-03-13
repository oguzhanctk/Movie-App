import React, { useState } from 'react'
import { ImageBackground, TouchableHighlight, StyleSheet, ToastAndroid } from 'react-native'
import { DimensionDeclaration } from "./dimensions_declaration";
import Icon from "react-native-vector-icons/Feather";
import { storeMethod } from "../storage/index";
import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from "react-native-navigation";

export const MovieCard = (props) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w342";
    const [isAdded, setisAdded] = useState(false);
    const [counter, setcounter] = useState(0)

    return (
            <ImageBackground source = {{uri : `${baseImageUrl}${props.imagePath}`}}
                style = {{width : DimensionDeclaration.movieCardWidth - 11, 
                        height : DimensionDeclaration.movieCardHeight - 11, 
                        borderRadius : 3,
                        borderWidth : 0.85,
                        borderColor : "black",
                        backgroundColor : "#f0d689",
                        justifyContent : "flex-end",
                        alignItems : "flex-end"
                        }}
                resizeMode = "stretch">
                    {
                        (isAdded === true) ?
                            null :
                        (<TouchableHighlight style = {styles.fab} 
                            onPress = {async () => {
                                const isSkip = await AsyncStorage.getItem("@isSkip");
                                if(isSkip === "true")
                                    ToastAndroid.show("Bu özelliği kullanabilmek için giriş yapın", ToastAndroid.LONG)
                                else {
                                    const user = await Auth.currentAuthenticatedUser();
                                    storeMethod.storeData({
                                        id : props.id, 
                                        poster_path : props.imagePath, 
                                        media_type : props.mediaType},
                                        setisAdded,
                                        user.username);
                                    Navigation.mergeOptions("library_id", {
                                        bottomTab : {
                                            badge : "!",
                                            badgeColor : "orange"
                                        }
                                    });
                                }
                            }}
                            underlayColor = "lightgreen">
                            <Icon name = "plus" size = {17}/>
                        </TouchableHighlight>)
                    }         
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    fab : { 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: DimensionDeclaration.movieCardHeight / 6,
        height: DimensionDeclaration.movieCardHeight / 6,  
        borderRadius : 100,
        backgroundColor : "#bef0bb",
        opacity : 0.75,
        bottom : 5,
        right : 5
    }
});
