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
        <View style = {{width : DimensionDeclaration.movieCardWidth, 
                    height : DimensionDeclaration.movieCardHeight, 
                    backgroundColor : "black",
                    padding : 3, 
                    flex : 1}}>
                <TouchableHighlight style = {{flex : 1}} onPress = {() => onMoviePress(props.movieId)}>
                    <Image source = {{uri : `${baseImageUrl}${props.imagePath}`}}
                        style = {{flex : 1, 
                                width : null, 
                                height : null, 
                                borderRadius : 7, 
                                borderWidth : 0.3, 
                                borderColor : "white",
                                backgroundColor : "gray"
                                }}
                        resizeMode = "cover"/>
                </TouchableHighlight>
        </View>
    )
}