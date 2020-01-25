import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";

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

    return (
                <TouchableHighlight style = {{flex : 1}} onPress = {() => onMoviePress(props.movieId)}>
                    <Image source = {{uri : `${baseImageUrl}${props.imagePath}`}}
                        style = {{width : DimensionDeclaration.movieCardWidth - 11, 
                                height : DimensionDeclaration.movieCardHeight - 11, 
                                borderRadius : 3, 
                                borderWidth : 0.85,
                                borderColor : "black",
                                backgroundColor : "gray"
                                }}
                        resizeMode = "cover"/>
                </TouchableHighlight>
    )
}