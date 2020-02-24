import React, { useState, useEffect } from 'react'
import { ImageBackground, TouchableHighlight, StyleSheet, ToastAndroid } from 'react-native'
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import { storeMethod } from "../storage/index";
import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-community/async-storage';

export const MovieCard = (props) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const [isAdded, setisAdded] = useState(false);
    const [isSubmit, setisSubmit] = useState(false);

    const onMoviePress = (id, type) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    id : id,
                    mediaType : type
                }
            }
        });
    }
    
    return (
        <TouchableHighlight style = {{flex : 1}}
        onPress = {() => {
                onMoviePress(props.id, props.mediaType);
                setisSubmit(true);
                setTimeout(() => {
                    setisSubmit(false)
                }, 1000);
                }}
        disabled = {isSubmit}>
            <ImageBackground source = {{uri : `${baseImageUrl}${props.imagePath}`}}
                style = {{width : DimensionDeclaration.movieCardWidth - 11, 
                        height : DimensionDeclaration.movieCardHeight - 11, 
                        borderRadius : 3, 
                        borderWidth : 0.85,
                        borderColor : "black",
                        backgroundColor : "gray",
                        justifyContent : "flex-end",
                        alignItems : "flex-end"
                        }}
                resizeMode = "cover">
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
                                }
                            }}
                            underlayColor = "lightgreen">
                            <Icon name = "plus" size = {17}/>
                        </TouchableHighlight>)
                    }         
            </ImageBackground>
        </TouchableHighlight>
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
