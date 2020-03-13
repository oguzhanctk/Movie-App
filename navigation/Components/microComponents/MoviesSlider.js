import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { MovieCard } from "./MovieCard";
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";

export const MoviesSlider = React.memo((props) => {

    const handleClick = () => {
        props.updateState();
    }

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
        <View style = {{paddingVertical : 1, paddingLeft : 7}}>
            <View style = {{justifyContent : "center", paddingVertical : 7}}>
                <Text style = {{fontWeight : "bold", 
                    fontSize : 15, 
                    color : "white"}}>{props.headerText}</Text>
            </View>
            <FlatList
                    data = {props.movieData.filter(item => item.poster_path !== null)}
                    horizontal
                    renderItem = {({item}) => (
                        <TouchableOpacity style = {{flex : 1}}
                        onPress = {() => {
                            handleClick();
                            onMoviePress(item.id, item.media_type);
                        }}>
                            <MovieCard imagePath = {item.poster_path} id = {item.id} mediaType = {item.media_type}/>
                        </TouchableOpacity>
                        )}
                    keyExtractor = {item => item.id.toString()}
                    ItemSeparatorComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    showsHorizontalScrollIndicator = {false}
                    ListEmptyComponent = {() => (
                        <View style = {{flex : 1, 
                                        backgroundColor : "#ffd666", 
                                        height : DimensionDeclaration.movieCardWidth + 42,
                                        width : Dimensions.get("window").width}}>
                        </View>
                    )}
                    initialNumToRender = {4}
                    ListFooterComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    getItemLayout = {(data, index) => ({
                        length : DimensionDeclaration.movieCardWidth - 4,
                        offset : DimensionDeclaration.movieCardWidth - 4 * index,
                        index
                    })}
            />
        </View>
    )
})
