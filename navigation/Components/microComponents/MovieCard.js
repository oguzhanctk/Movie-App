import React, { useState, useEffect } from 'react'
import { ImageBackground, TouchableHighlight, StyleSheet, ToastAndroid, Button } from 'react-native'
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";
import { storeMethod } from "../storage/index";

export const MovieCard = (props) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w185";
    const [isAdded, setisAdded] = useState(false);

    const onMoviePress = (id) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    movieId : id
                }
            }
        });
    }
    
    return (
        <TouchableHighlight style = {{flex : 1}} onPress = {() => onMoviePress(props.movieId)}>
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
                            onPress = {() => {
                                storeMethod.storeData({id : props.movieId, poster_path : props.imagePath}, setisAdded);
                            }}
                            underlayColor = "lightgreen">
                            <Icon name = "plus" size = {15}/>
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
