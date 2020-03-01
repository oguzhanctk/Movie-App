import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { MovieCard } from "./MovieCard";
import { DimensionDeclaration } from "./dimensions_declaration";
import { Navigation } from "react-native-navigation";

export const MoviesSlider = React.memo((props) => {
    const [isSubmit, setisSubmit] = useState(false);

    useEffect(() => {
        const screenEventListener = Navigation.events().registerComponentDidAppearListener(({ componentId, componentName, passProps }) => {
            if(componentName === "Home") {
                setisSubmit(false);
            }
        });
        return () => {
            screenEventListener.remove();
        };
    }, [])

    const updateState = () => {
        setisSubmit(true);
    }

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
                        <MovieCard imagePath = {item.poster_path} 
                            id = {item.id}
                            mediaType = {item.media_type}
                            disabled = {isSubmit}
                            updateState = {updateState}
                        />
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
