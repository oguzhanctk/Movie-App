import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, SafeAreaView } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Feather";
import CustomAnimation from "../animation_Components/animations";
import { MovieApi } from "../api/fetch_movies";
import Loader from "./Loader";

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

    
    render() {
        return(
            <SafeAreaView style = {{flex : 1, 
                flexDirection : "column",
                justifyContent : "center",
                alignItems : "center" }}>
                <CustomAnimation style = {{width : 300, height : 50}}>
                    <Button title = "go to Screen2" 
                        onPress = {() => Navigation.push(this.props.componentId, {
                            component : {
                                name : "Screen2"
                            }
                        })}/>
                    <Loader/>
                    <Button title = "fetch" 
                        onPress = {() => {
                            MovieApi.fetchMovies(); 
                        }}/>
                </CustomAnimation>
                
                <View style = {{flexDirection : "row",
                    justifyContent : "center", 
                    alignItems : "center",
                    marginVertical : 15}}>
                    <TouchableOpacity style = {styles.fab} onPress = {() => this.props.incrementCounter()}>
                        <Icon name = "plus" size = {23}/>
                    </TouchableOpacity>
                    <Text style = {{marginHorizontal : 5}}>{this.props.counter}</Text>
                    <TouchableOpacity style = {styles.fab} onPress = {() => this.props.decrementCounter()}>
                        <Icon name = "minus" size = {23}/>
                    </TouchableOpacity>
                </View>
                 
            </SafeAreaView>
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