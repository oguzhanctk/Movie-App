import React from 'react'
import { ImageBackground, TouchableHighlight, StyleSheet, ToastAndroid } from 'react-native'
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";

export const MovieCard = (props) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w185";
    
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
    
    const checkDataExistence = (arr, newValue) => {
        for(let item of arr) {
            if(item.id.toString() === newValue.id.toString())
                return true;
        }
        return false;
    }

    const storeData = async (value) => {
        try {
            let existingData = await AsyncStorage.getItem("@library_item");
            if(existingData === null) {
                try {
                    await AsyncStorage.setItem("@library_item", JSON.stringify([value]));
                    ToastAndroid.show("Kütüphaneye eklendi", ToastAndroid.SHORT);
                } catch (error) {
                    console.log(error, "MovieCard -> 30");                    
                }
            } else {
                try {
                    let toArray = JSON.parse(existingData);
                    if(checkDataExistence(toArray, value) === false) {
                        toArray.push(value);
                        await AsyncStorage.setItem("@library_item", JSON.stringify(toArray));
                        ToastAndroid.show("Kütüphaneye eklendi", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show("Bu film zaten kütüphanede", ToastAndroid.SHORT);
                    }
                } catch (error) {
                    console.log(error, "MovieCard -> 37")
                }
            }
        } catch (error) {
            console.log(error, "MovieCard -> 41");
        }
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
                        (props.isSaved) ? 
                            (
                                <TouchableHighlight style = {styles.fab} 
                                    onPress = {() => {
                                        storeData({id : props.movieId, poster_path : props.imagePath});
                                        }}
                                    underlayColor = "lightgreen">
                                    <Icon name = "star" size = {15}/>
                                </TouchableHighlight>
                            ) : 
                            (
                                <TouchableHighlight style = {styles.fab} 
                                    onPress = {() => {
                                        storeData({id : props.movieId, poster_path : props.imagePath});
                                    }}
                                    underlayColor = "lightgreen">
                                    <Icon name = "plus" size = {15}/>
                                </TouchableHighlight>
                            )
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
        backgroundColor : "#d4f5d3",
        opacity : 0.75,
        bottom : 5,
        right : 5
    }
});
