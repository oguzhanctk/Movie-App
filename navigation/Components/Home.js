import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import { constants } from "../../api/config";
import { Loader } from "./microComponents/Loader";

export default class Home extends Component {
    constructor(props) {
        super(props);
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
        await this.props.fetchDataFromApi(
            constants.popularMoviesUrl, 
            constants.popularTVShowsUrl, 
            constants.topRatedMoviesUrl
            );
            console.log(this.props.popularMovies)
    }

    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "gray", flex : 1}}>
                {
                    (this.props.isLoading) ?
                        (<Loader indicatorColor = "white"/>) : 
                        (<ScrollView showsVerticalScrollIndicator = {true}>
                            <MoviesSlider headerText = "Popüler Filmler" movieData = {this.props.popularMovies}/>
                            <MoviesSlider headerText = "Popüler Diziler" movieData = {this.props.popularTv}/>
                            <MoviesSlider headerText = "Best of Bests" movieData = {this.props.topRatedMovies}/>
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