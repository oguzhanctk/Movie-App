import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView, Dimensions, FlatList, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import CustomAnimation from "../../animation_Components/animations";
import { MovieApi } from "../../api/fetch_movies";
import { MovieCard } from "./microComponents/MovieCard";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import { key } from "../../api/config";

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

    componentDidMount = () => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key.api_key}&language=en-US`)
        .then(response => response.json())
        .then(data => console.log(data.genres))
        .catch(err => console.log(err));
    }



    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "#e6ffec", flex : 1}}>
                <ScrollView showsVerticalScrollIndicator = {true}>     
                    <MoviesSlider headerText = "Popüler"/>
                    <MoviesSlider headerText = "Yakın zamanda"/>
                    <MoviesSlider headerText = "Tüm zamanlar"/>
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