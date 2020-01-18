import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { MovieCard } from "./MovieCard";
import { DimensionDeclaration } from "./dimensions_declaration";

export const MoviesSlider = (props) => {

    return (
        <View style = {{paddingVertical : 1, 
                        paddingLeft : 7}}>
            <View style = {{justifyContent : "center", paddingVertical : 3}}>
                <Text style = {{fontWeight : "bold", fontSize : 14, color : "white"}}>{props.headerText}</Text>
            </View>
            <FlatList
                    data = {props.movieData}
                    horizontal
                    renderItem = {({item}) => (
                        <MovieCard imagePath = {item.poster_path} movieId = {item.id}/>
                        )}
                    keyExtractor = {item => item.id.toString()}
                    ItemSeparatorComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    showsHorizontalScrollIndicator = {false}
                    ListEmptyComponent = {() => (
                        <View style = {{flex : 1, 
                                        backgroundColor : "#6bc230", 
                                        height : DimensionDeclaration.movieCardWidth + 30,
                                        width : Dimensions.get("window").width}}>
                        </View>
                    )}
                    initialNumToRender = {5}
                     />
        </View>
    )
}

const styles = StyleSheet.create({

})