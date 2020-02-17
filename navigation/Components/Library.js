import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { constants } from "../../api/config";
import { libraryConstants } from "../config";
import { DimensionDeclaration } from "./microComponents/dimensions_declaration";
import { storeMethod } from "./storage/index";
import Icon from "react-native-vector-icons/Feather";
import { Auth } from "aws-amplify";
import { goToAuth } from "../navigation";
import LottieView from "lottie-react-native";

export default class Library extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            data : [],
            isLoading : false,
            currentUser : "",
            isSkip : null,
        };
    }

    //test comment

    componentDidAppear = () => {
        if(this.state.isSkip !== true) 
            this.getData();
    }

    componentDidMount = async () => {
        const isSkip = await AsyncStorage.getItem("@isSkip");
        if(isSkip !== "true") {
            const user = await Auth.currentAuthenticatedUser();
            this.setState({currentUser : user.username});
        } else 
            this.setState({isSkip : true});
    }

    // componentDidMount = () => {
    //     AsyncStorage.removeItem("@library_item");
    // }

    componentDidDisappear = () => {
        this.setState({data : []});
    }

    getData = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const data = await AsyncStorage.getItem(`@library_item_${user.username}`);
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

    onMoviePress = (id, type) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    id : id,
                    mediaType : type 
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
            <TouchableOpacity onPress = {() => this.onMoviePress(item.id, item.media_type)}>
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
                            storeMethod.removeData(item.id, this.state.currentUser);
                        }}
                        underlayColor = "red">
                        <Icon name = "minus" size = {15} color = "black"/>
                    </TouchableHighlight>
                </ImageBackground> 
            </TouchableOpacity>
    
    );

    render() {
        const iconSizeH = Dimensions.get("window").height / 2;
        const iconSizeW = Dimensions.get("window").width;
        return(
            (this.state.isSkip === true) ? 
                (
                <View style = {{
                    flex : 1, 
                    backgroundColor : "gray",
                    justifyContent : "flex-start",
                    alignItems: "center"}}>
                    <View style = {{
                        height : iconSizeH,
                        width : iconSizeW,
                        justifyContent : "center",
                        alignItems : "center",
                        marginBottom : 17}}>
                        <LottieView source = {require("../assets/animation/823-crying")} autoPlay loop/>
                    </View>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Text style = {{fontSize : 19, color : "white", marginBottom : 7}}>Kütüphaneyi kullanabilmek için</Text>
                        <Text style = {{fontSize : 19, color : "white", marginBottom : 17}}>lütfen giriş yapın.</Text>
                        <TouchableOpacity style = {{...styles.logout, right : 0}}
                            onPress = {async () => {
                                await AsyncStorage.setItem("@isSkip", "false");
                                goToAuth();
                            }}>
                            <Icon name = "x-circle" size = {20} color = "darkred"/>
                        </TouchableOpacity>
                    </View>
                </View>
                ) :
                (
                <View style = {{flex : 1}}>
                    <View style = {{
                        flex : 1, 
                        justifyContent : "center",
                        alignItems : "flex-end",
                        backgroundColor : "gray"}}>
                        <TouchableOpacity style = {styles.logout} onPress = {() => this.signOut()}>
                            <Icon name = "x-circle" size = {20} color = "darkred"/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 9, justifyContent : "center", alignItems : "center", backgroundColor : "gray"}}>
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
        )
    }
}

const styles = StyleSheet.create({
    fab : { 
        borderWidth : 0.25,
        alignItems : "center",
        justifyContent : "center",
        width : DimensionDeclaration.movieCardHeight / 6,
        height : DimensionDeclaration.movieCardHeight / 6,  
        borderRadius : 100,
        backgroundColor : "#eb7171",
        opacity : 0.75,
        bottom : 3,
        right : 3
    },
    logout : {
        borderWidth : 0.25,
        alignItems : "center",
        justifyContent : "center",
        width : DimensionDeclaration.movieCardHeight / 5,
        height : DimensionDeclaration.movieCardHeight / 5,  
        borderRadius : 100,
        backgroundColor : "#ada1a2",
        opacity : 0.75,
        right : 10
    }
});