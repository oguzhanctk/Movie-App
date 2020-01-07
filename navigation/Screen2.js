import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Navigation } from "react-native-navigation";

export default class Screen2 extends Component {
    static get options() {
        return {
            topBar : {
                title : {
                    text : "Screen2",
                    color : "orange",
                },
                background : {
                    color : "gray"
                }
                
            }
        }
    }

    render() {
        return(
            <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                
                {/* it adds component to top of the stack navigation every click  */}
                {/* <Button title = "click" onPress = {() => {
                    Navigation.push(this.props.componentId, {
                        component : {
                            name : "Home",
                        }
                    });
                }}/> */}
                <Button title = "go back" onPress = {() => {
                    Navigation.pop(this.props.componentId);
                }}/>
            </View>
        )
    }
}