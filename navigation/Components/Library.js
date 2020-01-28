import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { constants } from "../../api/config";
import { libraryConstants } from "../config";

export default class Library extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            data : []
        };
    }

    componentDidAppear = () => {
        this.getData();
    }


    // componentDidMount = () => {
    //     AsyncStorage.removeItem("@library_item");
    // }    

    getData = async () => {
        try {
            const data = await AsyncStorage.getItem("@library_item");
            const res = JSON.parse(data).reverse();
            if(data !== []) {
                this.setState({data : [...res]});
            }
        } catch (error) {
            console.log(error)
        }
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

    renderItem = ({item}) => (
            <TouchableOpacity onPress = {() => this.onMoviePress(item.id)}>
                <ImageBackground source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                style = {{backgroundColor : "gray", 
                width : libraryConstants.libraryWidth,
                height : libraryConstants.libraryHeight,
                margin : 5,
                borderWidth : 0.45,
                borderColor : "white"}}/> 
            </TouchableOpacity>
    
    );

    render() {
        return(
            <View style = {{flex : 1, paddingTop : 35, justifyContent : "center", alignItems : "center", backgroundColor : "gray"}}>
                <FlatList data = {this.state.data}
                    renderItem = {this.renderItem}
                    keyExtractor = {(item) => item.id.toString()}
                    numColumns = {3}/>
            </View>
        )
    }
}