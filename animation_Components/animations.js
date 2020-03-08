import React, { Component } from "react";
import {Animated} from "react-native";

export default class CustomAnimation extends Component {
    state = {
        slideDown : new Animated.Value(0),
    }

    componentDidMount = () => {
        Animated.timing(
            this.state.slideDown,
            {
                toValue : 1,
                duration : 1800,
                useNativeDriver : true
            }
        ).start();
    }

    render() {
        let {slideDown} = this.state;
        
        return(
            <Animated.View
                style = {{...this.props.style,
                    opacity : slideDown,
                    justifyContent : "center",
                    alignItems : "center"}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
