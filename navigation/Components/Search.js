import React, { Component } from 'react'
import { View, TextInput, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Text } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { constants } from "../../api/config";
import { Navigation } from "react-native-navigation";
import { Loader } from "./microComponents/Loader";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue : "",
            nullArrayText : ""
        }
    }

    getSearchInput = (value) => {
        this.setState({searchValue : value})
    }

    onMoviePress = (id) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    id : id,
                    mediaType : this.props.mediaType
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
                                        resizeMode = "contain"/>
                    </TouchableOpacity>
                </View>
        )
    }

    shouldComponentUpdate = (nextState, nextProps) => {
        return this.props.searchResults !== nextProps.searchResults;
    }

    render() {
        const searchUrl = `https://api.themoviedb.org/3/search/${this.props.mediaType}?api_key=${constants.api_key}&language=en-US&query=${this.state.searchValue}&page=1&include_adult=true`;
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
                    onPress = {async () => {
                        const url = `https://api.themoviedb.org/3/search/${this.props.mediaType}?api_key=${constants.api_key}&language=en-US&query=${this.state.searchValue}&page=1&include_adult=true`;
                        await this.props.fetchSearchResults(url);
                        (this.props.searchResults.filter(item => item.poster_path !== null).length === 0) ? this.setState({nullArrayText : "Herhangi bir sonuç bulunamadı :/"}) : null; 
                    }}>
                    <Icon name = "search" size = {33} color = "gray"/>
                </TouchableOpacity>
            </View>
            {
                (this.props.isLoading) ? 
                    (<Loader/>) :
                    (<View style = {{flex : 1, marginTop : 13, alignItems : "center"}}>
                        {
                            (this.props.searchResults.filter(item => item.poster_path !== null).length === 0) ?
                                (<Text style = {{color : "black", fontSize : 18}}>{this.state.nullArrayText}</Text>) :
                                (<FlatList data = {this.props.searchResults.filter(item => item.poster_path !== null)}
                                    renderItem = {this.renderItem}
                                    keyExtractor = {(item) => item.id.toString()}
                                    numColumns = {3}
                                    showsVerticalScrollIndicator = {false}/>)
                        }
                    </View>)
            }
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