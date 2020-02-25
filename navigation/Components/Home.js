import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Button } from "react-native";
import { constants } from "../../api/config";
import { Loader, Alert, MoviesSlider } from "./microComponents/index";
import { Navigation } from "react-native-navigation";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";

export default class Home extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            page : 1,
            isConnected : true,
        }
    }
    
    componentDidMount = async () => {
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected : state.isConnected});
        });
        const page = await AsyncStorage.getItem("@page").then(res => JSON.parse(res)) || 1;
        this.setState({page : page + 1});
        await this.props.fetchDataFromApi(
            `${constants.popularMoviesUrl + page}`, 
            `${constants.popularTVShowsUrl + page}`, 
            `${constants.topRatedMoviesUrl + page}`
        );
        console.log(page, " ", this.state.page);

    }

    componentWillUnmount = async () => {
        await AsyncStorage.setItem("@page", JSON.stringify((this.state.page % 7)));
        this.unsubscribe();
    }
    
    render() {
        return(
            <SafeAreaView style = {{backgroundColor : "gray", flex : 1}}>
                {
                    (this.props.isLoading) ?
                        (<Loader indicatorColor = "white"/>) : 
                        (<ScrollView showsVerticalScrollIndicator = {true}>
                            {
                                (this.state.isConnected) ? null : 
                                (<Alert color = "red" alertText = "Bağlantı hatası"/>)
                            }
                            <MoviesSlider headerText = "Popüler Filmler" movieData = {this.props.popularMovies}/>
                            <MoviesSlider headerText = "Popüler Diziler" movieData = {this.props.popularTv}/>
                            <MoviesSlider headerText = "Efsaneler" movieData = {this.props.topRatedMovies}/>
                            <View style = {{height : 20}}/>
                        </ScrollView>)
                }
            </SafeAreaView>
        )
    }
}
