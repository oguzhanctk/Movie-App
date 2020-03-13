import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
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
            touchController : "auto",
        }
    }
    
    componentDidMount = async () => {
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected : state.isConnected});
        });
        const page = await AsyncStorage.getItem("@page").then(res => JSON.parse(res)) || 1;
        this.setState({page : page + 1}, async () => {
            await this.props.fetchDataFromApi(
                `${constants.popularMoviesUrl + page}`, 
                `${constants.popularTVShowsUrl + page}`, 
                `${constants.topRatedMoviesUrl + page}`
            );
        });
    }

    componentWillUnmount = async () => {
        await AsyncStorage.setItem("@page", JSON.stringify((this.state.page % 7)));
        this.unsubscribe();
    }
    
    shouldComponentUpdate = (nextProp, nextState) => {
        return nextState.isConnected !== this.state.isConnected ||
            nextProp.isLoading !== this.props.isLoading ||
            nextState.touchController !== this.state.touchController; 
    }

    componentDidAppear = () => {
        this.setState({touchController : "auto"});
    }

    updateState = () => {
        this.setState({touchController : "none"});
    }

    render() {
        return(
            <View style = {{backgroundColor : "#3b3935", flex : 1}} pointerEvents = {this.state.touchController}>
                {
                    (this.props.isLoading) ?
                        (<Loader indicatorColor = "white"/>) : 
                        (<ScrollView showsVerticalScrollIndicator = {true}>
                            {
                                (this.state.isConnected) ? null : 
                                (<Alert color = "red" alertText = "Bağlantı hatası"/>)
                            }
                            <MoviesSlider headerText = "Popüler Filmler" movieData = {this.props.popularMovies} updateState = {this.updateState}/>
                            <MoviesSlider headerText = "Popüler Diziler" movieData = {this.props.popularTv} updateState = {this.updateState}/>
                            <MoviesSlider headerText = "En iyiler" movieData = {this.props.topRatedMovies} updateState = {this.updateState}/>
                            <View style = {{height : 20}}/>
                        </ScrollView>)
                }
            </View>
        )
    }
}
