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
import { genres } from "../config";

export default class Discover extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : genres,
            isSelectedTypeMovie : true
        }
    }

    renderItem = ({item}) => {
        return(
            <TouchableHighlight style = {{marginHorizontal : 7, marginVertical : 3}} 
                onPress = {() => {
                    this.onGenrePress(item.id);
                }}>
                <View style = {{backgroundColor : item.color, 
                    height : Dimensions.get("window").height/11,
                    width : "100%",
                    justifyContent : "center",
                    alignItems : "center",
                    borderRadius : 3,
                    borderWidth : 0.55,
                    borderColor : "white"}}>
                    <Text style = {{color : "white", 
                        fontSize : 23, 
                        fontWeight : "bold", 
                        letterSpacing : 1}}>#{item.name}</Text>
                </View>
            </TouchableHighlight>
    )}

    onSearchPress = () => {
        Navigation.showModal({
            component : {
                name : "Search",
            }
        })
    }
    
    onGenrePress = (id) => {
        Navigation.showModal({
            component : {
                name : "Genre",
                passProps : {
                    genreId : id
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
                    <TouchableOpacity style = {{...styles.typeCheck, backgroundColor : (this.state.isSelectedTypeMovie === true) ? "#33b539" : "#c3c7c4"}}
                        onPress = {() => this.setState({isSelectedTypeMovie : true})}>
                        <Text style = {{fontWeight : "bold", letterSpacing : 1, color : "black"}}>Film</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{width : 8, height : 8, borderRadius : 4, marginHorizontal : 7, backgroundColor : "black"}}/>
                    <TouchableOpacity style = {{...styles.typeCheck, backgroundColor : (this.state.isSelectedTypeMovie === true) ? "#c3c7c4" : "#33b539"}}
                        onPress = {() => this.setState({isSelectedTypeMovie : false})}>
                        <Text style = {{fontWeight : "bold", letterSpacing : 1}}>Dizi</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex : 1}}>
                    <TouchableOpacity style = {{flex : 1, 
                            flexDirection : "row",
                            alignItems : "center",
                            backgroundColor : "#4a4a4a",
                            paddingHorizontal : 7,
                            marginHorizontal : 1,
                            borderWidth : 0.65,
                            borderColor : "black",
                            borderColor : "#595959"}} 
                            onPress = {() => this.onSearchPress()}
                            activeOpacity = {0.75}>
                        <Icon name = "search" size = {30} color = "gray"/>
                        <Text style = {{fontSize : 21, color : "gray", marginLeft : 13}}>aramak için dokun</Text>
                    </TouchableOpacity>
                    <View style = {{flex : 9, width : "100%", padding : 7}}>
                        <FlatList data = {this.state.data}
                            renderItem = {this.renderItem}
                            keyExtractor = {(item) => item.id.toString()}
                            showsVerticalScrollIndicator = {false}/>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    typeCheck : {
        borderWidth : 0.35,
        padding : 3,
        height : Dimensions.get("window").height / 23,
        width : Dimensions.get("window").width / 3.5 ,
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 5
    }
})