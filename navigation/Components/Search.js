import React, { Component, useEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, TextInputComponent } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { constants } from "../../api/config";
import { Navigation } from "react-native-navigation";
import MovieDetail from './MovieDetail';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue : ""
        }
    }
    
    shouldRender = (obj) => {
        if(Object.keys(obj).length === 0)
            return false;
        else
            return true; 
    }

    getSearchInput = (value) => {
        this.setState({searchValue : value})
    }

    onMoviePress = (id) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    movieId : id
                }
            }
        });
    }

    renderItem = ({item}) => {
        const ViewHeight = Dimensions.get("window").height / 5;
        const ViewWidth = Dimensions.get("window").width / 4;
        return(
            <View style = {{padding : 3, margin : 2}}>        
                <TouchableOpacity onPress = {() => this.onMoviePress(item.id)}>
                    <Image source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                        style = {{width : ViewWidth, 
                            height : ViewHeight, 
                            borderRadius : 3, 
                            backgroundColor : "orange",
                            borderWidth : 0.35,
                            borderColor : "black"}}
                            />
                </TouchableOpacity>
            </View>
        )
    }

    shouldComponentUpdate = (nextProps) => {
        return this.props.searchResults !== nextProps.searchResults;
    }

    render() {
        return (
        <SafeAreaView style = {{flex : 1, backgroundColor : "gray"}}>
            <View style = {styles.container}>
                <TextInput  style = {styles.textInput} 
                    autoFocus 
                    placeholder = "search" 
                    placeholderTextColor = "#959c9b"
                    onChangeText = {(value) => this.getSearchInput(value)}
                    maxLength = {30}
                    ref={(input) => { this.textInput = input }}
                    onFocus = {() => this.textInput.clear()}/>
                <TouchableOpacity style = {{padding : 3}}
                    onPress = {(value) => {
                        console.log(this.props.searchResults)
                        this.props.fetchSearchResults(`${constants.searchUrl}&query=${this.state.searchValue}`);
                    }}>
                    <Icon name = "search" size = {33} color = "gray"/>
                </TouchableOpacity>
            </View>
            <View style = {{flex : 1, marginTop : 13, alignItems : "center"}}>
                <FlatList data = {this.props.searchResults}
                    renderItem = {this.renderItem}
                    keyExtractor = {(item) => item.id.toString()}
                    numColumns = {3}
                    showsVerticalScrollIndicator = {false}/> 
            </View>
        </SafeAreaView>
        )
    }
};

export default Search;


const styles = StyleSheet.create({
    container : {
        backgroundColor : "#393e3d",
        padding : 1,
        borderWidth : 3,
        borderColor : "gray",
        flexDirection : "row",
        alignItems : "center",
    },
    textInput : {
        flex : 1,
        backgroundColor : "#292b29",
        height : 40,
        paddingHorizontal : 7,
        fontSize : 16,
        color : "#959c9b"
    }
})