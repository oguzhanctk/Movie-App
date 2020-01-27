import React, { Component } from "react";
import { View, StyleSheet, Button, SafeAreaView, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import { constants } from "../../api/config";

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
        console.log(this.props.popularMovies[0], "Home -> 33");
    }

    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "gray", flex : 1}}>
                <ScrollView showsVerticalScrollIndicator = {true}>
                    <MoviesSlider headerText = "Popüler" movieData = {this.props.popularMovies}/>
                    <MoviesSlider headerText = "Tüm zamanlar" movieData = {this.props.topRatedMovies}/>
                    <MoviesSlider headerText = "Yakında" movieData = {this.props.latestMovies}/>
                    <View style = {{height : 20}}/>
                </ScrollView>
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