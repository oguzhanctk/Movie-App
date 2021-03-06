import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { constants } from "../../api/config";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Alert } from "./microComponents/index";
import NetInfo from "@react-native-community/netinfo";

export default class Genre extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            page : 1,
            refreshing : false,
            isConnected : null,
            isSubmit : false,
            baseUrl : `https://api.themoviedb.org/3/discover/${this.props.media_type}?api_key=${constants.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=`
        }
    }
    
    componentDidMount = async () => {
        this.unsubscribe = NetInfo.addEventListener((state) => {
            this.setState({isConnected : state.isConnected});
        });
        await this.props.fetchMoviesWithGenre(`${this.state.baseUrl + this.props.genreId}&page=${this.state.page}`);
    }
    
    componentWillUnmount = () => {
        this.props.clearResultArray();
        this.unsubscribe();
        this.setState({isConnected : null});
    }

    componentDidAppear = () => {
        this.setState({isSubmit : false});
    }

    onMoviePress = (id, type) => {
        Navigation.showModal({
            component : {
                name : "MovieDetail",
                passProps : {
                    id : id,
                    mediaType : type 
                }
            }
        });
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout)
        });
    }

    onRefresh = () => {
        if(this.state.page < 50) {
            this.setState({refreshing : true}, async () => {
                await this.props.fetchMoviesWithGenre(`${this.state.baseUrl + this.props.genreId}&page=${this.state.page + 1}`);
                this.wait(500).then(() => { 
                    this.setState({refreshing : false, page : this.state.page + 1});
                });
            });
        } else
            null
    }

    renderItem = ({item}) => {
        const ViewHeight = Dimensions.get("window").height / 5;
        const ViewWidth = Dimensions.get("window").width / 4;
        return(
            <View style = {{padding : 3, margin : 2}}>
                <TouchableOpacity disabled = {this.state.isSubmit} onPress = {() => {
                    this.setState({isSubmit : true}, () => {
                        this.onMoviePress(item.id, this.props.media_type)
                    });
                }}>
                        <Image source = {{uri : `${constants.imageBaseUrl + item.poster_path}`}}
                            style = {{width : ViewWidth, 
                                height : ViewHeight, 
                                borderRadius : 0, 
                                backgroundColor : "orange",
                                borderWidth : 0.7,
                                borderColor : "gray"}}
                            resizeMode = "stretch"/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style = {{flex : 1, backgroundColor : "#3b3935"}}>
                {
                    (this.state.isConnected === null || this.state.isConnected === true) ? null : 
                    (<Alert color = "red" alertText = "Bağlantı hatası"/>)
                }
                <View style = {{height : Dimensions.get("window").height / 8,
                width : Dimensions.get("window").width,
                justifyContent : "space-between",
                alignItems : "center"}}>
                    <Text style = {{fontWeight : "bold",
                        color : "white",
                        marginVertical : 3,
                        fontSize : 19}}>{this.state.page}</Text>
                    <View style = {{flexDirection : "row"}}>
                        <Icon name = "refresh" size = {19} color = "white"/>
                        <Text style = {{fontWeight : "bold",
                            color : "white",
                            marginVertical : 3,
                            fontSize : 11,
                            marginLeft : 3}}>yenilemek için aşağı çekin</Text>
                    </View>
                </View>
                <View style = {{flex : 1, marginTop : 7, alignItems : "center", backgroundColor : "#3b3935"}}>
                    <FlatList data = {this.props.genreResults.filter(item => item.poster_path !== null)}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item.id.toString()}
                        numColumns = {3}
                        showsVerticalScrollIndicator = {false}
                        refreshControl = {
                            <RefreshControl refreshing = {this.props.isLoading}
                                onRefresh = {() => this.onRefresh()}/>}
                    /> 
                </View>
            </View>
        )
    }
}
