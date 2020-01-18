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
            <TouchableHighlight style = {{marginHorizontal : 7, marginVertical : 3}} onPress = {() => console.log("genre pressed")}>
                <View style = {{backgroundColor : item.color, 
                    height : Dimensions.get("window").height/10,
                    width : "100%",
                    justifyContent : "center",
                    alignItems : "center"}}>
                    <Text style = {{color : "white", 
                        fontSize : 16, 
                        fontWeight : "bold", 
                        letterSpacing : 1}}>{item.name}</Text>
                </View>
            </TouchableHighlight>
    )}
 

    render() {
        return(
            <SafeAreaView style = {{flex : 1, backgroundColor : "black"}}>
                <View style = {{padding : 3, 
                        height : 50, 
                        flexDirection : "row",
                        alignItems : "center",
                        marginVertical : 7,
                        marginHorizontal : 3}}>
                    <TextInput placeholder = "enter name to search"
                        style = {{paddingHorizontal : 7,
                            fontSize : 17,
                            flex : 1,
                            borderWidth : 0.25,
                            borderRadius : 7,
                            backgroundColor : "#ccc",
                            marginRight : 7}}/>
                    <TouchableOpacity onPress = {() => this.props.fetchSearchResults(`${constants.searchBaseUrl}inception&page=1`)} style = {{width : 50, 
                            alignItems : "center",
                            justifyContent : "center",
                            borderRadius : 7,
                            backgroundColor : "#e65a37",
                            height : "100%",
                            }}
                            activeOpacity = {0.7}>
                        <Icon name = "search" size = {30} color = "black"/>
                    </TouchableOpacity>
                </View>
                
                <View style = {{width : "100%", padding : 7, marginBottom : 75}}>
                    <FlatList data = {this.state.data}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item.id.toString()}
                        showsVerticalScrollIndicator = {false}/>
                        
                </View>
            </SafeAreaView>
        )
    }
}