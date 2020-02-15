import React, { Component } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { MoviesSlider } from "./microComponents/MoviesSlider";
import { constants } from "../../api/config";
import { Loader } from "./microComponents/Loader";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1,
            currentUser : "",
        }
    }

    componentDidMount = async () => {
        await this.props.fetchDataFromApi(
            `${constants.popularMoviesUrl + this.state.page}`, 
            `${constants.popularTVShowsUrl + this.state.page}`, 
            `${constants.topRatedMoviesUrl + this.state.page}`
        );
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
