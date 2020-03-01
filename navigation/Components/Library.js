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
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "./microComponents/index";

export default class Library extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            data : [],
            currentUser : "",
            isSkip : null,
            isConnected : null,
            isSubmit : false,
            isEmpty : false
        };
    }

    //test comment

    componentDidAppear = () => {
        if(this.state.isSkip !== true) 
            this.getData();
        this.setState({isSubmit : false});
    }

    componentDidMount = async () => {
        this.unsubscribe = NetInfo.addEventListener((state) => {
            this.setState({isConnected : state.isConnected});
        });
        const isSkip = await AsyncStorage.getItem("@isSkip");
        if(isSkip === "true")
            this.setState({isSkip : true});
    }

    componentWillUnmount = () => {
        this.unsubscribe();
        this.setState({isConnected : null});
    }

    getData = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const data = await AsyncStorage.getItem(`@library_item_${user.username}`);
        this.setState({currentUser : user.username});
        if(data) {
            try {
                this.setState({data : [...JSON.parse(data).reverse()]}, 
                    () => {
                        if(JSON.stringify(this.state.data) === "[]")
                            this.setState({isEmpty : true});
                        else 
                            this.setState({isEmpty : false})
                    });
            } catch (error) {
                console.log(error)
            }
        } else 
            this.setState({isEmpty : true})
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

shouldComponentUpdate = (nextProp, nextState) => {
    return this.state.isConnected !== nextState.isConnected ||
    this.state.isEmpty !== nextState.isEmpty ||
    this.state.isSubmit !== nextState.isSubmit ||
    this.state.isSkip !== nextState.isSkip ||
    this.state.data !== nextState.data ||
    this.state.currentUser !== nextState.currentUser;
}

    renderItem = ({item}) => (
            <TouchableOpacity disabled = {this.state.isSubmit} 
            onPress = {() => {
                this.setState({isSubmit : true}, () => {
                    this.onMoviePress(item.id, item.media_type);
                });
            }}>
                <ImageBackground source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                style = {{backgroundColor : "orange", 
                width : libraryConstants.libraryWidth,
                height : libraryConstants.libraryHeight,
                margin : 5,
                borderWidth : 0.45,
                borderColor : "gray",
                justifyContent : "flex-end",
                alignItems : "flex-end"}}
                resizeMode = "stretch">
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
                <View style = {{flex : 1, backgroundColor : "gray"}}>
                    {
                        (this.state.isConnected === null || this.state.isConnected === true) ? null : 
                        (<Alert color = "red" alertText = "Bağlantı hatası"/>)
                    }
                    <View style = {{
                        flex : 1, 
                        flexDirection : "row",
                        justifyContent : "space-between",
                        alignItems : "center",
                        backgroundColor : "gray",
                        marginHorizontal : 0,
                        marginBottom : 13,
                        paddingHorizontal : 5,
                        borderBottomWidth : 0.45,
                        elevation : 15}}>
                        <Text style = {styles.userFont}>{this.state.currentUser}</Text>
                        <TouchableOpacity style = {styles.logout} onPress = {() => this.signOut()}>
                            <Icon name = "x-circle" size = {20} color = "darkred"/>
                        </TouchableOpacity>
                    </View>
                    {
                        (this.state.isEmpty === true) ?  
                        
                        (<View style = {{
                            flex : 9,
                            backgroundColor : "gray",
                            justifyContent : "center",
                            alignItems: "center"}}>
                            <Text style = {{fontSize : 19, color : "white"}}>Burası boş gözüküyor...</Text>
                            <View style = {{
                                height : iconSizeH,
                                width : iconSizeW,
                                justifyContent : "center",
                                alignItems : "center"}}>
                                <LottieView source = {require("../assets/animation/9353-falling-popcorn")} autoPlay loop = {false}/>
                            </View>
                        </View>) : 
                    
                        (<View style = {{flex : 9, justifyContent : "center", alignItems : "center", backgroundColor : "gray"}}>
                            <FlatList data = {this.state.data}
                                renderItem = {this.renderItem}
                                keyExtractor = {(item) => item.id.toString()}
                                numColumns = {3}
                                getItemLayout = {(data, index) => ({
                                    length : libraryConstants.libraryHeight + 5,
                                    offset : (libraryConstants.libraryHeight + 5) * index,
                                    index
                                })}
                                />
                        </View>)
                    }
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
        opacity : 0.75
    },
    userFont : {
        fontSize : 17,
        color : "black",
        fontWeight : "bold",
        letterSpacing : 1,
        fontStyle : "italic"
    }
});