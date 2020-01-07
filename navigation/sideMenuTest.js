import React from "react";
import { SafeAreaView, Image, Button, View } from "react-native";
import { Navigation } from "react-native-navigation";

class SideMenuTest extends React.Component {
    static get options() {
        return {
            topBar : {
                title : {
                    text : "TEST"
                }
            }
        }
    }
    
    render() {
        return(
            <SafeAreaView style = {{flex : 1, backgroundColor : "gray"}}>
                <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}>
                    <Image style = {{width : 100, height : 100, borderRadius : 7, margin : 7}}
                        source = {require("./assets/pika.png")}/>
                    <Button title = "Go back" onPress = {() => {
                        Navigation.pop(this.props.componentId)
                    }}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default SideMenuTest;
