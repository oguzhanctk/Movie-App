import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { constants } from "../../api/config";
import { libraryConstants } from "../config";
import { DimensionDeclaration } from "./microComponents/dimensions_declaration";
import { storeMethod } from "./storage/index";
import Icon from "react-native-vector-icons/Feather";

export default class Library extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            data : [],
            isLoading : false
        };
    }

    //test comment

    componentDidAppear = () => {
        this.getData();
    }

    // componentDidMount = () => {
    //     AsyncStorage.removeItem("@library_item");
    // }

    componentDidDisappear = () => {
        this.setState({data : []});
    }

    getData = () => {
        try {
            this.setState({isLoading : true}, async () => {
                const data = await AsyncStorage.getItem("@library_item");
                this.setState({isLoading : false});
                const res = JSON.parse(data).reverse();
                if(data !== []) {
                    this.setState({data : [...res]});
                }
            });
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
                borderColor : "gray",
                justifyContent : "flex-end",
                alignItems : "flex-end"}}>
                    <TouchableHighlight style = {styles.fab} 
                        onPress = {() => {
                            let toArray = this.state.data.filter(member => member.id !== item.id);
                            this.setState({data : toArray});
                            storeMethod.removeData(item.id);
                        }}
                        underlayColor = "red">
                        <Icon name = "minus" size = {15} color = "black"/>
                    </TouchableHighlight>
                </ImageBackground> 
            </TouchableOpacity>
    
    );

    render() {
        return(
            <View style = {{flex : 1, paddingTop : 35, justifyContent : "center", alignItems : "center", backgroundColor : "gray"}}>
            {
                (this.state.isLoading) ?
                    null : 
                (<FlatList data = {this.state.data}
                    renderItem = {this.renderItem}
                    keyExtractor = {(item) => item.id.toString()}
                    numColumns = {3}/>)
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fab : { 
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
        alignItems : "center",
        justifyContent : "center",
        width : DimensionDeclaration.movieCardHeight / 6,
        height : DimensionDeclaration.movieCardHeight / 6,  
        borderRadius : 100,
        backgroundColor : "#eb7171",
        opacity : 0.75,
        bottom : 3,
        right : 3
    }
});