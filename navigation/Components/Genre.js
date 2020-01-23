import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import { constants } from "../../api/config";
import { Navigation } from "react-native-navigation";

export default class Genre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1
        }
    }
    
    componentDidMount = async () => {
        await this.props.fetchMoviesWithGenre(`${constants.searchByGenreUrl + this.props.genreId}&page=${this.state.page}`)
    }
    componentWillUnmount = () => {
        this.props.clearResultArray()
    }

    onMoviePress = (id) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    movieId : id
                }
            }
        });
    }

    renderItem = ({item}) => {
        const ViewHeight = Dimensions.get("window").height / 5;
        const ViewWidth = Dimensions.get("window").width / 4;
        return(
            <View style = {{padding : 3, margin : 2}}>
                <TouchableOpacity onPress = {() => this.onMoviePress(item.id)}>
                            <Image source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                                style = {{width : ViewWidth, 
                                    height : ViewHeight, 
                                    borderRadius : 3, 
                                    backgroundColor : "orange",
                                    borderWidth : 0.35,
                                    borderColor : "black"}}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style = {{flex : 1, backgroundColor : "gray"}}>
                <View style = {{flex : 1, marginTop : 13, alignItems : "center", backgroundColor : "gray"}}>
                    <FlatList data = {this.props.genreResults.filter(item => item.poster_path !== null)}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item.id.toString()}
                        numColumns = {3}
                        showsVerticalScrollIndicator = {false}/> 
                </View>
            </SafeAreaView>
        )
    }
}
