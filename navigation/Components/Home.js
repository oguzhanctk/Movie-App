import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Button } from "react-native";
import { constants } from "../../api/config";
import { Loader, Alert, MoviesSlider } from "./microComponents/index";
import { Navigation } from "react-native-navigation";
import NetInfo from "@react-native-community/netinfo";

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
        await this.props.fetchDataFromApi(
            `${constants.popularMoviesUrl + this.state.page}`, 
            `${constants.popularTVShowsUrl + this.state.page}`, 
            `${constants.topRatedMoviesUrl + this.state.page}`
        );
    }

    componentWillUnmount = () => {
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
                            <MoviesSlider headerText = "Best of Bests" movieData = {this.props.topRatedMovies}/>
                            <View style = {{height : 20}}/>
                        </ScrollView>)
                }
            </SafeAreaView>
        )
    }
}
