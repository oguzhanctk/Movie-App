import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { MovieCard } from "./MovieCard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DimensionDeclaration } from "./dimensions_declaration";

export const MoviesSlider = (props) => {
    const data = [
        {id : 0, name : "oguzhan"},
        {id : 1, name : "oguzhan"},
        {id : 2, name : "oguzhan"},
        {id : 3, name : "oguzhan"},
        {id : 4, name : "oguzhan"},
        {id : 5, name : "oguzhan"},
        {id : 6, name : "oguzhan"},
        {id : 7, name : "oguzhan"},
        {id : 8, name : "oguzhan"},
        {id : 9, name : "oguzhan"},
        {id : 10, name : "oguzhan"},
        {id : 11, name : "oguzhan"},
    ];

    return (
        <View style = {{paddingVertical : 1, 
                        paddingLeft : 7}}>
            <View style = {{justifyContent : "center", paddingVertical : 3 }}>
                <Text style = {{fontWeight : "bold", fontSize : 18, color : "#f78e05"}}>{props.headerText}</Text>
            </View>
            <FlatList
                    data = {data}
                    horizontal
                    renderItem = {({item}) => (
                        <MovieCard/>
                        )}
                    keyExtractor = {item => item.id.toString()}
                    ItemSeparatorComponent = {() => (
                        <View style = {{width : 7}}/>
                    )}
                    showsHorizontalScrollIndicator = {false}
                    ListEmptyComponent = {() => (
                        <View style = {{flex : 1, 
                                        backgroundColor : "#6bc230", 
                                        height : DimensionDeclaration.movieCardWidth + 25,
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