import React, { Component } from "react";
import {View, 
        Text, 
        SafeAreaView, 
        Dimensions, 
        FlatList, 
        TouchableHighlight, 
        TouchableOpacity,
        StyleSheet} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { movieGenres, tvGenres } from "../config";

export default class Discover extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isSelectedTypeMovie : true,
        }
    }

    renderItem = ({item}) => {
        return(
            <TouchableHighlight style = {{marginHorizontal : 3, marginVertical : 3}} 
                onPress = {() => {
                    const type = (this.state.isSelectedTypeMovie) ? "movie" : "tv";
                    this.onGenrePress(item.id, type);
                }}>
                <View style = {{backgroundColor : item.color, 
                    height : Dimensions.get("window").height / 7,
                    width : Dimensions.get("window").width / 2.2,
                    justifyContent : "center",
                    alignItems : "flex-start",
                    borderRadius : 3,
                    borderWidth : 0.25,
                    borderColor : "black",
                    padding : 7}}>
                    <Text style = {{color : "white", 
                        fontSize : 17, 
                        fontWeight : "bold", 
                        letterSpacing : 1.3}}>#{item.name}</Text>
                </View>
            </TouchableHighlight>
    )}

    onSearchPress = (type) => {
        Navigation.showModal({
            component : {
                name : "Search",
                passProps : {
                    mediaType : type 
                }
            }
        })
    }
    
    onGenrePress = (id, type) => {
        Navigation.showModal({
            component : {
                name : "Genre",
                passProps : {
                    genreId : id,
                    media_type : type
                }
            }
        })
    }
 

    render() {
        return(
            <SafeAreaView style = {{flex : 1, backgroundColor : "gray"}}>
                <View style = {{height : Dimensions.get("window").height / 17 ,
                        flexDirection : "row", 
                        justifyContent : "center",
                        alignItems : "center",
                        padding : 0}}>
                    <TouchableOpacity style = {{...styles.typeCheck, borderBottomWidth : (this.state.isSelectedTypeMovie === true) ? 3.7 : 0}}
                        onPress = {() => this.setState({isSelectedTypeMovie : true})}>
                        <Text style = {{fontWeight : "bold", letterSpacing : 1, color : "black"}}>Film</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{width : 8, height : 8, borderRadius : 4, marginHorizontal : 7, backgroundColor : "black"}}/>
                    <TouchableOpacity style = {{...styles.typeCheck, borderBottomWidth : (this.state.isSelectedTypeMovie === true) ? 0 : 3.7}}
                        onPress = {() => this.setState({isSelectedTypeMovie : false})}>
                        <Text style = {{fontWeight : "bold", letterSpacing : 1}}>Dizi</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex : 1}}>
                    <TouchableOpacity style = {{flex : 1, 
                            flexDirection : "row",
                            alignItems : "center",
                            backgroundColor : "white",
                            paddingHorizontal : 7,
                            marginHorizontal : 1,
                            borderWidth : 0.65,
                            borderColor : "black",
                            borderColor : "#595959",
                            borderRadius : 13,
                            marginVertical : 7}}
                            onPress = {() => {
                                const type = (this.state.isSelectedTypeMovie) ? "movie" : "tv";
                                this.onSearchPress(type);
                            }}
                            activeOpacity = {0.75}>
                        <Icon name = "search" size = {23} color = "gray"/>
                        <Text style = {{fontSize : 17, color : "gray", marginLeft : 13}}>aramak için dokun</Text>
                    </TouchableOpacity>
                    <View style = {{flex : 12, width : "100%", padding : 5, alignItems : "center"}}>
                        <FlatList data = {(this.state.isSelectedTypeMovie) ? movieGenres : tvGenres}
                            renderItem = {this.renderItem}
                            keyExtractor = {(item) => item.id.toString()}
                            showsVerticalScrollIndicator = {false}
                            numColumns = {2}/>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    typeCheck : {
        borderColor : "lightgreen",
        padding : 3,
        height : Dimensions.get("window").height / 23,
        width : Dimensions.get("window").width / 3.5 ,
        justifyContent : "center",
        alignItems : "center",
    }
})