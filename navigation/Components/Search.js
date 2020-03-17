import React, { Component } from 'react'
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Text } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { constants } from "../../api/config";
import { Navigation } from "react-native-navigation";
import { Loader, Alert } from "./microComponents/index";
import NetInfo from "@react-native-community/netinfo";

class Search extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            searchValue : "",
            nullArrayText : ["", "", ""],
            isConnected : true,
            isSubmit : false
        }
    }
    
    componentDidMount = () => {
        this.unsubscribe = NetInfo.addEventListener((state) => {
            this.setState({isConnected : state.isConnected})
        });
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }

    componentDidAppear = () => {
        this.setState({isSubmit : false});
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

    setNullArrayText = () => {
        this.setState({
            nullArrayText : ["Herhangi bir sonuç bulamadık...", "Farklı bir anahtar kelime kullanarak", "tekrar aramayı deneyin."]
        });
    }

    renderItem = ({item}) => {
        const ViewHeight = Dimensions.get("window").height / 5;
        const ViewWidth = Dimensions.get("window").width / 4;
        return(
                <View style = {{padding : 3, margin : 2}}>
                    <TouchableOpacity disabled = {this.state.isSubmit} 
                    onPress = {() => {
                        this.setState({isSubmit : true}, () => {
                        this.onMoviePress(item.id);
                        });
                    }}>
                                <Image source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                                    style = {{width : ViewWidth, 
                                        height : ViewHeight, 
                                        borderRadius : 0, 
                                        backgroundColor : "orange",
                                        borderWidth : 0.7,
                                        borderColor : "gray"}}
                                        resizeMode = "stretch"/>
                    </TouchableOpacity>
                </View>
        )
    }

    shouldComponentUpdate = (nextState, nextProps) => {
        return this.props.searchResults !== nextProps.searchResults;
    }

    render() {
        return (
        <View style = {{flex : 1, backgroundColor : "#3b3935"}}>
            {
                (this.state.isConnected) ? null : 
                <Alert color = "red" alertText = "Bağlantı hatası"/>
            }
            <View style = {styles.container}>
                <TextInput  style = {styles.textInput} 
                    autoFocus 
                    placeholder = "search"
                    selectionColor = "white"
                    placeholderTextColor = "#959c9b"
                    onChangeText = {(value) => this.getSearchInput(value)}
                    maxLength = {30}
                    ref={(input) => { this.textInput = input }}
                    onFocus = {() => this.textInput.clear()}
                    onSubmitEditing = {async () => {
                        const url = `https://api.themoviedb.org/3/search/${this.props.mediaType}?api_key=${constants.api_key}&language=en-US&query=${this.state.searchValue}&page=1&include_adult=false`;
                        await this.props.fetchSearchResults(url);
                        (this.props.searchResults.filter(item => item.poster_path !== null).length === 0) ? this.setNullArrayText() : null;
                    }}/>
                <TouchableOpacity style = {{padding : 1, backgroundColor : "#aaa"}}
                    onPress = {async () => {
                        const url = `https://api.themoviedb.org/3/search/${this.props.mediaType}?api_key=${constants.api_key}&language=en-US&query=${this.state.searchValue}&page=1&include_adult=false`;
                        await this.props.fetchSearchResults(url);
                        (this.props.searchResults.filter(item => item.poster_path !== null).length === 0) ? this.setNullArrayText() : null; 
                    }}>
                    <Icon name = "search" size = {33} color = "black"/>
                </TouchableOpacity>
            </View>
            {
                (this.props.isLoading) ? 
                    (<Loader indicatorColor = "white"/>) :
                    (<View style = {{flex : 1, marginTop : 13, alignItems : "center"}}>
                        {
                            (this.props.searchResults.filter(item => item.poster_path !== null).length === 0) ?
                                (
                                    <View style = {{alignItems : "center", padding : 7}}>
                                        <Text style = {{color : "white", fontSize : 15, fontWeight : "bold", paddingVertical : 17}}>{this.state.nullArrayText[0]}</Text>
                                        <Text style = {{color : "#8f8888", fontSize : 13, fontWeight : "bold"}}>{this.state.nullArrayText[1]}</Text>
                                        <Text style = {{color : "#8f8888", fontSize : 13, fontWeight : "bold"}}>{this.state.nullArrayText[2]}</Text>
                                    </View>
                                ) :
                                (<FlatList data = {this.props.searchResults.filter(item => item.poster_path !== null)}
                                    renderItem = {this.renderItem}
                                    keyExtractor = {(item) => item.id.toString()}
                                    numColumns = {3}
                                    showsVerticalScrollIndicator = {false}/>)
                        }
                    </View>)
            }
        </View>
        )
    }
};

export default Search;


const styles = StyleSheet.create({
    container : {
        backgroundColor : "#393e3d",
        padding : 1,
        borderWidth : 3,
        borderColor : "#3b3935",
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