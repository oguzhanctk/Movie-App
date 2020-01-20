import React, { Component } from "react";
import { View, Button, Text, SafeAreaView, TextInput, Dimensions, FlatList, TouchableHighlight, TouchableOpacity} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { genres } from "../config";
import { constants } from "../../api/config";

export default class Discover extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [...genres],
        }
    }

    renderItem = ({item}) => {
        return(
            <TouchableHighlight style = {{marginHorizontal : 7, marginVertical : 3}} 
                onPress = {() => console.log("genre pressed")}>
                <View style = {{backgroundColor : item.color, 
                    height : Dimensions.get("window").height/10,
                    width : "100%",
                    justifyContent : "center",
                    alignItems : "center",
                    borderRadius : 3}}>
                    <Text style = {{color : "white", 
                        fontSize : 16, 
                        fontWeight : "bold", 
                        letterSpacing : 1}}>{item.name}</Text>
                </View>
            </TouchableHighlight>
    )}

    onSearchPress = () => {
        Navigation.showModal({
            component : {
                name : "Search"
            }
        })
    }
 

    render() {
        return(
            <SafeAreaView style = {{flex : 1, backgroundColor : "black"}}>
                <TouchableOpacity style = {{flex : 1, 
                        flexDirection : "row",
                        alignItems : "center",
                        backgroundColor : "#3c423e",
                        paddingHorizontal : 3,
                        margin : 5,
                        borderRadius : 3}}
                        onPress = {() => this.onSearchPress()}
                        activeOpacity = {0.75}>
                    <Icon name = "search" size = {30} color = "gray"/>
                    <Text style = {{fontSize : 21, color : "gray", marginLeft : 13}}>click to search</Text>
                </TouchableOpacity>
                <View style = {{flex : 9, width : "100%", padding : 7}}>
                    <FlatList data = {this.state.data}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item.id.toString()}
                        showsVerticalScrollIndicator = {false}/>
                </View>
            </SafeAreaView>
        )
    }
}