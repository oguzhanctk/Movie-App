import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { DimensionDeclaration } from "./dimensions_declaration";

export const MovieCard = () => {
    return (
        <View style = {{width : DimensionDeclaration.movieCardWidth, 
                    height : DimensionDeclaration.movieCardHeight, 
                    borderWidth : 0.3,
                    borderColor : "white",
                    backgroundColor : "#f5f0df", 
                    flex : 1}}>
            <View style = {{flex : 7}}>
                <Image source = {require("../../assets/pika.png")}
                    style = {{flex : 1, width : null, height : null}}
                    resizeMode = "cover"/>
            </View>
            <View style = {{flex : 2, paddingLeft : 5, paddingTop : 7, overflow : "hidden", backgroundColor : "gray"}}>
                <Text style = {{fontWeight : "700", color : "white"}}>oguzhan saodassda asd a</Text>
            </View>
            <View style = {{flex : 1, flexDirection : "row-reverse", alignItems : "center", padding : 3, backgroundColor : "gray"}}>
                <Icon name = "star" color = "#f5c000" size = {16}/>   
                <Text style = {{fontSize : 14, fontWeight : "700", marginLeft : 1, color : "white"}}>
                    7.4
                </Text>
            </View>
        </View>
    )
}