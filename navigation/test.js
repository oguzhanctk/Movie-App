import React from "react";
import { View, Button} from "react-native";
import { Navigation } from "react-native-navigation";

export default class Test extends React.Component {
    
    render() {
        return(
            <View style = {{flex : 1, 
            backgroundColor : "gray", 
            justifyContent : "center",
            opacity : 0.7,
            }}>
                <Button title = "click" onPress = {() => Navigation.dismissOverlay(this.props.componentId)}/>
            </View>
        )
    }
}