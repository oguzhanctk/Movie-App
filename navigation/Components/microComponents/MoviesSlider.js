import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import MovieCardActions from "../../../actions/MovieCardActions";
import { DimensionDeclaration } from "./dimensions_declaration";
import store from "../../../reducers/index";

export const MoviesSlider = (props) => {

    return (
        <View style = {{paddingVertical : 1, 
                        paddingLeft : 7}}>
            <View style = {{justifyContent : "center", paddingVertical : 7}}>
                <Text style = {{fontWeight : "bold", 
                    fontSize : 15, 
                    color : "white"}}>{props.headerText}</Text>
            </View>
            <FlatList
                    data = {props.movieData.filter(item => item.poster_path !== null)}
                    horizontal
                    renderItem = {({item}) => (
                        <MovieCardActions store = {store} 
                            imagePath = {item.poster_path} 
                            movieId = {item.id} 
                            isSaved = {item.isSaved}/>
                        )}
                    keyExtractor = {item => item.id.toString()}
                    ItemSeparatorComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    showsHorizontalScrollIndicator = {false}
                    ListEmptyComponent = {() => (
                        <View style = {{flex : 1, 
                                        backgroundColor : "#5e6e62", 
                                        height : DimensionDeclaration.movieCardWidth + 42,
                                        width : Dimensions.get("window").width}}>
                        </View>
                    )}
                    initialNumToRender = {5}
                    ListFooterComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    />
        </View>
    )
}
