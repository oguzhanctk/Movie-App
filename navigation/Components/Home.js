import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import { constants } from "../../api/config";
import { Loader } from "./microComponents/Loader";
import { Auth } from "aws-amplify";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    // navigationButtonPressed = ({buttonId}) => {
    //     const { componentId } = this.props;

    //     if(buttonId == "leftSide") {
    //         console.log("sideMenu button pressed");
    //         Navigation.mergeOptions(componentId, {
    //             sideMenu : {
    //                 left : {
    //                     visible : true
    //                 }
    //             }
    //         })
    //     }
    // }

    componentDidMount = async () => {
        await this.props.fetchDataFromApi(constants.popularMoviesUrl, constants.latestMoviesUrl, constants.topRatedMoviesUrl);
        // await AsyncStorage.removeItem("@item");
        await Auth.currentAuthenticatedUser({bypassCache : true})
        .then(user => console.log(user))
        .catch(err => console.log(err));
    }

    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "gray", flex : 1}}>
                {
                    (this.props.isLoading) ?
                        (<Loader indicatorColor = "white"/>) : 
                        (<ScrollView showsVerticalScrollIndicator = {true}>
                            <MoviesSlider headerText = "Popüler" movieData = {this.props.popularMovies}/>
                            <MoviesSlider headerText = "Tüm zamanlar" movieData = {this.props.topRatedMovies}/>
                            <MoviesSlider headerText = "Yakında" movieData = {this.props.latestMovies}/>
                            <View style = {{height : 20}}/>
                        </ScrollView>)
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    fab : { 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:55,
        height:55,  
        borderRadius:100,
        backgroundColor : "lightblue"
    }
})