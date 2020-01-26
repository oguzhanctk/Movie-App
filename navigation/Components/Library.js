import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Navigation } from "react-native-navigation";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import AsyncStorage from "@react-native-community/async-storage";

export default class Library extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getData = this.getData.bind(this);
        this.state = {
            data : []
        };
    }

    componentDidAppear = () => {
        this.getData();
    }

    // componentDidMount = () => {
    //     this.clearData();
    // }

    getData = async () => {
        try {
            const data = await AsyncStorage.getItem("@library_item");
            const res = JSON.parse(data);
            if(data !== []) {
                this.setState({data : [...res]})
            }
        } catch (error) {
            console.log(error)
        }
    }

    clearData = async () => {
        try {
            await AsyncStorage.removeItem("@library_item");
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                <MoviesSlider headerText = "Kitaplık" movieData = {this.state.data}/>
            </View>
        )
    }
}