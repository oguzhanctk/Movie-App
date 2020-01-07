import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    static get options() {
        return {
            topBar : {
                title : {
                    text : "Home",
                    color : "red",
                }
            }
        };
    }

    componentDidAppear = () => {
        console.log("appear");
    }

    navigationButtonPressed = ({buttonId}) => {
        const { componentId } = this.props;

        if(buttonId == "leftSide") {
            console.log("sideMenu button pressed");
            Navigation.mergeOptions(componentId, {
                sideMenu : {
                    left : {
                        visible : true
                    }
                }
            })
        }
    }

    //comment line

    render() {
        return(
            <View style = {{flex : 1,
                flexDirection : "row",
                justifyContent : "center", 
                alignItems : "center",
                backgroundColor : "white",}}>
                
                <TouchableOpacity style = {styles.fab} onPress = {() => this.props.incrementCounter()}>
                    <Icon name = "plus" size = {23}/>
                </TouchableOpacity>
                <Text style = {{marginHorizontal : 5}}>{this.props.counter}</Text>
                <TouchableOpacity style = {styles.fab} onPress = {() => this.props.decrementCounter()}>
                    <Icon name = "minus" size = {23}/>
                </TouchableOpacity>

                <LottieView source = {require("./assets/animation/3532-car.json")}
                    style = {{width :170, height : 170}}/> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fab : {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:55,
        height:55,  
        borderRadius:100,
        backgroundColor : "lightblue"
    }
})