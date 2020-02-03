import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { constants } from "../../api/config";
import { libraryConstants } from "../config";
import { DimensionDeclaration } from "./microComponents/dimensions_declaration";
import { storeMethod } from "./storage/index";
import Icon from "react-native-vector-icons/Feather";
import { Auth } from "aws-amplify";
import { goToAuth } from "../navigation";

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

    getData = async () => {
        const data = await AsyncStorage.getItem("@library_item");
        if(data) {
            try {
                this.setState({isLoading : true}, async () => {
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

    signOut = async () => {
        try {
            await Auth.signOut()
            .then(async () => {
                await AsyncStorage.setItem("@auth_status", "false");
                goToAuth()
            });
            console.log("signout succesfull")
        } catch (error) {
            console.log("error while signing out...", error)
        }
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
            <View style = {{flex : 1}}>
                <View style = {{flex : 1, justifyContent : "center", alignItems : "center", backgroundColor : "gray", padding : 7}}>
                    <TouchableOpacity onPress = {() => this.signOut()}>
                        <Icon name = "log-out" size = {35} />
                    </TouchableOpacity>
                </View>
                <View style = {{flex : 9, paddingTop : 0, justifyContent : "center", alignItems : "center", backgroundColor : "gray"}}>
                {
                    (this.state.isLoading) ?
                        null : 
                    (<FlatList data = {this.state.data}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item.id.toString()}
                        numColumns = {3}/>)
                }
                </View>
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